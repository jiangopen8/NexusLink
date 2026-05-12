import { Command } from 'commander';
import { ACPModule, SkillComposer } from '@nexuslink/core-acp';
import { OutputFormatter } from '../output/formatter.js';
import { CLIError } from '../output/errors.js';

const composer = new SkillComposer('~/.nexuslink/acp-compositions.json');

export function acpCommands(program: Command, formatter: OutputFormatter): void {
  const acp = program.command('acp').description('Agent communication and skill composition');

  const compose = acp.command('compose').description('Skill composition orchestration');

  compose
    .command('validate <json>')
    .description('Validate a skill composition from a JSON string')
    .action(async (json: string) => {
      try {
        const composition = JSON.parse(json);
        const result = composer.validate(composition);
        formatter.json({
          valid: result.valid,
          errors: result.errors,
          warnings: result.warnings,
          executionOrder: result.executionOrder,
        });
        if (result.valid) formatter.success('Composition is valid');
      } catch (err) {
        throw new CLIError((err as Error).message, 'COMPOSE_VALIDATE_FAILED');
      }
    });

  compose
    .command('register <json>')
    .description('Register a skill composition from a JSON string')
    .action(async (json: string) => {
      try {
        const composition = JSON.parse(json);
        const result = composer.register(composition);
        if (!result.valid) {
          throw new CLIError(`Invalid composition: ${result.errors.join(', ')}`, 'INVALID');
        }
        formatter.success(`Composition registered: ${composition.id}`);
      } catch (err) {
        throw new CLIError((err as Error).message, 'COMPOSE_REGISTER_FAILED');
      }
    });

  compose
    .command('execute <compositionId>')
    .description('Execute a skill composition in dry-run mode')
    .action(async (compositionId: string) => {
      try {
        const result = await composer.execute(compositionId, async (skillId, params) => {
          formatter.info(`executing skill: ${skillId} params=${JSON.stringify(params)}`);
          return { skillId, status: 'dry-run' };
        });
        formatter.json({
          success: result.success,
          durationMs: result.durationMs,
          steps: Object.keys(result.stepResults).length,
        });
        if (result.success) formatter.success('Composition executed successfully');
      } catch (err) {
        throw new CLIError((err as Error).message, 'COMPOSE_EXECUTE_FAILED');
      }
    });

  compose
    .command('list')
    .description('List all registered compositions')
    .action(() => {
      const compositions = composer.list();
      if (compositions.length === 0) {
        formatter.success('No compositions registered');
        return;
      }
      formatter.table(
        ['ID', 'Name', 'Steps', 'Timeout'],
        compositions.map(c => [
          c.id.slice(0, 12) + '...',
          c.name,
          c.steps.length.toString(),
          c.timeout ? `${c.timeout}ms` : '-',
        ])
      );
    });

  acp
    .command('send <did> <message>')
    .description('Send ACP message to agent')
    .option('--from <did>', 'Sender DID')
    .action(async (did: string, message: string, options: { from?: string }) => {
      try {
        const acpModule = new ACPModule();
        const sent = await acpModule.send(did, message, options.from ?? process.env.AGENT_DID ?? 'did:nexus:local');
        formatter.json(sent);
      } catch (err) {
        throw new CLIError((err as Error).message, 'ACP_SEND_FAILED');
      }
    });

  acp
    .command('listen')
    .description('Listen for ACP messages')
    .option('--did <did>', 'Inbox DID')
    .option('--peek', 'Do not mark messages as delivered')
    .action(async (options: { did?: string; peek?: boolean }) => {
      try {
        const did = options.did ?? process.env.AGENT_DID ?? 'did:nexus:local';
        const acpModule = new ACPModule();
        const messages = await acpModule.listen(did, { markDelivered: !options.peek });
        if (messages.length === 0) {
          formatter.success('No messages');
          return;
        }
        formatter.table(
          ['ID', 'From', 'Body', 'Sent At'],
          messages.map(message => [message.id, message.from, message.body, message.sentAt])
        );
      } catch (err) {
        throw new CLIError((err as Error).message, 'ACP_LISTEN_FAILED');
      }
    });

  acp
    .command('ping <did>')
    .description('Ping agent via ACP')
    .action(async (did: string) => {
      try {
        const acpModule = new ACPModule();
        const result = await acpModule.ping(did);
        formatter.json({ did, ...result });
      } catch (err) {
        throw new CLIError((err as Error).message, 'ACP_PING_FAILED');
      }
    });
}
