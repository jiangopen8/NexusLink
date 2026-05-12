import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { homedir } from 'node:os';
import { randomUUID } from 'node:crypto';
import { createWalletClient, createPublicClient, http, keccak256, toHex } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { ConfigStore } from '@nexuslink/core-config';
import type { DIDDocument, DIDRegisterOptions } from '../types.js';

export class NexusDIDError extends Error {
  constructor(msg: string, public code: string) { super(msg); this.name = 'NexusDIDError'; }
}

function didToHash(did: string): `0x${string}` {
  const withoutPrefix = did.replace('did:nexus:', '');
  return keccak256(toHex(withoutPrefix, { size: 32 })) as `0x${string}`;
}

interface IdentityState {
  documents: DIDDocument[];
}

function resolveStatePath(path?: string): string {
  return (path ?? '~/.nexuslink/did-registry.json').replace(/^~/, homedir());
}

function createLocalAddress(seed: string): string {
  return `0x${keccak256(toHex(seed)).slice(26)}`;
}

export class IdentityModule {
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
    const chain = {
      id: chainId,
      name: this.config.getNetwork() === 'mainnet' ? 'Arbitrum One' : 'Arbitrum Sepolia',
      nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
      rpcUrls: { default: { http: [this.config.getRpcUrl()] } },
    } as const;
    this.wallet = createWalletClient({ account: this.account, transport: http(this.config.getRpcUrl()), chain });
    this.publicClient = createPublicClient({ transport: http(this.config.getRpcUrl()), chain });
  }

  async register(options: DIDRegisterOptions): Promise<DIDDocument> {
    if (!this.account || !this.wallet || !this.publicClient || !process.env.DID_REGISTRY_ADDRESS) {
      return this.registerLocal(options);
    }

    const did = `did:nexus:${this.account.address}`;
    const didHash = didToHash(did);
    const ipfsHash = keccak256(toHex(`nexus-did-${did}`)) as `0x${string}`;
    const registry = process.env.DID_REGISTRY_ADDRESS;
    if (!registry) throw new NexusDIDError('DID_REGISTRY_ADDRESS not set', 'CONFIG');

    const hash = await this.wallet.writeContract({
      address: registry as `0x${string}`,
      abi: [
        { type: 'function', name: 'register', inputs: [
          { name: '_didHash', type: 'bytes32' }, { name: '_ipfsHash', type: 'bytes32' },
        ], outputs: [], stateMutability: 'nonpayable' },
      ],
      functionName: 'register',
      args: [didHash, ipfsHash],
      account: this.account,
      chain: undefined,
    });
    await this.publicClient.waitForTransactionReceipt({ hash });

    return {
      id: did,
      type: options.type,
      owner: this.account.address,
      skills: options.skills ?? [],
      languages: options.languages ?? ['en'],
      ipfsHash,
      createdAt: new Date().toISOString(),
    };
  }

  async resolve(did: string): Promise<DIDDocument> {
    if (!this.publicClient || !process.env.DID_REGISTRY_ADDRESS) {
      const doc = this.read().documents.find(item => item.id === did);
      if (!doc) throw new NexusDIDError(`DID not found: ${did}`, 'NOT_FOUND');
      return doc;
    }

    const didHash = didToHash(did);
    const registry = process.env.DID_REGISTRY_ADDRESS;
    if (!registry) throw new NexusDIDError('DID_REGISTRY_ADDRESS not set', 'CONFIG');

    const result = await this.publicClient.readContract({
      address: registry as `0x${string}`,
      abi: [
        { type: 'function', name: 'resolve', inputs: [{ name: '_didHash', type: 'bytes32' }], outputs: [
          { name: 'owner', type: 'address' }, { name: 'ipfsHash', type: 'bytes32' },
          { name: 'active', type: 'bool' }, { name: 'createdAt', type: 'uint256' }, { name: 'updatedAt', type: 'uint256' },
        ], stateMutability: 'view' },
      ],
      functionName: 'resolve',
      args: [didHash],
    }) as readonly [string, string, boolean, bigint, bigint];

    return {
      id: did,
      type: 'AssistantAgent',
      owner: result[0],
      skills: [],
      languages: [],
      ipfsHash: result[1],
      createdAt: new Date(Number(result[3]) * 1000).toISOString(),
      updatedAt: new Date(Number(result[4]) * 1000).toISOString(),
    };
  }

  async deactivate(did: string): Promise<void> {
    if (!this.wallet || !this.account || !process.env.DID_REGISTRY_ADDRESS) {
      const state = this.read();
      const doc = state.documents.find(item => item.id === did);
      if (!doc) throw new NexusDIDError(`DID not found: ${did}`, 'NOT_FOUND');
      this.write({
        documents: state.documents.map(item =>
          item.id === did ? { ...item, deactivated: true, updatedAt: new Date().toISOString() } : item
        ),
      });
      return;
    }

    const didHash = didToHash(did);
    const registry = process.env.DID_REGISTRY_ADDRESS;
    if (!registry) throw new NexusDIDError('DID_REGISTRY_ADDRESS not set', 'CONFIG');
    const hash = await this.wallet.writeContract({
      address: registry as `0x${string}`,
      abi: [{ type: 'function', name: 'deactivate', inputs: [{ name: '_didHash', type: 'bytes32' }], outputs: [] }],
      functionName: 'deactivate',
      args: [didHash],
      account: this.account,
      chain: undefined,
    });
    await this.publicClient!.waitForTransactionReceipt({ hash });
  }

  async update(did: string, patch: Partial<DIDDocument>): Promise<DIDDocument> {
    const current = await this.resolve(did);
    const updated = { ...current, ...patch, id: current.id, updatedAt: new Date().toISOString() };
    const state = this.read();
    this.write({ documents: state.documents.map(item => item.id === did ? updated : item) });
    return updated;
  }

  private registerLocal(options: DIDRegisterOptions): DIDDocument {
    const seed = `${randomUUID()}-${options.type}`;
    const owner = options.ownerDid ?? createLocalAddress(seed);
    const did = `did:nexus:${owner}`;
    const doc: DIDDocument = {
      id: did,
      type: options.type,
      owner,
      skills: options.skills ?? [],
      languages: options.languages ?? ['en'],
      ipfsHash: keccak256(toHex(JSON.stringify(options))),
      createdAt: new Date().toISOString(),
    };
    const state = this.read();
    this.write({ documents: [...state.documents.filter(item => item.id !== doc.id), doc] });
    return doc;
  }

  private read(): IdentityState {
    if (!existsSync(this.statePath)) return { documents: [] };
    return JSON.parse(readFileSync(this.statePath, 'utf-8')) as IdentityState;
  }

  private write(state: IdentityState): void {
    const dir = dirname(this.statePath);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(this.statePath, JSON.stringify(state, null, 2), 'utf-8');
  }
}
