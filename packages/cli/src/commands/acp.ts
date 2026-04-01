import { Command } from 'commander';
import { OutputFormatter } from '../output/formatter.js';

export function acpCommands(_program: Command, _formatter: OutputFormatter): void {
  const acp = _program.command('acp').description('ACP messaging (Phase 2)');
  acp.command('send').action(() => { console.log('ACP messaging (Phase 2)'); });
  acp.command('listen').action(() => { console.log('ACP listener (Phase 2)'); });
  acp.command('ping').action(() => { console.log('ACP ping (Phase 2)'); });
}
