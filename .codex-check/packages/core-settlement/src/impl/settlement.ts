import { createPublicClient, createWalletClient, http, type Address, type Hash } from 'viem';
import { privateKeyToAccount, type Account } from 'viem/accounts';
import { ConfigStore } from '@nexuslink/core-config';
import type { Payment, NanopaymentChannel, NanopaymentTransfer, Currency } from '../types.js';

export class SettlementError extends Error {
  constructor(msg: string, public code: string) { super(msg); this.name = 'SettlementError'; }
}

export class SettlementModule {
  private publicClient: ReturnType<typeof createPublicClient>;
  private wallet: ReturnType<typeof createWalletClient> | null = null;
  private account: ReturnType<typeof privateKeyToAccount> | null = null;

  // Phase 2: In-memory nanopayment channels (should persist to storage in production)
  private channels = new Map<string, NanopaymentChannel>();
  private transfers = new Map<string, NanopaymentTransfer[]>(); // channelId → transfers

  constructor(private config: ConfigStore) {
    const rpcUrl = this.config.getRpcUrl();
    const chainId = this.config.getNetwork() === 'mainnet' ? 42161 : 421614;
    const chain = { id: chainId, name: '', nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 }, rpcUrls: { default: { http: [rpcUrl] } } } as const;
    this.publicClient = createPublicClient({ transport: http(rpcUrl), chain });

