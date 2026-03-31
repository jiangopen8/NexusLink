import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { homedir } from 'os';
import { join, resolve } from 'path';
import yaml from 'yaml';
import type { NexusConfig } from '../types.js';
import { DEFAULT_CONFIG, DEFAULT_CONFIG_PATH } from '../types.js';

function resolvePath(p: string): string {
  return p.replace('~', homedir());
}

function loadYaml(path: string): Partial<NexusConfig> {
  try {
    const raw = readFileSync(resolvePath(path), 'utf-8');
    return yaml.parse(raw) ?? {};
  } catch {
    return {};
  }
}

function resolvedDir(filePath: string): string {
  const resolved = resolvePath(filePath);
  return resolved.substring(0, resolved.lastIndexOf('/'));
}

function saveYaml(path: string, config: NexusConfig): void {
  const dir = resolvedDir(path);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(resolvePath(path), yaml.stringify(config), 'utf-8');
}

export class ConfigStore {
  private config: NexusConfig;
  private path: string;

  constructor(path?: string) {
    this.path = resolvePath(path ?? DEFAULT_CONFIG_PATH);
    const saved = loadYaml(this.path);
    this.config = { ...DEFAULT_CONFIG, ...saved };
  }

  get(): Readonly<NexusConfig> {
    return this.config;
  }

  set(partial: Partial<NexusConfig>): void {
    this.config = { ...this.config, ...partial };
    saveYaml(this.path, this.config);
  }

  getNetwork(): string {
    return this.config.network;
  }

  getDefaultDid(): string | undefined {
    return this.config.defaultDid;
  }

  setDefaultDid(did: string): void {
    this.set({ defaultDid: did });
  }

  getRpcUrl(): string {
    switch (this.config.network) {
      case 'testnet': return process.env.ARBITRUM_SEPOLIA_RPC ?? 'https://sepolia-rollup.arbitrum.io/rpc';
      case 'mainnet': return process.env.ARBITRUM_ONE_RPC ?? 'https://arb1.arbitrum.io/rpc';
      case 'local': return 'http://127.0.0.1:8545';
    }
  }

  static init(path?: string): ConfigStore {
    const store = new ConfigStore(path);
    saveYaml(resolvePath(path ?? DEFAULT_CONFIG_PATH), store.get());
    return store;
  }
}
