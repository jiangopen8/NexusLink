import { Command } from 'commander';
import { IdentityModule } from '@nexuslink/core-identity';
import { ConfigStore } from '@nexuslink/core-config';
import { OutputFormatter } from '../output/formatter.js';
import { CLIError } from '../output/errors.js';

export function didCommands(program: Command, formatter: OutputFormatter): void {
  const did = program.command('did').description('W3C DID identity management');

  did
    .command('register')
    .option('--type <type>', 'Agent type: assistant, tool, human', 'assistant')
    .option('--skills <skills>', 'Comma-separated skill list')
    .option('--languages <langs>', 'Comma-separated language list')
    .option('--owner <did>', 'Owner DID (optional)')
    .action(async (opts) => {
      try {
        const config = new ConfigStore();
        const identity = new IdentityModule(config);
        const typeMap: Record<string, string> = { assistant: 'AssistantAgent', tool: 'ToolAgent', human: 'Human' };
        const options: any = {
          type: typeMap[opts.type] ?? 'AssistantAgent',
          skills: opts.skills?.split(',').map((s: string) => s.trim()),
          languages: opts.languages?.split(',').map((s: string) => s.trim()),
          ownerDid: opts.owner,
        };
        const doc = await identity.register(options);
        formatter.table(
          ['Field', 'Value'],
          [['DID', doc.id], ['Type', doc.type], ['Owner', doc.owner ?? ''], ['Skills', doc.skills.join(', ')]],
        );
      } catch (err) {
        throw new CLIError((err as Error).message, 'DID_REGISTER_FAILED');
      }
    });

  did
    .command('resolve <did>')
    .description('Resolve a DID document')
    .action(async (did: string) => {
      try {
        const config = new ConfigStore();
        const identity = new IdentityModule(config);
        const doc = await identity.resolve(did);
        formatter.json(doc);
      } catch (err) {
        throw new CLIError((err as Error).message, 'DID_RESOLVE_FAILED');
      }
    });

  did
    .command('deactivate <did>')
    .description('Deactivate a DID')
    .action(async (did: string) => {
      try {
        const config = new ConfigStore();
        const identity = new IdentityModule(config);
        await identity.deactivate(did);
        formatter.success(`DID deactivated: ${did}`);
      } catch (err) {
        throw new CLIError((err as Error).message, 'DID_DEACTIVATE_FAILED');
      }
    });
}
