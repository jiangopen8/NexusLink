import type { SALBackend, SALOptions } from '../types.js';
import { PinataSAL } from './ipfs.js';

export class SALModule {
  private backend: SALBackend;

  constructor(options: SALOptions) {
    if (options.backend === 'ipfs') {
      if (!options.pinataApiKey || !options.pinataSecret) {
        throw new Error('Pinata API credentials required for IPFS backend');
      }
      this.backend = new PinataSAL(options.pinataApiKey, options.pinataSecret);
    } else {
      throw new Error(`Unknown SAL backend: ${options.backend}`);
    }
  }

  async store(data: Uint8Array): Promise<string> { return this.backend.store(data); }
  async retrieve(cid: string): Promise<Uint8Array> { return this.backend.retrieve(cid); }
  async unpin(cid: string): Promise<void> { return this.backend.unpin(cid); }
}
