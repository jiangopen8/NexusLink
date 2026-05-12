import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { createHash } from 'node:crypto';
import type { SALBackend } from '../types.js';

function resolvePath(path?: string): string {
  return (path ?? '~/.nexuslink/storage').replace(/^~/, homedir());
}

export class LocalSAL implements SALBackend {
  private root: string;

  constructor(path?: string) {
    this.root = resolvePath(path);
    if (!existsSync(this.root)) mkdirSync(this.root, { recursive: true });
  }

  async store(data: Uint8Array): Promise<string> {
    const digest = createHash('sha256').update(data).digest('hex');
    const cid = `local-${digest}`;
    writeFileSync(this.fileFor(cid), Buffer.from(data));
    return cid;
  }

  async retrieve(cid: string): Promise<Uint8Array> {
    return new Uint8Array(readFileSync(this.fileFor(cid)));
  }

  async unpin(cid: string): Promise<void> {
    const file = this.fileFor(cid);
    if (existsSync(file)) unlinkSync(file);
  }

  private fileFor(cid: string): string {
    const safe = cid.replace(/[^a-zA-Z0-9._-]/g, '_');
    return join(this.root, safe);
  }
}
