#!/usr/bin/env node
import { Command } from 'commander';
import { ConfigStore } from '@nexuslink/core-config';
import { OutputFormatter } from './output/formatter.js';
import { handleError } from './output/errors.js';
import { configCommands } from './commands/config.js';
import { didCommands } from './commands/did.js';
import { nssCommands } from './commands/nss.js';
import { poseCommands } from './commands/pose.js';
import { credentialCommands } from './commands/credential.js';
import { contractCommands } from './commands/contract.js';
import { payCommands } from './commands/pay.js';
import { spaceCommands } from './commands/space.js';
import { daoCommands } from './commands/dao.js';
import { acpCommands } from './commands/acp.js';
import { memoryCommands } from './commands/memory.js';

const program = new Command();

const store = new ConfigStore();
const formatter = new OutputFormatter(store.get().output?.format ?? 'table', true);

program
  .name('nexus')
  .description('NexusLink CLI — AI Agent identity, skills, and value settlement protocol')
  .version('0.0.1')
  .option('-f, --format <format>', 'Output format: table|json|yaml|quiet', 'table')
  .option('--no-color', 'Disable color output');

program.hook('preAction', () => {
  const opts = program.opts() as any;
  const outputFormat = opts.format ?? store.get().output?.format ?? 'table';
  const useColor = opts.color !== false;
  formatter.configure(outputFormat as any, useColor);
});

configCommands(program, formatter);
didCommands(program, formatter);
nssCommands(program, formatter);
poseCommands(program, formatter);
credentialCommands(program, formatter);
contractCommands(program, formatter);
payCommands(program, formatter);
spaceCommands(program, formatter);
daoCommands(program, formatter);
acpCommands(program, formatter);
memoryCommands(program, formatter);

try {
  program.parseAsync(process.argv);
} catch (err) {
  handleError(err, Boolean((program.opts() as any).verbose));
}
