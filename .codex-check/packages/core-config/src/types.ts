export type Network = 'testnet' | 'mainnet' | 'local';
export type OutputFormat = 'table' | 'json' | 'yaml' | 'quiet';
export type StorageBackend = 'ipfs' | '0g';

export interface StorageConfig {
  backend: StorageBackend;
  // IPFS/Pinata credentials
  pinataApiKey?: string;
  pinataSecret?: string;
  // 0G credentials
  zeroGApiKey?: string;
  zeroGApiUrl?: string;
}

export interface WalletConfig {
  keystore: string;
  defaultAccount: string;
}

export interface OutputConfig {
  format: OutputFormat;
  color: boolean;
}

export interface NexusConfig {
  network: Network;
  defaultDid?: string;
  storage: StorageConfig;
  wallet: WalletConfig;
  output: OutputConfig;
}

export const DEFAULT_CONFIG_PATH = '~/.nexuslink/config.yaml';
export const DEFAULT_CONFIG: NexusConfig = {
  network: 'testnet',
  storage: {
    backend: 'ipfs',
    pinataApiKey: '',
    pinataSecret: '',
    zeroGApiKey: '',
    zeroGApiUrl: 'https://api.0g.storage',
  },
  wallet: {
    keystore: '~/.nexuslink/keystore',
    defaultAccount: '',
  },
  output: {
    format: 'table',
    color: true,
  },
};