    const pk = process.env.PRIVATE_KEY;
    if (pk) {
      this.account = privateKeyToAccount(pk as `0x${string}`);
      this.wallet = createWalletClient({ account: this.account, transport: http(rpcUrl), chain });
    }
  }

  async send(to: string, amountUsdc: string, contractId?: string): Promise<{ txHash: string }> {
    if (!this.wallet || !this.account) throw new SettlementError('PRIVATE_KEY not set', 'AUTH');
    const address = process.env.SETTLEMENT_ADDRESS;
    if (!address) throw new SettlementError('SETTLEMENT_ADDRESS not set', 'CONFIG');

    const amountWei = BigInt(Math.round(parseFloat(amountUsdc) * 1e6));
    const contractIdHex = contractId
      ? `0x${Buffer.from(contractId).toString('hex').padEnd(64, '0')}`
      : `0x${'0'.repeat(64)}`;

    const hash = await this.wallet.writeContract({
      address: address as `0x${string}`,
      abi: [
        { type: 'function', name: 'pay', inputs: [
          { name: '_to', type: 'address' }, { name: '_amount', type: 'uint256' }, { name: '_contractId', type: 'bytes32' },
        ], outputs: [] },
      ],
      functionName: 'pay',
      args: [to as `0x${string}`, amountWei, contractIdHex as `0x${string}`],
      account: this.account,
      chain: undefined,
    });
    await this.publicClient.waitForTransactionReceipt({ hash });
    return { txHash: hash };
  }

  async balance(account: string): Promise<string> {
    const address = process.env.SETTLEMENT_ADDRESS;
    if (!address) throw new SettlementError('SETTLEMENT_ADDRESS not set', 'CONFIG');

    const bal = await this.publicClient.readContract({
      address: address as `0x${string}`,
      abi: [{ type: 'function', name: 'balance', inputs: [{ name: '_account', type: 'address' }], outputs: [{ type: 'uint256' }] }],
      functionName: 'balance',
      args: [account as `0x${string}`],
    }) as bigint;
    return (Number(bal) / 1e6).toFixed(6) + ' USDC';
  }

  // Phase 2: Nanopayments for microtransactions

  /**
   * Create a nanopayment channel for off-chain microtransactions
   */
  async createNanopaymentChannel(
    receiver: string,
    totalDeposit: string,
    durationHours: number = 24
  ): Promise<NanopaymentChannel> {
    if (!this.account) throw new SettlementError('PRIVATE_KEY not set', 'AUTH');

    const channelId = `nano-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const now = Date.now();
    const expiresAt = new Date(now + durationHours * 3600 * 1000).toISOString();

    const channel: NanopaymentChannel = {
      channelId,
      sender: this.account.address,
      receiver,
      totalDeposit,
      withdrawn: '0',
      expiresAt,
    };

    // In production: deposit USDC to smart contract
    this.channels.set(channelId, channel);
    this.transfers.set(channelId, []);

    return channel;
  }

  /**
   * Sign a nanopayment transfer (sender side)
   */
  async signNanopayment(
    channelId: string,
    amount: string,
    sequence: number
  ): Promise<NanopaymentTransfer> {
    if (!this.account) throw new SettlementError('PRIVATE_KEY not set', 'AUTH');

    const channel = this.channels.get(channelId);
    if (!channel) throw new SettlementError(`Channel not found: ${channelId}`, 'NOT_FOUND');
    if (channel.sender !== this.account.address) throw new SettlementError('Not the sender', 'FORBIDDEN');

    const messageHash = `0x${Buffer.from(`${channelId}:${amount}:${sequence}`).toString('hex')}` as const;
    const signature = await this.account.signMessage({ message: { raw: messageHash } });

    const transfer: NanopaymentTransfer = {
      channelId,
      amount,
      sequence,
      signature,
    };

    return transfer;
  }

  /**
   * Validate and record a nanopayment transfer (receiver side)
   */
  async receiveNanopayment(transfer: NanopaymentTransfer): Promise<{ valid: boolean; totalReceived: string }> {
    const channel = this.channels.get(transfer.channelId);
    if (!channel) throw new SettlementError(`Channel not found: ${transfer.channelId}`, 'NOT_FOUND');

    const transfers = this.transfers.get(transfer.channelId) || [];
    const lastSequence = transfers.length > 0 ? transfers[transfers.length - 1].sequence : 0;

    if (transfer.sequence !== lastSequence + 1) {
      throw new SettlementError(`Invalid sequence: expected ${lastSequence + 1}, got ${transfer.sequence}`, 'INVALID_SEQUENCE');
    }

    // In production: verify signature using viem's verifyMessage
    transfers.push(transfer);
    this.transfers.set(transfer.channelId, transfers);

    const totalReceived = transfers.reduce((sum, t) => sum + parseFloat(t.amount), 0);
    return { valid: true, totalReceived: totalReceived.toFixed(6) };
  }

  /**
   * Close nanopayment channel and withdraw to on-chain settlement
   */
  async closeNanopaymentChannel(channelId: string): Promise<{ txHash?: string; withdrawn: string }> {
    const channel = this.channels.get(channelId);
    if (!channel) throw new SettlementError(`Channel not found: ${channelId}`, 'NOT_FOUND');

    const transfers = this.transfers.get(channelId) || [];
    const lastTransfer = transfers[transfers.length - 1];
    const totalSent = lastTransfer ? transfers.reduce((sum, t) => sum + parseFloat(t.amount), 0) : 0;

    // In production: call smart contract to withdraw
    const result = {
      withdrawn: totalSent.toFixed(6) + ' USDC',
    };

    this.channels.delete(channelId);
    this.transfers.delete(channelId);

    return result;
  }

  /**
   * Get nanopayment channel details
   */
  getNanopaymentChannel(channelId: string): NanopaymentChannel | undefined {
    return this.channels.get(channelId);
  }

  /**
   * List nanopayment channels for an address
   */
  listNanopaymentChannels(address: string): NanopaymentChannel[] {
    return Array.from(this.channels.values()).filter(
      ch => ch.sender === address || ch.receiver === address
    );
  }

  // Phase 2: e-CNY Support (Placeholder for CBDC integration)

  /**
   * Send payment in specified currency (USDC or CNY)
   */
  async sendMultiCurrency(
    to: string,
    amount: string,
    currency: Currency = 'USDC',
    contractId?: string
  ): Promise<{ txHash?: string; reference?: string }> {
    if (currency === 'USDC') {
      return this.send(to, amount, contractId);
    }

    // e-CNY: integrate with China's CBDC bridge or licensed payment gateway
    // This is a placeholder - in production, connect to certified e-CNY API
    return {
      reference: `ecny-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    };
  }

  /**
   * Get balance in specified currency
   */
  async getBalance(currency: Currency = 'USDC', account?: string): Promise<string> {
    if (currency === 'USDC') {
      const addr = account || this.account?.address;
      if (!addr) throw new SettlementError('No account provided', 'AUTH');
      return this.balance(addr);
    }

    // e-CNY: query CBDC gateway balance
    // Placeholder: return mock balance
    return '0.00 CNY';
  }

  /**
   * Get exchange rate between USDC and CNY
   */
  async getExchangeRate(): Promise<{ usdToCny: number; cnyToUsd: number }> {
    // In production: fetch from oracle or price feed
    // Placeholder: fixed rate (should be ~7.2 in reality)
    return {
      usdToCny: 7.2,
      cnyToUsd: 0.1389,
    };
  }
}
