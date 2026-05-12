import { Command } from 'commander';
import { GovernanceModule } from '@nexuslink/core-governance';
import { OutputFormatter } from '../output/formatter.js';

export function poseCommands(program: Command, formatter: OutputFormatter): void {
  const pose = program.command('pose').description('PoSE reputation management');

  pose
    .command('query <did>')
    .description('Query PoSE score for a DID')
    .action((did: string) => {
      const gov = new GovernanceModule();
      const score = gov.queryPoSE(did);
      formatter.table(['Metric', 'Value'], [
        ['DID', score.did],
        ['Score', String(score.score)],
        ['Contribution', `${score.contributionUsdc} USDC`],
        ['Success Rate', `${score.successRate}%`],
        ['Dispute Rate', `${score.disputeRate}%`],
        ['Total Tasks', String(score.totalTasks)],
        ['Calculated At', score.calculatedAt],
      ]);
    });
}
