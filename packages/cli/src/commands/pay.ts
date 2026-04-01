import { Command } from 'commander';
import { SettlementModule } from '@nexuslink/core-settlement';
import { ConfigStore } from '@nexuslink/core-config';
import { OutputFormatter } from '../output/formatter.js';
import { CLIError } from '../output/errors.js';

export function payCommands(program: Command, formatter: OutputFormatter): void {
  const pay = program.command('pay').description('USDC payment and settlement');

  pay.command('send <to> <amount>')
    .option('--contract <id>', 'Contract ID')
    .action(async (to: string, amount: string, opts: any) => {
      try {
        const config = new ConfigStore();
        const settlement = new SettlementModule(config);
        const result = await settlement.send(to, amount, opts.contract);
        formatter.success(`Payment sent. Tx: ${result.txHash}`);
      } catch (err) { throw new CLIError((err as Error).message, 'PAY_FAILED'); }
    });

  pay.command('balance [account]').action(async (account?: string) => {
    try {
      const config = new ConfigStore();
      const settlement = new SettlementModule(config);
      const bal = await settlement.balance(account ?? '0x0000000000000000000000000000000000000000');
      formatter.json({ account: account ?? 'self', balance: bal });
    } catch (err) { throw new CLIError((err as Error).message, 'BALANCE_FAILED'); }
  });
}
