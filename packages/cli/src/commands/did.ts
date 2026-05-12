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
    .command('update <did>')
    .description('Update a DID document')
    .option('--skills <skills>', 'Comma-separated skill list')
    .option('--languages <langs>', 'Comma-separated language list')
    .action(async (did: string, opts) => {
      try {
        const identity = new IdentityModule(new ConfigStore());
        const doc = await identity.update(did, {
          skills: opts.skills?.split(',').map((s: string) => s.trim()),
          languages: opts.languages?.split(',').map((s: string) => s.trim()),
        });
        formatter.json(doc);
      } catch (err) {
        throw new CLIError((err as Error).message, 'DID_UPDATE_FAILED');
      }
    });

  did
    .command('bind-owner <did> <ownerDid>')
    .description('Bind an owner DID to an agent DID')
    .action(async (did: string, ownerDid: string) => {
      try {
        const doc = await new IdentityModule(new ConfigStore()).update(did, { owner: ownerDid } as any);
        formatter.json(doc);
      } catch (err) {
        throw new CLIError((err as Error).message, 'DID_BIND_OWNER_FAILED');
      }
    });

  did
    .command('set-boundary <did>')
    .description('Set an intent boundary')
    .option('--domains <domains>', 'Comma-separated allowed domains', '')
    .option('--max-value <usdc>', 'Maximum value in USDC', '0')
    .option('--self-signed', 'Mark boundary as self signed', false)
    .action(async (did: string, opts) => {
      try {
        const doc = await new IdentityModule(new ConfigStore()).update(did, {
          intentBoundary: {
            allowedDomains: opts.domains ? opts.domains.split(',').map((item: string) => item.trim()).filter(Boolean) : [],
            maxValueUsdc: parseFloat(opts.maxValue ?? '0'),
            selfSigned: Boolean(opts.selfSigned),
          },
        } as any);
        formatter.json(doc);
      } catch (err) {
        throw new CLIError((err as Error).message, 'DID_SET_BOUNDARY_FAILED');
      }
    });

  did
    .command('export <did>')
    .description('Export a DID document')
    .action(async (did: string) => {
      try {
        const doc = await new IdentityModule(new ConfigStore()).resolve(did);
        formatter.json(doc);
      } catch (err) {
        throw new CLIError((err as Error).message, 'DID_EXPORT_FAILED');
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
