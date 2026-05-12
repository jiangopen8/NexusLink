import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { homedir } from 'node:os';
import { createWalletClient, createPublicClient, http, keccak256, toBytes } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { ConfigStore } from '@nexuslink/core-config';
import type { NSSDescriptor, DiscoverFilters, SkillResult } from '../types.js';

export class NSSError extends Error {
  constructor(msg: string, public code: string) { super(msg); this.name = 'NSSError'; }
}

interface NSSState {
  descriptors: NSSDescriptor[];
  invocations: Array<{ skillId: string; input: unknown; invokedAt: string }>;
}

function resolveStatePath(path?: string): string {
  return (path ?? '~/.nexuslink/nss-registry.json').replace(/^~/, homedir());
}

export class NSSModule {
  wallet?: ReturnType<typeof createWalletClient>;
  publicClient?: ReturnType<typeof createPublicClient>;
  account?: ReturnType<typeof privateKeyToAccount>;
  private statePath: string;

  constructor(private config: ConfigStore, statePath?: string) {
    this.statePath = resolveStatePath(statePath);
    const pk = process.env.PRIVATE_KEY;
    if (!pk) return;
    this.account = privateKeyToAccount(pk as `0x${string}`);
    const chainId = this.config.getNetwork() === 'mainnet' ? 42161 : 421614;
    const chain = { id: chainId, name: '', nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 }, rpcUrls: { default: { http: [this.config.getRpcUrl()] } } } as const;
    this.wallet = createWalletClient({ account: this.account, transport: http(this.config.getRpcUrl()), chain });
    this.publicClient = createPublicClient({ transport: http(this.config.getRpcUrl()), chain });
  }

  async publish(descriptor: NSSDescriptor): Promise<{ skillId: string; txHash: string }> {
    const validation = this.validate(descriptor);
    if (!validation.valid) throw new NSSError(validation.errors.join(', '), 'VALIDATION');

    if (!this.wallet || !this.account || !this.publicClient || !process.env.NSS_REGISTRY_ADDRESS) {
      const state = this.read();
      this.write({
        ...state,
        descriptors: [...state.descriptors.filter(item => item.skillId !== descriptor.skillId), descriptor],
      });
      return {
        skillId: descriptor.skillId,
        txHash: keccak256(toBytes(JSON.stringify(descriptor))),
      };
    }

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
    const intent = _intent.toLowerCase();
    const filters = _filters ?? {};
    let results = this.read().descriptors.filter(descriptor => {
      const haystack = [
        descriptor.skillId,
        descriptor.name,
        descriptor.description,
        ...descriptor.tags,
      ].join(' ').toLowerCase();
      return !intent || haystack.includes(intent);
    });
    if (filters.tags?.length) {
      results = results.filter(descriptor => filters.tags!.every(tag => descriptor.tags.includes(tag)));
    }
    if (filters.maxPrice) {
      const maxPrice = parseFloat(filters.maxPrice);
      results = results.filter(descriptor => parseFloat(descriptor.priceUsdc ?? '0') <= maxPrice);
    }
    return results.slice(0, filters.limit ?? 10);
  }

  async invoke(skillId: string, input: unknown): Promise<SkillResult> {
    if (!this.wallet || !this.account || !this.publicClient || !process.env.NSS_REGISTRY_ADDRESS) {
      const state = this.read();
      const descriptor = state.descriptors.find(item => item.skillId === skillId);
      if (!descriptor) throw new NSSError(`Skill not found: ${skillId}`, 'NOT_FOUND');
      this.write({
        ...state,
        invocations: [...state.invocations, { skillId, input, invokedAt: new Date().toISOString() }],
      });
      return {
        success: true,
        data: { skillId, input, descriptor },
        message: `Skill ${skillId} invoked`,
      };
    }

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

  list(): NSSDescriptor[] {
    return this.read().descriptors;
  }

  private read(): NSSState {
    if (!existsSync(this.statePath)) return { descriptors: [], invocations: [] };
    return JSON.parse(readFileSync(this.statePath, 'utf-8')) as NSSState;
  }

  private write(state: NSSState): void {
    const dir = dirname(this.statePath);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(this.statePath, JSON.stringify(state, null, 2), 'utf-8');
  }
}
