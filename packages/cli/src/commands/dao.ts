import { Command } from 'commander';
import { OutputFormatter } from '../output/formatter.js';

export function daoCommands(_program: Command, _formatter: OutputFormatter): void {
  const dao = _program.command('dao').description('DAO management (Phase 2)');
  dao.command('create').action(() => { console.log('DAO creation (Phase 2)'); });
}
