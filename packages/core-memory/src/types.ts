export interface MemoryShard {
  id: string;
  ownerDid: string;
  encryptedCid: string;
  createdAt: string;
  accessedAt: string;
}

export interface MemoryStoreOptions {
  ownerDid: string;
  encryptionKey: Uint8Array;
}
