export interface SALBackend {
  store(data: Uint8Array): Promise<string>;
  retrieve(cid: string): Promise<Uint8Array>;
  unpin(cid: string): Promise<void>;
}

export interface SALOptions {
  backend: 'ipfs';
  pinataApiKey: string;
  pinataSecret: string;
}
