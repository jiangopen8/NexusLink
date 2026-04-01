import { Command } from 'commander';
import { ACPModule } from '@nexuslink/core-acp';
import { OutputFormatter } from '../output/formatter.js';
import { CLIError } from '../output/errors.js';

export function contractCommands(program: Command, formatter: OutputFormatter): void {
  const contract = program.command('contract').description('ERC X402 cooperation contracts');

  contract.command('propose <to> <template>')
    .option('--terms <json>', 'Contract terms as JSON')
    .action(async (to: string, template: string, opts: any) => {
      try {
        const acp = new ACPModule();
        const terms = opts.terms ? JSON.parse(opts.terms) : {};
        const proposal = await acp.propose(to, template as any, terms);
        formatter.json(proposal);
      } catch (err) { throw new CLIError((err as Error).message, 'CONTRACT_PROPOSE_FAILED'); }
    });

  contract.command('sign <contractId>').action(async (contractId: string) => {
    try {
      const acp = new ACPModule();
      formatter.json(await acp.sign(contractId));
    } catch (err) { throw new CLIError((err as Error).message, 'CONTRACT_SIGN_FAILED'); }
  });

  contract.command('execute <contractId>').action(async (contractId: string) => {
    try {
      const acp = new ACPModule();
      formatter.json(await acp.execute(contractId));
    } catch (err) { throw new CLIError((err as Error).message, 'CONTRACT_EXECUTE_FAILED'); }
  });

  contract.command('status <contractId>').action(async (contractId: string) => {
    const acp = new ACPModule();
    const result = await acp.status(contractId);
    if (!result) { console.error('Contract not found'); process.exit(1); }
    formatter.json(result);
  });
}
