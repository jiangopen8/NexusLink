import { Command } from 'commander';
import { SettlementModule } from '@nexuslink/core-settlement';
import { ConfigStore } from '@nexuslink/core-config';
import { OutputFormatter } from '../output/formatter.js';
import { CLIError } from '../output/errors.js';

export function payCommands(program: Command, formatter: OutputFormatter): void {
  const pay = program.command('pay').description('Multi-currency payment and settlement');

  // Phase 1: Basic USDC payments
  pay.command('send <to> <amount>')
    .description('Send USDC payment')
    .option('--contract <id>', 'Contract ID')
    .option('--currency <curr>', 'Currency: USDC|CNY', 'USDC')
    .action(async (to: string, amount: string, opts: any) => {
      try {
        const config = new ConfigStore();
        const settlement = new SettlementModule(config);
        const result = await settlement.sendMultiCurrency(to, amount, opts.currency, opts.contract);
        if (result.txHash) {
          formatter.success(`Payment sent. Tx: ${result.txHash}`);
        } else if (result.reference) {
          formatter.success(`e-CNY payment initiated. Ref: ${result.reference}`);
        }
      } catch (err) { throw new CLIError((err as Error).message, 'PAY_FAILED'); }
    });

  pay.command('balance [account]')
    .description('Check balance')
    .option('--currency <curr>', 'Currency: USDC|CNY', 'USDC')
    .action(async (account?: string, opts?: any) => {
      try {
        const config = new ConfigStore();
        const settlement = new SettlementModule(config);
        const addr = account ?? '0x0000000000000000000000000000000000000000';
        const currency = opts?.currency ?? 'USDC';
        const bal = await settlement.getBalance(currency as 'USDC' | 'CNY', account);
        formatter.json({ account: addr, currency, balance: bal });
      } catch (err) { throw new CLIError((err as Error).message, 'BALANCE_FAILED'); }
    });

  // Phase 2: Exchange rate
  pay.command('rate').description('Get USDC/CNY exchange rate').action(async () => {
    try {
      const config = new ConfigStore();
      const settlement = new SettlementModule(config);
      const rate = await settlement.getExchangeRate();
      formatter.table(
        ['Pair', 'Rate'],
        [
          ['1 USDC → CNY', rate.usdToCny.toFixed(4)],
          ['1 CNY → USDC', rate.cnyToUsd.toFixed(4)],
        ]
      );
    } catch (err) { throw new CLIError((err as Error).message, 'RATE_FAILED'); }
  });

  // Phase 2: Nanopayments
  const nano = pay.command('nano').description('Nanopayment channels for microtransactions');

  nano.command('create <receiver> <deposit>')
    .description('Create nanopayment channel')
    .option('--duration <hours>', 'Channel duration in hours', '24')
    .action(async (receiver: string, deposit: string, opts: any) => {
      try {
        const config = new ConfigStore();
        const settlement = new SettlementModule(config);
        const channel = await settlement.createNanopaymentChannel(
          receiver,
          deposit,
          parseInt(opts.duration)
        );
        formatter.table(
          ['Field', 'Value'],
          [
            ['Channel ID', channel.channelId],
            ['Sender', channel.sender],
            ['Receiver', channel.receiver],
            ['Deposit', `${channel.totalDeposit} USDC`],
            ['Expires', channel.expiresAt],
          ]
        );
      } catch (err) { throw new CLIError((err as Error).message, 'NANO_CREATE_FAILED'); }
    });

  nano.command('sign <channelId> <amount> <sequence>')
    .description('Sign nanopayment transfer')
    .action(async (channelId: string, amount: string, sequence: string) => {
      try {
        const config = new ConfigStore();
        const settlement = new SettlementModule(config);
        const transfer = await settlement.signNanopayment(channelId, amount, parseInt(sequence));
        formatter.json({
          channelId: transfer.channelId,
          amount: transfer.amount,
          sequence: transfer.sequence,
          signature: transfer.signature.slice(0, 20) + '...',
        });
        formatter.success('Transfer signed successfully');
      } catch (err) { throw new CLIError((err as Error).message, 'NANO_SIGN_FAILED'); }
    });

  nano.command('receive')
    .description('Receive and validate nanopayment transfer (JSON via stdin)')
    .action(async () => {
      try {
        // In production: read transfer JSON from stdin or file
        formatter.info('Usage: echo \'{"channelId":"...","amount":"0.01","sequence":1,"signature":"0x..."}\' | nexuslink pay nano receive');
        throw new CLIError('Implement stdin JSON reader', 'NOT_IMPLEMENTED');
      } catch (err) { throw new CLIError((err as Error).message, 'NANO_RECEIVE_FAILED'); }
    });

  nano.command('close <channelId>')
    .description('Close nanopayment channel and withdraw')
    .action(async (channelId: string) => {
      try {
        const config = new ConfigStore();
        const settlement = new SettlementModule(config);
        const result = await settlement.closeNanopaymentChannel(channelId);
        formatter.success(`Channel closed. Withdrawn: ${result.withdrawn}`);
        if (result.txHash) formatter.info(`Tx: ${result.txHash}`);
      } catch (err) { throw new CLIError((err as Error).message, 'NANO_CLOSE_FAILED'); }
    });

  nano.command('list [address]')
    .description('List nanopayment channels')
    .action(async (address?: string) => {
      try {
        const config = new ConfigStore();
        const settlement = new SettlementModule(config);
        const channels = settlement.listNanopaymentChannels(address || '');
        if (channels.length === 0) {
          formatter.success('No nanopayment channels found');
          return;
        }
        formatter.table(
          ['Channel ID', 'Sender', 'Receiver', 'Deposit', 'Expires'],
          channels.map(ch => [
            ch.channelId.slice(0, 16) + '...',
            ch.sender.slice(0, 10) + '...',
            ch.receiver.slice(0, 10) + '...',
            `${ch.totalDeposit} USDC`,
            ch.expiresAt.slice(0, 10),
          ])
        );
      } catch (err) { throw new CLIError((err as Error).message, 'NANO_LIST_FAILED'); }
    });

  nano.command('info <channelId>')
    .description('Show nanopayment channel details')
    .action(async (channelId: string) => {
      try {
        const config = new ConfigStore();
        const settlement = new SettlementModule(config);
        const channel = settlement.getNanopaymentChannel(channelId);
        if (!channel) throw new CLIError(`Channel not found: ${channelId}`, 'NOT_FOUND');
        formatter.json(channel);
      } catch (err) { throw new CLIError((err as Error).message, 'NANO_INFO_FAILED'); }
    });
}
