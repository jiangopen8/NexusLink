import { createWalletClient, createPublicClient, http, keccak256, toBytes } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { ConfigStore } from '@nexuslink/core-config';
import type { NSSDescriptor, DiscoverFilters, SkillResult } from '../types.js';

export class NSSError extends Error {
  constructor(msg: string, public code: string) { super(msg); this.name = 'NSSError'; }
}

export class NSSModule {
  wallet: ReturnType<typeof createWalletClient>;
  publicClient: ReturnType<typeof createPublicClient>;
  account: ReturnType<typeof privateKeyToAccount>;

  constructor(private config: ConfigStore) {
    const pk = process.env.PRIVATE_KEY;
    if (!pk) throw new NSSError('PRIVATE_KEY not set', 'AUTH');
    this.account = privateKeyToAccount(pk as `0x${string}`);
    const chainId = this.config.getNetwork() === 'mainnet' ? 42161 : 421614;
    const chain = { id: chainId, name: '', nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 }, rpcUrls: { default: { http: [this.config.getRpcUrl()] } } } as const;
    this.wallet = createWalletClient({ account: this.account, transport: http(this.config.getRpcUrl()), chain });
    this.publicClient = createPublicClient({ transport: http(this.config.getRpcUrl()), chain });
  }

  async publish(descriptor: NSSDescriptor): Promise<{ skillId: string; txHash: string }> {
    const registry = process.env.NSS_REGISTRY_ADDRESS;
    if (!registry) throw new NSSError('NSS_REGISTRY_ADDRESS not set', 'CONFIG');

    const skillIdHash = keccak256(toBytes(descriptor.skillId)) as `0x${string}`;
    const pubDidHash = keccak256(toBytes(descriptor.publisherDid)) as `0x${string}`;
    const descHash = keccak256(toBytes(JSON.stringify(descriptor))) as `0x${string}`;
    const priceWei = BigInt(parseFloat(descriptor.priceUsdc ?? '0') * 1e6);

    const hash = await this.wallet.writeContract({
      address: registry as `0x${string}`,
      abi: [
        { type: 'function', name: 'publish', inputs: [
          { name: '_skillId', type: 'bytes32' }, { name: '_publisherDidHash', type: 'bytes32' },
          { name: '_descriptorIpfsHash', type: 'bytes32' }, { name: '_priceWei', type: 'uint256' },
        ], outputs: [], stateMutability: 'nonpayable' },
      ],
      functionName: 'publish',
      args: [skillIdHash, pubDidHash, descHash, priceWei],
      account: this.account,
      chain: undefined,
    });
    await this.publicClient.waitForTransactionReceipt({ hash });
    return { skillId: descriptor.skillId, txHash: hash };
  }

  async discover(_intent: string, _filters?: DiscoverFilters): Promise<NSSDescriptor[]> {
    return [];
  }

  async invoke(skillId: string, _input: unknown): Promise<SkillResult> {
    const registry = process.env.NSS_REGISTRY_ADDRESS;
    if (!registry) throw new NSSError('NSS_REGISTRY_ADDRESS not set', 'CONFIG');
    const skillIdHash = keccak256(toBytes(skillId)) as `0x${string}`;
    const hash = await this.wallet.writeContract({
      address: registry as `0x${string}`,
      abi: [{ type: 'function', name: 'invoke', inputs: [{ name: '_skillId', type: 'bytes32' }], outputs: [] }],
      functionName: 'invoke',
      args: [skillIdHash],
      account: this.account,
      chain: undefined,
    });
    await this.publicClient.waitForTransactionReceipt({ hash });
    return { success: true, data: {}, message: `Skill ${skillId} invoked` };
  }

  validate(descriptor: NSSDescriptor): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    if (!descriptor.skillId) errors.push('skillId is required');
    if (!descriptor.name) errors.push('name is required');
    if (!descriptor.version) errors.push('version is required');
    if (!descriptor.publisherDid) errors.push('publisherDid is required');
    return { valid: errors.length === 0, errors };
  }
}
