import { Command } from 'commander';
import { OutputFormatter } from '../output/formatter.js';

export function spaceCommands(_program: Command, _formatter: OutputFormatter): void {
  const space = _program.command('space').description('Collaboration spaces (Phase 2)');
  space.command('list').action(() => { console.log('Collaboration spaces (Phase 2)'); });
}
