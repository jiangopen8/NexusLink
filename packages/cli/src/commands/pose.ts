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

  pose
    .command('history <did>')
    .description('Show PoSE history for a DID')
    .action((did: string) => {
      const gov = new GovernanceModule();
      const score = gov.queryPoSE(did);
      formatter.table(['DID', 'Score', 'Calculated At'], [[score.did, String(score.score), score.calculatedAt]]);
    });

  pose
    .command('leaderboard')
    .description('Show PoSE leaderboard')
    .option('--space <spaceId>', 'Filter by space')
    .action((opts) => {
      const dids = [process.env.AGENT_DID ?? 'did:nexus:local'];
      const gov = new GovernanceModule();
      formatter.table(['Rank', 'DID', 'Score', 'Space'], dids.map((did, index) => {
        const score = gov.queryPoSE(did);
        return [String(index + 1), score.did, String(score.score), opts.space ?? '-'];
      }));
    });
}
