import { describe, it, expect } from 'vitest';
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
});
