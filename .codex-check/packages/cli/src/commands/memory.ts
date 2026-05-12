import { Command } from 'commander';
import { ConfigStore } from '@nexuslink/core-config';
import { SALModule } from '@nexuslink/core-sal';
import { OutputFormatter } from '../output/formatter.js';
import { CLIError } from '../output/errors.js';

export function memoryCommands(program: Command, formatter: OutputFormatter): void {
  const memory = program.command('memory').description('Memory storage management');

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
            ['Fast Retrieval', salModule.supportsFeature('fast-retrieval') ? '✓' : '✗'],
            ['Large Files', salModule.supportsFeature('large-files') ? '✓' : '✗'],
            ['Encryption', salModule.supportsFeature('encryption') ? '✓' : '✗'],
            ['API URL', storageConfig.backend === '0g' ? storageConfig.zeroGApiUrl : 'Pinata API'],
          ]
        );
      } catch (err) {
        throw new CLIError((err as Error).message, 'MEMORY_STATUS_FAILED');
      }
    });

  memory
    .command('switch-backend <backend>')
    .description('Switch storage backend (ipfs|0g)')
    .option('--api-key <key>', 'API key for the new backend')
    .option('--api-url <url>', 'API URL (for 0G)')
    .action(async (backend: string, options) => {
      try {
        if (backend !== 'ipfs' && backend !== '0g') {
          throw new CLIError('Backend must be "ipfs" or "0g"', 'INVALID_BACKEND');
        }

        const config = new ConfigStore();
        const credentials: Record<string, string> = {};

        if (backend === 'ipfs') {
          if (options.apiKey) credentials.pinataApiKey = options.apiKey;
          if (process.env.PINATA_API_KEY && !credentials.pinataApiKey) {
            credentials.pinataApiKey = process.env.PINATA_API_KEY;
          }
          if (process.env.PINATA_SECRET && !credentials.pinataSecret) {
            credentials.pinataSecret = process.env.PINATA_SECRET;
          }
        } else if (backend === '0g') {
          if (options.apiKey) credentials.zeroGApiKey = options.apiKey;
          if (options.apiUrl) credentials.zeroGApiUrl = options.apiUrl;
          if (process.env.ZERO_G_API_KEY && !credentials.zeroGApiKey) {
            credentials.zeroGApiKey = process.env.ZERO_G_API_KEY;
          }
        }

        config.setStorageBackend(backend as 'ipfs' | '0g', credentials);

        formatter.success(`Switched to ${backend.toUpperCase()} backend`);
        console.log('Note: Use "memory sync" to migrate existing data');
      } catch (err) {
        throw new CLIError((err as Error).message, 'BACKEND_SWITCH_FAILED');
      }
    });

  memory
    .command('sync')
    .description('Sync data between backends (Phase 2: IPFS ↔ 0G migration)')
    .option('--from <backend>', 'Source backend')
    .option('--to <backend>', 'Target backend')
    .option('--dry-run', 'Show what would be copied without actually copying')
    .action(async (options) => {
      try {
        const config = new ConfigStore();

        formatter.json({
          message: 'Memory sync functionality (Phase 2)',
          status: 'Planned',
          features: [
            'IPFS → 0G migration',
            '0G → IPFS migration',
            'Batch transfer optimization',
            'Progress tracking',
            'Data integrity verification',
          ],
          note: 'This will enable seamless backend switching with data migration',
        });
      } catch (err) {
        throw new CLIError((err as Error).message, 'MEMORY_SYNC_FAILED');
      }
    });
}
