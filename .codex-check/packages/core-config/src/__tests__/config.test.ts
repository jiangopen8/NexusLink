import { describe, it, expect, beforeEach } from 'vitest';
import { unlinkSync, mkdirSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';
import { ConfigStore } from '../impl/config.js';

const TEST_DIR = join(homedir(), '.nexuslink-test-config');
const TEST_CONFIG = join(TEST_DIR, 'config.yaml');

beforeEach(() => {
  try { mkdirSync(TEST_DIR, { recursive: true }); } catch { /* ok */ }
  try { unlinkSync(TEST_CONFIG); } catch { /* ok */ }
});

describe('ConfigStore', () => {
  it('loads default config when no file exists', () => {
    const store = new ConfigStore(TEST_CONFIG);
    expect(store.get().network).toBe('testnet');
    expect(store.get().storage.backend).toBe('ipfs');
    expect(store.get().output.format).toBe('table');
  });

  it('saves and reloads config correctly', () => {
    const store = new ConfigStore(TEST_CONFIG);
    store.set({ network: 'mainnet', defaultDid: 'did:nexus:0x123' });
    expect(store.getNetwork()).toBe('mainnet');
    expect(store.getDefaultDid()).toBe('did:nexus:0x123');
    const reloaded = new ConfigStore(TEST_CONFIG);
    expect(reloaded.getNetwork()).toBe('mainnet');
  });

  it('setDefaultDid updates the did', () => {
    const store = new ConfigStore(TEST_CONFIG);
    store.setDefaultDid('did:nexus:0xABC');
    expect(store.getDefaultDid()).toBe('did:nexus:0xABC');
  });

  it('getRpcUrl returns correct URL for each network', () => {
    const store = new ConfigStore(TEST_CONFIG);
    store.set({ network: 'testnet' });
    expect(store.getRpcUrl()).toMatch(/sepolia/);
    store.set({ network: 'mainnet' });
    expect(store.getRpcUrl()).toMatch(/arb1/);
    store.set({ network: 'local' });
    expect(store.getRpcUrl()).toBe('http://127.0.0.1:8545');
  });
});
