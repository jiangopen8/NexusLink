import { readFileSync } from 'node:fs';
import { Command } from 'commander';
import { ConfigStore } from '@nexuslink/core-config';
import { MemoryModule } from '@nexuslink/core-memory';
import { SALModule } from '@nexuslink/core-sal';
import { OutputFormatter } from '../output/formatter.js';
import { CLIError } from '../output/errors.js';

function createMemory(config = new ConfigStore()): MemoryModule {
  const sal = new SALModule(config.getStorageConfig());
  const ownerDid = config.getDefaultDid() ?? process.env.AGENT_DID ?? 'did:nexus:local';
  const key = Buffer.from(process.env.NEXUSLINK_MEMORY_KEY ?? 'nexuslink-local-memory-key');
  return new MemoryModule(ownerDid, key, sal);
}

export function memoryCommands(program: Command, formatter: OutputFormatter): void {
  const memory = program.command('memory').description('Memory storage management');

  memory
    .command('store <data>')
    .description('Store encrypted memory data')
    .option('--tags <tags>', 'Comma-separated tags')
    .action(async (data: string, options: { tags?: string }) => {
      try {
        const tags = options.tags?.split(',').map(tag => tag.trim()).filter(Boolean) ?? [];
        const shard = await createMemory().store(Buffer.from(data, 'utf-8'), tags);
        formatter.json(shard);
      } catch (err) {
        throw new CLIError((err as Error).message, 'MEMORY_STORE_FAILED');
      }
    });

  memory
    .command('retrieve <shardId>')
    .description('Retrieve memory by shard id or encrypted cid')
    .action(async (shardId: string) => {
      try {
        const data = await createMemory().retrieveById(shardId);
        formatter.info(Buffer.from(data).toString('utf-8'));
      } catch (err) {
        throw new CLIError((err as Error).message, 'MEMORY_RETRIEVE_FAILED');
      }
    });

  memory
    .command('import <file>')
    .description('Import file content as encrypted memory')
    .option('--tags <tags>', 'Comma-separated tags')
    .action(async (file: string, options: { tags?: string }) => {
      try {
        const tags = options.tags?.split(',').map(tag => tag.trim()).filter(Boolean) ?? [];
        const shard = await createMemory().store(readFileSync(file), tags);
        formatter.json(shard);
      } catch (err) {
        throw new CLIError((err as Error).message, 'MEMORY_IMPORT_FAILED');
      }
    });

  memory
    .command('sync')
    .description('Summarize local memory index for backend migration')
    .action(async () => {
      try {
        formatter.json(createMemory().sync());
      } catch (err) {
        throw new CLIError((err as Error).message, 'MEMORY_SYNC_FAILED');
      }
    });

  memory
    .command('delete <shardId>')
    .description('Delete stored memory')
    .action(async (shardId: string) => {
      try {
        await createMemory().delete(shardId);
        formatter.success(`Memory deleted: ${shardId}`);
      } catch (err) {
        throw new CLIError((err as Error).message, 'MEMORY_DELETE_FAILED');
      }
    });

  memory
    .command('status')
    .description('Show current storage backend status')
    .action(async () => {
      try {
        const config = new ConfigStore();
        const storageConfig = config.getStorageConfig();
        const salModule = new SALModule(storageConfig);

        formatter.table(
          ['Property', 'Value'],
          [
            ['Backend', storageConfig.backend],
            ['Fast Retrieval', salModule.supportsFeature('fast-retrieval') ? 'yes' : 'no'],
            ['Large Files', salModule.supportsFeature('large-files') ? 'yes' : 'no'],
            ['Encryption', salModule.supportsFeature('encryption') ? 'yes' : 'no'],
            ['Endpoint', storageConfig.backend === '0g' ? storageConfig.zeroGApiUrl ?? '' : storageConfig.localPath ?? 'Pinata API'],
          ]
        );
      } catch (err) {
        throw new CLIError((err as Error).message, 'MEMORY_STATUS_FAILED');
      }
    });

  memory
    .command('switch-backend <backend>')
    .description('Switch storage backend (local|ipfs|0g)')
    .option('--api-key <key>', 'API key for the new backend')
    .option('--api-url <url>', 'API URL for 0G')
    .option('--local-path <path>', 'Local storage path')
    .action(async (backend: string, options: { apiKey?: string; apiUrl?: string; localPath?: string }) => {
      try {
        if (backend !== 'local' && backend !== 'ipfs' && backend !== '0g') {
          throw new CLIError('Backend must be "local", "ipfs", or "0g"', 'INVALID_BACKEND');
        }

        const config = new ConfigStore();
        const credentials: Record<string, string> = {};

        if (backend === 'local' && options.localPath) credentials.localPath = options.localPath;
        if (backend === 'ipfs') {
          if (options.apiKey) credentials.pinataApiKey = options.apiKey;
          if (process.env.PINATA_API_KEY && !credentials.pinataApiKey) credentials.pinataApiKey = process.env.PINATA_API_KEY;
          if (process.env.PINATA_SECRET) credentials.pinataSecret = process.env.PINATA_SECRET;
        }
        if (backend === '0g') {
          if (options.apiKey) credentials.zeroGApiKey = options.apiKey;
          if (options.apiUrl) credentials.zeroGApiUrl = options.apiUrl;
          if (process.env.ZERO_G_API_KEY && !credentials.zeroGApiKey) credentials.zeroGApiKey = process.env.ZERO_G_API_KEY;
        }

        config.setStorageBackend(backend, credentials);
        formatter.success(`Switched to ${backend.toUpperCase()} backend`);
      } catch (err) {
        throw new CLIError((err as Error).message, 'BACKEND_SWITCH_FAILED');
      }
    });
}
