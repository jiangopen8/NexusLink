import { Command } from 'commander';
import { NSSModule } from '@nexuslink/core-nss';
import { ConfigStore } from '@nexuslink/core-config';
import { OutputFormatter } from '../output/formatter.js';
import { CLIError } from '../output/errors.js';
import { readFileSync } from 'fs';
import { SkillComposer } from '@nexuslink/core-acp';

export function nssCommands(program: Command, formatter: OutputFormatter): void {
  const nss = program.command('nss').description('NSS skill registry management');
  const composer = new SkillComposer('~/.nexuslink/nss-compositions.json');

  nss
    .command('publish <file>')
    .description('Publish an NSS skill descriptor')
    .action(async (file: string) => {
      try {
        const raw = readFileSync(file, 'utf-8');
        const descriptor = file.endsWith('.json') ? JSON.parse(raw) : JSON.parse(raw);
        const config = new ConfigStore();
        const nssModule = new NSSModule(config);
        const result = await nssModule.publish(descriptor);
        formatter.table(['Field', 'Value'], [['Skill ID', result.skillId], ['Tx Hash', result.txHash]]);
      } catch (err) {
        throw new CLIError((err as Error).message, 'NSS_PUBLISH_FAILED');
      }
    });

  nss
    .command('compose <file>')
    .description('Register and execute a skill composition JSON file')
    .action(async (file: string) => {
      try {
        const composition = JSON.parse(readFileSync(file, 'utf-8'));
        const validation = composer.register(composition);
        if (!validation.valid) throw new CLIError(validation.errors.join(', '), 'NSS_COMPOSE_INVALID');
        const result = await composer.execute(composition.id, async skillId => ({ skillId, status: 'dry-run' }));
        formatter.json(result);
      } catch (err) {
        throw new CLIError((err as Error).message, 'NSS_COMPOSE_FAILED');
      }
    });

  nss
    .command('list')
    .description('List locally published skills')
    .option('--publisher <did>', 'Filter by publisher DID')
    .action(async (opts) => {
      try {
        const skills = new NSSModule(new ConfigStore()).list()
          .filter(skill => !opts.publisher || skill.publisherDid === opts.publisher);
        if (skills.length === 0) {
          formatter.success('No skills found');
          return;
        }
        formatter.table(['Skill ID', 'Name', 'Publisher', 'Price'], skills.map(skill => [
          skill.skillId,
          skill.name,
          skill.publisherDid,
          skill.priceUsdc ?? 'free',
        ]));
      } catch (err) {
        throw new CLIError((err as Error).message, 'NSS_LIST_FAILED');
      }
    });

  nss
    .command('discover <intent>')
    .option('--min-pose <score>', 'Minimum PoSE score', '0')
    .option('--limit <n>', 'Maximum results', '10')
    .description('Discover skills by intent')
    .action(async (intent: string, opts: any) => {
      try {
        const config = new ConfigStore();
        const nssModule = new NSSModule(config);
        const skills = await nssModule.discover(intent, { limit: parseInt(opts.limit) });
        if (skills.length === 0) { console.log('No skills found for: ' + intent); return; }
        formatter.table(['Skill ID', 'Name', 'Publisher', 'Price'],
          skills.map((s: any) => [s.skillId, s.name, s.publisherDid, s.priceUsdc ?? 'free']));
      } catch (err) {
        throw new CLIError((err as Error).message, 'NSS_DISCOVER_FAILED');
      }
    });

  nss
    .command('invoke <skillId>')
    .option('--input <json>', 'Input as JSON string')
    .description('Invoke a skill')
    .action(async (skillId: string, opts: any) => {
      try {
        const config = new ConfigStore();
        const nssModule = new NSSModule(config);
        const input = opts.input ? JSON.parse(opts.input) : {};
        const result = await nssModule.invoke(skillId, input);
        formatter.json(result);
      } catch (err) {
        throw new CLIError((err as Error).message, 'NSS_INVOKE_FAILED');
      }
    });

  nss
    .command('validate <file>')
    .description('Validate an NSS skill descriptor')
    .action(async (file: string) => {
      const raw = readFileSync(file, 'utf-8');
      const descriptor = file.endsWith('.json') ? JSON.parse(raw) : JSON.parse(raw);
      const config = new ConfigStore();
      const nssModule = new NSSModule(config);
      const result = nssModule.validate(descriptor);
      if (result.valid) {
        formatter.success('NSS descriptor is valid');
      } else {
        formatter.error('Validation errors: ' + result.errors.join(', '));
        process.exit(1);
      }
    });
}
