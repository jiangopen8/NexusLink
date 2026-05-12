import { describe, it, expect } from 'vitest';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { MemoryModule } from '../impl/memory.js';
import { SALModule } from '@nexuslink/core-sal';

describe('MemoryModule', () => {
  it('stores and retrieves encrypted data (mock SAL)', async () => {
    const key = new Uint8Array(32).fill(1);
    // Mock SAL that stores raw bytes and returns them
    const stored: Uint8Array[] = [];
    const mockSAL = {
      store: async (data: Uint8Array) => {
        stored.push(data);
        return 'QmMockCID';
      },
      retrieve: async (_cid: string) => {
        return stored[0] ?? new Uint8Array();
      },
    } as unknown as SALModule;

    const mem = new MemoryModule('did:nexus:0x123', key, mockSAL);
    const data = new Uint8Array([1, 2, 3, 4, 5]);
    const shard = await mem.store(data);
    expect(shard.ownerDid).toBe('did:nexus:0x123');
    expect(shard.encryptedCid).toBe('QmMockCID');
    expect(shard.id).toHaveLength(16);
  });

  it('indexes, retrieves by id, syncs, and deletes local shards', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'nexuslink-memory-'));
    const sal = new SALModule({ backend: 'local', localPath: join(dir, 'storage') });
    const mem = new MemoryModule('did:nexus:test', Buffer.from('key'), sal, join(dir, 'index.json'));
    const shard = await mem.store(Buffer.from('indexed'), ['test']);
    expect(mem.list()).toHaveLength(1);
    expect(Buffer.from(await mem.retrieveById(shard.id)).toString()).toBe('indexed');
    expect(mem.sync()).toMatchObject({ ownerDid: 'did:nexus:test', shards: 1, bytes: 7 });
    await mem.delete(shard.id);
    expect(mem.list()).toHaveLength(0);
  });

  it('round-trips data through encrypt/decrypt', async () => {
    const key = new Uint8Array(32).fill(42);
    const stored: Uint8Array[] = [];
    const mockSAL = {
      store: async (data: Uint8Array) => { stored.push(data); return 'QmTest'; },
      retrieve: async (_cid: string) => stored[0] ?? new Uint8Array(),
    } as unknown as SALModule;

    const mem = new MemoryModule('did:nexus:0xABC', key, mockSAL);
    const original = new Uint8Array([10, 20, 30, 40, 50, 60, 70, 80]);
    const shard = await mem.store(original);
    const retrieved = await mem.retrieve(shard);
    expect(retrieved).toEqual(original);
  });
});
