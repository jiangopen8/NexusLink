import { Command } from 'commander';
import { DAOModule } from '@nexuslink/core-governance';
import { OutputFormatter } from '../output/formatter.js';
import { CLIError } from '../output/errors.js';

// In-memory DAO module instance
const daoModule = new DAOModule();

export function daoCommands(program: Command, formatter: OutputFormatter): void {
  const dao = program.command('dao').description('DAO governance management');

  dao
    .command('propose <title>')
    .description('Create a new DAO proposal')
    .option('--description <desc>', 'Proposal description', '')
    .option('--duration-hours <h>', 'Voting duration in hours', '72')
    .option('--quorum <n>', 'Minimum participation (votes)', '10')
    .option('--threshold <pct>', 'Pass threshold % (0-100)', '51')
    .action(async (title: string, options) => {
      try {
        const proposerDid = process.env.AGENT_DID ?? 'did:nexus:local';
        const proposal = daoModule.propose(
          proposerDid,
          title,
          options.description,
          [{ type: 'text', data: { content: options.description || title } }],
          {
            quorum: parseInt(options.quorum ?? '10'),
            threshold: parseInt(options.threshold ?? '51'),
            durationHours: parseInt(options.durationHours ?? '72'),
          }
        );

        formatter.table(
          ['Field', 'Value'],
          [
            ['ID', proposal.id],
            ['Title', proposal.title],
            ['Status', proposal.status],
            ['Quorum', proposal.quorum.toString()],
            ['Threshold', `${proposal.threshold}%`],
            ['End Time', proposal.endTime],
          ]
        );
      } catch (err) {
        throw new CLIError((err as Error).message, 'DAO_PROPOSE_FAILED');
      }
    });

  dao
    .command('list')
    .description('List DAO proposals')
    .option('--status <status>', 'Filter by status: active|passed|rejected|executed')
    .action(async (options) => {
      try {
        const proposals = daoModule.listProposals(options.status);

        if (proposals.length === 0) {
          formatter.success('No proposals found');
          return;
        }

        formatter.table(
          ['ID', 'Title', 'Status', 'For', 'Against', 'End Time'],
          proposals.map(p => [
            p.id.slice(0, 12) + '...',
            p.title.slice(0, 30),
            p.status,
            p.votesFor.toString(),
            p.votesAgainst.toString(),
            p.endTime.slice(0, 10),
          ])
        );
      } catch (err) {
        throw new CLIError((err as Error).message, 'DAO_LIST_FAILED');
      }
    });

  dao
    .command('vote <proposalId> <choice>')
    .description('Vote on a proposal (choice: for|against|abstain)')
    .option('--pose-score <score>', 'Your PoSE score for weighted voting', '0')
    .action(async (proposalId: string, choice: string, options) => {
      try {
        if (!['for', 'against', 'abstain'].includes(choice)) {
          throw new CLIError('Vote choice must be: for, against, or abstain', 'INVALID_VOTE');
        }
        const voterDid = process.env.AGENT_DID ?? 'did:nexus:local';
        const poseScore = parseFloat(options.poseScore ?? '0');

        const vote = daoModule.vote(proposalId, voterDid, choice as 'for' | 'against' | 'abstain', poseScore);
        formatter.success(`Voted "${choice}" on proposal with weight ${vote.weight}`);
      } catch (err) {
        throw new CLIError((err as Error).message, 'DAO_VOTE_FAILED');
      }
    });

  dao
    .command('info <proposalId>')
    .description('Show proposal details and vote tally')
    .action(async (proposalId: string) => {
      try {
        const proposal = daoModule.getProposal(proposalId);
        if (!proposal) throw new CLIError(`Proposal not found: ${proposalId}`, 'DAO_NOT_FOUND');

        const votes = daoModule.getVotes(proposalId);
        formatter.json({
          ...proposal,
          totalVotes: proposal.votesFor + proposal.votesAgainst + proposal.votesAbstain,
          voterCount: votes.length,
        });
      } catch (err) {
        throw new CLIError((err as Error).message, 'DAO_INFO_FAILED');
      }
    });

  dao
    .command('execute <proposalId>')
    .description('Execute a passed proposal')
    .action(async (proposalId: string) => {
      try {
        const result = daoModule.execute(proposalId);
        formatter.success(`Proposal executed: ${result.id}`);
        formatter.json({ executedAt: result.executedAt, actions: result.actions });
      } catch (err) {
        throw new CLIError((err as Error).message, 'DAO_EXECUTE_FAILED');
      }
    });
}

