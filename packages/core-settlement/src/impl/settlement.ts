import { createPublicClient, createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { ConfigStore } from '@nexuslink/core-config';

export class SettlementError extends Error {
  constructor(msg: string, public code: string) { super(msg); this.name = 'SettlementError'; }
}

export class SettlementModule {
  private publicClient: ReturnType<typeof createPublicClient>;
  private wallet: ReturnType<typeof createWalletClient> | null = null;
  private account: ReturnType<typeof privateKeyToAccount> | null = null;

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
}
