import { Command } from 'commander';
import { SkillComposer } from '@nexuslink/core-acp';
import { OutputFormatter } from '../output/formatter.js';
import { CLIError } from '../output/errors.js';

const composer = new SkillComposer();

export function acpCommands(program: Command, formatter: OutputFormatter): void {
  const acp = program.command('acp').description('Agent Communication & Skill Composition');

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
        if (result.valid) {
          formatter.success('Composition is valid');
        }
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
    .description('Execute a skill composition (dry-run mode)')
    .action(async (compositionId: string) => {
      try {
        // Dry-run executor: logs each skill call
        const result = await composer.execute(compositionId, async (skillId, params) => {
          formatter.info(`  → executing skill: ${skillId} params=${JSON.stringify(params)}`);
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
          c.timeout ? `${c.timeout}ms` : '∞',
        ])
      );
    });

  // ACP messaging (libp2p — Phase 3)
  acp.command('send <did> <message>').description('Send ACP message to agent').action(() => {
    formatter.info('ACP direct messaging requires libp2p (Phase 3)');
  });
  acp.command('listen').description('Listen for ACP messages').action(() => {
    formatter.info('ACP listener requires libp2p (Phase 3)');
  });
  acp.command('ping <did>').description('Ping agent via ACP').action(() => {
    formatter.info('ACP ping requires libp2p (Phase 3)');
  });
}
