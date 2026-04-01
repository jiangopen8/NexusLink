import type { SALBackend, SALOptions } from '../types.js';
import { PinataSAL } from './ipfs.js';
import { ZeroGSAL } from './zero-g.js';

export class SALModule {
  private backend: SALBackend;

  constructor(options: SALOptions) {
    if (options.backend === 'ipfs') {
      if (!options.pinataApiKey || !options.pinataSecret) {
        throw new Error('Pinata API credentials required for IPFS backend');
      }
      this.backend = new PinataSAL(options.pinataApiKey, options.pinataSecret);
    } else if (options.backend === '0g' || options.backend === 'zerog') {
      if (!options.zeroGApiKey) {
        throw new Error('0G API key required for 0G backend');
      }
      this.backend = new ZeroGSAL(
        options.zeroGApiKey,
        options.zeroGApiUrl
      );
    } else {
      throw new Error(`Unknown SAL backend: ${options.backend}`);
    }
  }

  async store(data: Uint8Array): Promise<string> { return this.backend.store(data); }
  async retrieve(cid: string): Promise<Uint8Array> { return this.backend.retrieve(cid); }
  async unpin(cid: string): Promise<void> { return this.backend.unpin(cid); }

  /**
   * Get current backend type
   */
  getBackendType(): string {
    if (this.backend instanceof PinataSAL) return 'ipfs';
    if (this.backend instanceof ZeroGSAL) return '0g';
    return 'unknown';
  }

  /**
   * Check if backend supports a specific feature
   */
  supportsFeature(feature: 'fast-retrieval' | 'large-files' | 'encryption'): boolean {
    const type = this.getBackendType();
    switch (feature) {
      case 'fast-retrieval':
        return type === '0g'; // 0G has faster retrieval
      case 'large-files':
        return true; // Both support large files
      case 'encryption':
        return type === 'ipfs'; // IPFS with Pinata has better encryption support
      default:
        return false;
    }
  }
}
