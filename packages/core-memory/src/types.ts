export interface MemoryShard {
  id: string;
  ownerDid: string;
  encryptedCid: string;
  size: number;
  tags?: string[];
  createdAt: string;
  accessedAt: string;
}

export interface MemoryStoreOptions {
  ownerDid: string;
  encryptionKey: Uint8Array;
}
