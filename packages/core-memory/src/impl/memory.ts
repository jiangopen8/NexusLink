import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { homedir } from 'node:os';
import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto';
import { sha256 } from '@noble/hashes/sha256';
import type { MemoryShard } from '../types.js';
import type { SALModule } from '@nexuslink/core-sal';

function resolvePath(path?: string): string {
  return (path ?? '~/.nexuslink/memory-index.json').replace(/^~/, homedir());
}

function deriveKey(key: Uint8Array): Buffer {
  if (key.byteLength === 0) throw new Error('Memory encryption key must not be empty');
  return createHash('sha256').update(key).digest();
}

function isVersionedPayload(data: Uint8Array): boolean {
  return Buffer.from(data.subarray(0, 6)).toString('utf-8') === 'NXM1G:';
}

export class MemoryModule {
  private indexPath: string;
  private key: Buffer;

  constructor(
    private ownerDid: string,
    private encryptionKey: Uint8Array,
    private salModule: SALModule,
    indexPath?: string,
  ) {
    this.indexPath = resolvePath(indexPath);
    this.key = deriveKey(this.encryptionKey);
  }

  private encrypt(data: Uint8Array): Uint8Array {
    const iv = randomBytes(12);
    const cipher = createCipheriv('aes-256-gcm', this.key, iv);
    const ciphertext = Buffer.concat([cipher.update(data), cipher.final()]);
    const authTag = cipher.getAuthTag();
    return Buffer.concat([Buffer.from('NXM1G:'), iv, authTag, ciphertext]);
  }

  private decrypt(data: Uint8Array): Uint8Array {
    if (!isVersionedPayload(data)) {
      const plaintext = Buffer.from(data).map((b, i) =>
        b ^ this.encryptionKey[i % this.encryptionKey.length]
      );
      return new Uint8Array(plaintext);
    }

    const payload = Buffer.from(data);
    const iv = payload.subarray(6, 18);
    const authTag = payload.subarray(18, 34);
    const ciphertext = payload.subarray(34);
    const decipher = createDecipheriv('aes-256-gcm', this.key, iv);
    decipher.setAuthTag(authTag);
    return new Uint8Array(Buffer.concat([decipher.update(ciphertext), decipher.final()]));
  }

  async store(data: Uint8Array, tags: string[] = []): Promise<MemoryShard> {
    const ciphertext = this.encrypt(data);
    const cid = await this.salModule.store(ciphertext);
    const id = Buffer.from(sha256(data)).toString('hex').slice(0, 16);
    const shard: MemoryShard = {
      id,
      ownerDid: this.ownerDid,
      encryptedCid: cid,
      size: data.byteLength,
      tags,
      createdAt: new Date().toISOString(),
      accessedAt: new Date().toISOString(),
    };
    this.saveShard(shard);
    return shard;
  }

  async retrieve(shard: MemoryShard): Promise<Uint8Array> {
    const encrypted = await this.salModule.retrieve(shard.encryptedCid);
    this.saveShard({ ...shard, accessedAt: new Date().toISOString() });
    return this.decrypt(encrypted);
  }

  async retrieveById(id: string): Promise<Uint8Array> {
    const shard = this.getShard(id);
    if (!shard) throw new Error(`Memory shard not found: ${id}`);
    return this.retrieve(shard);
  }

  list(): MemoryShard[] {
    return this.readIndex().filter(shard => shard.ownerDid === this.ownerDid);
  }

  getShard(id: string): MemoryShard | undefined {
    return this.list().find(shard => shard.id === id || shard.encryptedCid === id);
  }

  async delete(id: string): Promise<void> {
    const shard = this.getShard(id);
    if (!shard) throw new Error(`Memory shard not found: ${id}`);
    await this.salModule.unpin(shard.encryptedCid);
    this.writeIndex(this.readIndex().filter(item => item.id !== shard.id));
  }

  sync(): { ownerDid: string; shards: number; bytes: number } {
    const shards = this.list();
    return {
      ownerDid: this.ownerDid,
      shards: shards.length,
      bytes: shards.reduce((sum, shard) => sum + shard.size, 0),
    };
  }

  private saveShard(shard: MemoryShard): void {
    const index = this.readIndex().filter(item => item.id !== shard.id);
    index.push(shard);
    this.writeIndex(index);
  }

  private readIndex(): MemoryShard[] {
    if (!existsSync(this.indexPath)) return [];
    return JSON.parse(readFileSync(this.indexPath, 'utf-8')) as MemoryShard[];
  }

  private writeIndex(index: MemoryShard[]): void {
    const dir = dirname(this.indexPath);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(this.indexPath, JSON.stringify(index, null, 2), 'utf-8');
  }
}
