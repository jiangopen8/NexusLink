import { Command } from 'commander';
import { ConfigStore } from '@nexuslink/core-config';
import { OutputFormatter } from '../output/formatter.js';

export function configCommands(program: Command, formatter: OutputFormatter): void {
  const configCmd = program.command('config').description('Manage NexusLink configuration');

  configCmd
    .command('init')
    .description('Initialize NexusLink configuration at ~/.nexuslink/config.yaml')
    .action(() => {
      ConfigStore.init();
      formatter.success('Configuration initialized at ~/.nexuslink/config.yaml');
    });

  configCmd
    .command('get <key>')
    .description('Get a configuration value')
    .action((key: string) => {
      const store = new ConfigStore();
      const config = store.get();
      const keys = key.split('.');
      let value: unknown = config;
      for (const k of keys) { value = (value as any)?.[k]; }
      if (value === undefined) {
        console.error(`Key not found: ${key}`);
        process.exit(1);
      }
      formatter.json({ [key]: value });
    });

  configCmd
    .command('set <key> <value>')
    .description('Set a configuration value')
    .action((key: string, value: string) => {
      const store = new ConfigStore();
      const keys = key.split('.');
      const partial: any = {};
      let cur = partial;
      for (let i = 0; i < keys.length - 1; i++) { cur = cur[keys[i]] = {}; }
      cur[keys[keys.length - 1]] = value;
      store.set(partial);
      formatter.success(`Set ${key} = ${value}`);
    });

  configCmd
    .command('network <name>')
    .description('Switch network (testnet, mainnet, local)')
    .action((name: string) => {
      if (!['testnet', 'mainnet', 'local'].includes(name)) {
        console.error('Network must be one of: testnet, mainnet, local');
        process.exit(1);
      }
      const store = new ConfigStore();
      store.set({ network: name as any });
      formatter.success(`Network set to ${name}`);
    });
}
