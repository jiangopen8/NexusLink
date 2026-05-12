import { describe, it, expect } from 'vitest';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { SALModule } from '../impl/sal.js';

describe('SALModule', () => {
  it('throws when IPFS credentials are missing', () => {
    expect(() => new SALModule({ backend: 'ipfs', pinataApiKey: '', pinataSecret: '' }))
      .toThrow('Pinata API credentials required');
  });

  it('throws when IPFS credentials are empty strings', () => {
    expect(() => new SALModule({ backend: 'ipfs', pinataApiKey: '   ', pinataSecret: '' }))
      .toThrow('Pinata API credentials required');
  });

  it('stores, retrieves, and unpins data with local backend', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'nexuslink-sal-'));
    const sal = new SALModule({ backend: 'local', localPath: dir });
    const cid = await sal.store(Buffer.from('hello'));
    expect(Buffer.from(await sal.retrieve(cid)).toString()).toBe('hello');
    await sal.unpin(cid);
    await expect(sal.retrieve(cid)).rejects.toThrow();
  });
});
