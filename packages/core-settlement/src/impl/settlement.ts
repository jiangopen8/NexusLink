import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { homedir } from 'node:os';
import { randomBytes, randomUUID } from 'node:crypto';
import { createPublicClient, createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { ConfigStore } from '@nexuslink/core-config';
import type { Currency, ECNYGateway, NanopaymentChannel, NanopaymentTransfer, Payment, PaymentHistoryEntry } from '../types.js';

export class SettlementError extends Error {
  constructor(msg: string, public code: string) {
    super(msg);
    this.name = 'SettlementError';
  }
}

interface SettlementState {
  balances: Record<string, Record<Currency, number>>;
  payments: Payment[];
  ecnyPayments: Array<{ from: string; to: string; amount: string; contractId?: string; reference: string; timestamp: string }>;
  nanopaymentChannels: NanopaymentChannel[];
  nanopaymentTransfers: Record<string, NanopaymentTransfer[]>;
}

function resolveStatePath(path?: string): string {
  return (path ?? '~/.nexuslink/settlement-ledger.json').replace(/^~/, homedir());
}

class LocalECNYGateway implements ECNYGateway {
  constructor(
    private read: () => SettlementState,
    private write: (state: SettlementState) => void,
    private sender: () => string,
  ) {}

  async send(to: string, amount: string, contractId?: string): Promise<{ reference: string; status: 'pending' | 'success' | 'failed' }> {
    const reference = `ecny-${randomUUID()}`;
    const state = this.read();
    state.ecnyPayments.push({ from: this.sender(), to, amount, contractId, reference, timestamp: new Date().toISOString() });
    this.write(state);
    return { reference, status: 'success' };
  }

  async balance(account = this.sender()): Promise<string> {
    const amount = this.read().balances[account]?.CNY ?? 10000;
    return `${amount.toFixed(2)} CNY`;
  }

  async exchangeRate(): Promise<{ usdToCny: number; cnyToUsd: number }> {
    const usdToCny = Number(process.env.NEXUSLINK_USD_CNY_RATE ?? '7.2');
    return { usdToCny, cnyToUsd: Number((1 / usdToCny).toFixed(6)) };
  }
}

export class SettlementModule {
  private publicClient: ReturnType<typeof createPublicClient>;
  private wallet: ReturnType<typeof createWalletClient> | null = null;
  private account: ReturnType<typeof privateKeyToAccount> | null = null;
  private channels = new Map<string, NanopaymentChannel>();
  private transfers = new Map<string, NanopaymentTransfer[]>();
  private statePath: string;
  private ecnyGateway: ECNYGateway;

  constructor(private config: ConfigStore, statePath?: string, ecnyGateway?: ECNYGateway) {
    this.statePath = resolveStatePath(statePath);
    this.ecnyGateway = ecnyGateway ?? new LocalECNYGateway(
      () => this.readState(),
      state => this.writeState(state),
      () => this.getSenderAddress(),
    );

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
    if (!this.wallet || !this.account || !process.env.SETTLEMENT_ADDRESS) {
      return this.sendLocal(to, amountUsdc, contractId);
    }

    const amountWei = BigInt(Math.round(parseFloat(amountUsdc) * 1e6));
    const contractIdHex = contractId
      ? `0x${Buffer.from(contractId).toString('hex').padEnd(64, '0')}`
      : `0x${'0'.repeat(64)}`;

    const hash = await this.wallet.writeContract({
      address: process.env.SETTLEMENT_ADDRESS as `0x${string}`,
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
    if (!process.env.SETTLEMENT_ADDRESS) {
      const amount = this.readState().balances[account]?.USDC ?? 1000;
      return `${amount.toFixed(6)} USDC`;
    }

    const bal = await this.publicClient.readContract({
      address: process.env.SETTLEMENT_ADDRESS as `0x${string}`,
      abi: [{ type: 'function', name: 'balance', inputs: [{ name: '_account', type: 'address' }], outputs: [{ type: 'uint256' }] }],
      functionName: 'balance',
      args: [account as `0x${string}`],
    }) as bigint;
    return `${(Number(bal) / 1e6).toFixed(6)} USDC`;
  }

  async createNanopaymentChannel(
    receiver: string,
    totalDeposit: string,
    durationHours = 24,
  ): Promise<NanopaymentChannel> {
    const channelId = `nano-${randomUUID()}`;
    const expiresAt = new Date(Date.now() + durationHours * 3600 * 1000).toISOString();
    const channel: NanopaymentChannel = {
      channelId,
      sender: this.getSenderAddress(),
      receiver,
      totalDeposit,
      withdrawn: '0',
      expiresAt,
    };
    this.saveChannel(channel);
    return channel;
  }

  async signNanopayment(channelId: string, amount: string, sequence: number): Promise<NanopaymentTransfer> {
    const channel = this.getNanopaymentChannel(channelId);
    if (!channel) throw new SettlementError(`Channel not found: ${channelId}`, 'NOT_FOUND');
    if (channel.sender !== this.getSenderAddress()) throw new SettlementError('Not the sender', 'FORBIDDEN');

    const message = `${channelId}:${amount}:${sequence}`;
    const signature = this.account
      ? await this.account.signMessage({ message })
      : `local:${Buffer.from(message).toString('base64url')}`;
    return { channelId, amount, sequence, signature };
  }

  async receiveNanopayment(transfer: NanopaymentTransfer): Promise<{ valid: boolean; totalReceived: string }> {
    const channel = this.getNanopaymentChannel(transfer.channelId);
    if (!channel) throw new SettlementError(`Channel not found: ${transfer.channelId}`, 'NOT_FOUND');

    const transfers = this.getTransfers(transfer.channelId);
    const lastSequence = transfers.length > 0 ? transfers[transfers.length - 1].sequence : 0;
    if (transfer.sequence !== lastSequence + 1) {
      throw new SettlementError(`Invalid sequence: expected ${lastSequence + 1}, got ${transfer.sequence}`, 'INVALID_SEQUENCE');
    }

    transfers.push(transfer);
    const totalReceived = transfers.reduce((sum, item) => sum + parseFloat(item.amount), 0);
    if (totalReceived > parseFloat(channel.totalDeposit)) {
      throw new SettlementError('Transfer exceeds channel deposit', 'INSUFFICIENT_CHANNEL_FUNDS');
    }
    this.saveTransfers(transfer.channelId, transfers);
    return { valid: true, totalReceived: totalReceived.toFixed(6) };
  }

  async closeNanopaymentChannel(channelId: string): Promise<{ txHash?: string; withdrawn: string }> {
    const channel = this.getNanopaymentChannel(channelId);
    if (!channel) throw new SettlementError(`Channel not found: ${channelId}`, 'NOT_FOUND');

    const transfers = this.getTransfers(channelId);
    const totalSent = transfers.reduce((sum, item) => sum + parseFloat(item.amount), 0);
    this.deleteChannel(channelId);
    return { withdrawn: `${totalSent.toFixed(6)} USDC` };
  }

  getNanopaymentChannel(channelId: string): NanopaymentChannel | undefined {
    return this.readState().nanopaymentChannels.find(channel => channel.channelId === channelId);
  }

  listNanopaymentChannels(address: string): NanopaymentChannel[] {
    return this.readState().nanopaymentChannels.filter(channel =>
      !address || channel.sender === address || channel.receiver === address
    );
  }

  async sendMultiCurrency(
    to: string,
    amount: string,
    currency: Currency = 'USDC',
    contractId?: string,
  ): Promise<{ txHash?: string; reference?: string; status?: 'pending' | 'success' | 'failed' }> {
    if (currency === 'USDC') return this.send(to, amount, contractId);
    return this.ecnyGateway.send(to, amount, contractId);
  }

  async getBalance(currency: Currency = 'USDC', account?: string): Promise<string> {
    if (currency === 'USDC') return this.balance(account ?? this.getSenderAddress());
    return this.ecnyGateway.balance(account);
  }

  async getExchangeRate(): Promise<{ usdToCny: number; cnyToUsd: number }> {
    return this.ecnyGateway.exchangeRate();
  }

  history(party?: string): PaymentHistoryEntry[] {
    const state = this.readState();
    const usdc = state.payments.map(payment => ({
      from: payment.from,
      to: payment.to,
      amount: payment.amountUsdc,
      currency: 'USDC' as const,
      contractId: payment.contractId,
      txHash: payment.txHash,
      timestamp: payment.timestamp,
    }));
    const cny = state.ecnyPayments.map(payment => ({
      from: payment.from,
      to: payment.to,
      amount: payment.amount,
      currency: 'CNY' as const,
      contractId: payment.contractId,
      reference: payment.reference,
      timestamp: payment.timestamp,
    }));
    const all = [...usdc, ...cny].sort((a, b) => a.timestamp.localeCompare(b.timestamp));
    return party ? all.filter(entry => entry.from === party || entry.to === party) : all;
  }

  private sendLocal(to: string, amountUsdc: string, contractId?: string): { txHash: string } {
    const amount = parseFloat(amountUsdc);
    if (!Number.isFinite(amount) || amount <= 0) throw new SettlementError('Amount must be positive', 'INVALID_AMOUNT');

    const from = this.getSenderAddress();
    const state = this.readState();
    state.balances[from] ??= { USDC: 1000, CNY: 10000 };
    state.balances[to] ??= { USDC: 0, CNY: 0 };
    if (state.balances[from].USDC < amount) throw new SettlementError('Insufficient local USDC balance', 'INSUFFICIENT_FUNDS');

    state.balances[from].USDC -= amount;
    state.balances[to].USDC += amount;
    const txHash = `0x${randomBytes(32).toString('hex')}`;
    state.payments.push({ from, to, amountUsdc, contractId, txHash, timestamp: new Date().toISOString() });
    this.writeState(state);
    return { txHash };
  }

  private getSenderAddress(): string {
    return this.account?.address ?? process.env.AGENT_DID ?? 'did:nexus:local';
  }

  private readState(): SettlementState {
    if (!existsSync(this.statePath)) return this.emptyState();
    const parsed = JSON.parse(readFileSync(this.statePath, 'utf-8')) as Partial<SettlementState>;
    return {
      balances: parsed.balances ?? {},
      payments: parsed.payments ?? [],
      ecnyPayments: parsed.ecnyPayments ?? [],
      nanopaymentChannels: parsed.nanopaymentChannels ?? [],
      nanopaymentTransfers: parsed.nanopaymentTransfers ?? {},
    };
  }

  private writeState(state: SettlementState): void {
    const dir = dirname(this.statePath);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(this.statePath, JSON.stringify(state, null, 2), 'utf-8');
  }

  private emptyState(): SettlementState {
    return { balances: {}, payments: [], ecnyPayments: [], nanopaymentChannels: [], nanopaymentTransfers: {} };
  }

  private saveChannel(channel: NanopaymentChannel): void {
    const state = this.readState();
    state.nanopaymentChannels = [
      ...state.nanopaymentChannels.filter(item => item.channelId !== channel.channelId),
      channel,
    ];
    state.nanopaymentTransfers[channel.channelId] ??= [];
    this.writeState(state);
  }

  private getTransfers(channelId: string): NanopaymentTransfer[] {
    return [...(this.readState().nanopaymentTransfers[channelId] ?? [])];
  }

  private saveTransfers(channelId: string, transfers: NanopaymentTransfer[]): void {
    const state = this.readState();
    state.nanopaymentTransfers[channelId] = transfers;
    this.writeState(state);
  }

  private deleteChannel(channelId: string): void {
    const state = this.readState();
    state.nanopaymentChannels = state.nanopaymentChannels.filter(channel => channel.channelId !== channelId);
    delete state.nanopaymentTransfers[channelId];
    this.writeState(state);
  }
}
