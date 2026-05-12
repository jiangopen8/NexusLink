export interface SALBackend {
  store(data: Uint8Array): Promise<string>;
  retrieve(cid: string): Promise<Uint8Array>;
  unpin(cid: string): Promise<void>;
}

export type SALBackendType = 'local' | 'ipfs' | '0g' | 'zerog';

export interface SALOptions {
  backend: SALBackendType;
  // Local development storage
  localPath?: string;
  // IPFS/Pinata credentials
  pinataApiKey?: string;
  pinataSecret?: string;
  // 0G credentials
  zeroGApiKey?: string;
  zeroGApiUrl?: string;
}
