import { sha256 } from '@noble/hashes/sha256';
import type { MemoryShard } from '../types.js';
import type { SALModule } from '@nexuslink/core-sal';

export class MemoryModule {
  constructor(
    private ownerDid: string,
    private encryptionKey: Uint8Array,
    private salModule: SALModule,
  ) {}

  private encrypt(data: Uint8Array): Uint8Array {
    // Phase 1: XOR cipher with key expansion (accepts any key length)
    const ciphertext = Buffer.from(data).map((b, i) =>
      b ^ this.encryptionKey[i % this.encryptionKey.length]
    );
    return new Uint8Array(ciphertext);
  }

  private decrypt(data: Uint8Array): Uint8Array {
    // XOR is symmetric
    const plaintext = Buffer.from(data).map((b, i) =>
      b ^ this.encryptionKey[i % this.encryptionKey.length]
    );
    return new Uint8Array(plaintext);
  }

  async store(data: Uint8Array): Promise<MemoryShard> {
    const ciphertext = this.encrypt(data);
    const cid = await this.salModule.store(ciphertext);
    const id = Buffer.from(sha256(data)).toString('hex').slice(0, 16);
    const shard: MemoryShard = {
      id,
      ownerDid: this.ownerDid,
      encryptedCid: cid,
      createdAt: new Date().toISOString(),
      accessedAt: new Date().toISOString(),
    };
    return shard;
  }

  async retrieve(shard: MemoryShard): Promise<Uint8Array> {
    const encrypted = await this.salModule.retrieve(shard.encryptedCid);
    return this.decrypt(encrypted);
  }
}
