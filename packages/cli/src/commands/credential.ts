import { Command } from 'commander';
import { GovernanceModule } from '@nexuslink/core-governance';
import { OutputFormatter } from '../output/formatter.js';
import { CLIError } from '../output/errors.js';

function readStdin(): Promise<string> {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.on('data', (chunk: string) => { data += chunk; });
    process.stdin.on('end', () => resolve(data));
  });
}

export function credentialCommands(program: Command, formatter: OutputFormatter): void {
  const cred = program.command('credential').description('W3C VC credential management');

  cred
    .command('issue <subjectDid> <claim>')
    .option('--evidence <json>', 'Evidence as JSON string')
    .action(async (subjectDid: string, claim: string, opts: any) => {
      try {
        const gov = new GovernanceModule();
        const evidence = opts.evidence ? JSON.parse(opts.evidence) : undefined;
        const vc = await gov.issueCredential({ id: subjectDid, claim, evidence });
        formatter.json(vc);
      } catch (err) {
        throw new CLIError((err as Error).message, 'CREDENTIAL_ISSUE_FAILED');
      }
    });

  cred
    .command('verify')
    .option('--vc <json>', 'VC as JSON string')
    .action(async (opts: any) => {
      try {
        const vc = opts.vc ? JSON.parse(opts.vc) : JSON.parse(await readStdin());
        const gov = new GovernanceModule();
        const valid = await gov.verifyCredential(vc);
        if (valid) formatter.success('Credential is valid');
        else { console.error('Credential verification failed'); process.exit(1); }
      } catch (err) {
        throw new CLIError((err as Error).message, 'CREDENTIAL_VERIFY_FAILED');
      }
    });
}
