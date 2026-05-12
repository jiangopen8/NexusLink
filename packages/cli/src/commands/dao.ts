import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { homedir } from 'node:os';
import { Command } from 'commander';
import { DAOModule } from '@nexuslink/core-governance';
import { OutputFormatter } from '../output/formatter.js';
import { CLIError } from '../output/errors.js';

const STATE_PATH = '~/.nexuslink/dao.json'.replace(/^~/, homedir());

function loadDAO(): DAOModule {
  const module = new DAOModule();
  if (existsSync(STATE_PATH)) module.importState(JSON.parse(readFileSync(STATE_PATH, 'utf-8')));
  return module;
}

function saveDAO(module: DAOModule): void {
  const dir = dirname(STATE_PATH);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(STATE_PATH, JSON.stringify(module.exportState(), null, 2), 'utf-8');
}

export function daoCommands(program: Command, formatter: OutputFormatter): void {
  const dao = program.command('dao').description('DAO governance management');

  function addCreateCommand(commandName: 'create' | 'propose'): void {
    dao
      .command(`${commandName} <title>`)
      .description(commandName === 'create' ? 'Create a DAO proposal' : 'Create a new DAO proposal')
      .option('--description <desc>', 'Proposal description', '')
      .option('--duration-hours <h>', 'Voting duration in hours', '72')
      .option('--quorum <n>', 'Minimum participation (votes)', '10')
      .option('--threshold <pct>', 'Pass threshold % (0-100)', '51')
      .action(async (title: string, options) => {
        try {
          const module = loadDAO();
          const proposal = module.propose(
            process.env.AGENT_DID ?? 'did:nexus:local',
            title,
            options.description,
            [{ type: 'text', data: { content: options.description || title } }],
            {
              quorum: parseInt(options.quorum ?? '10', 10),
              threshold: parseInt(options.threshold ?? '51', 10),
              durationHours: parseInt(options.durationHours ?? '72', 10),
            }
          );
          saveDAO(module);
          formatter.json(proposal);
        } catch (err) {
          throw new CLIError((err as Error).message, 'DAO_PROPOSE_FAILED');
        }
      });
  }

  addCreateCommand('create');
  addCreateCommand('propose');

  dao
    .command('list')
    .description('List DAO proposals')
    .option('--status <status>', 'Filter by status: active|passed|rejected|executed')
    .action(async (options) => {
      try {
        const proposals = loadDAO().listProposals(options.status);
        if (proposals.length === 0) {
          formatter.success('No proposals found');
          return;
        }
        formatter.table(
          ['ID', 'Title', 'Status', 'For', 'Against', 'End Time'],
          proposals.map(p => [p.id, p.title, p.status, p.votesFor.toString(), p.votesAgainst.toString(), p.endTime])
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
        const module = loadDAO();
        const vote = module.vote(proposalId, process.env.AGENT_DID ?? 'did:nexus:local', choice as 'for' | 'against' | 'abstain', parseFloat(options.poseScore ?? '0'));
        saveDAO(module);
        formatter.success(`Voted "${choice}" on proposal with weight ${vote.weight}`);
      } catch (err) {
        throw new CLIError((err as Error).message, 'DAO_VOTE_FAILED');
      }
    });

  dao
    .command('status <proposalId>')
    .description('Show DAO proposal status')
    .action(async (proposalId: string) => {
      try {
        const proposal = loadDAO().getProposal(proposalId);
        if (!proposal) throw new CLIError(`Proposal not found: ${proposalId}`, 'DAO_NOT_FOUND');
        formatter.json(proposal);
      } catch (err) {
        throw new CLIError((err as Error).message, 'DAO_STATUS_FAILED');
      }
    });

  dao
    .command('info <proposalId>')
    .description('Show proposal details and vote tally')
    .action(async (proposalId: string) => {
      try {
        const module = loadDAO();
        const proposal = module.getProposal(proposalId);
        if (!proposal) throw new CLIError(`Proposal not found: ${proposalId}`, 'DAO_NOT_FOUND');
        const votes = module.getVotes(proposalId);
        formatter.json({ ...proposal, totalVotes: proposal.votesFor + proposal.votesAgainst + proposal.votesAbstain, voterCount: votes.length });
      } catch (err) {
        throw new CLIError((err as Error).message, 'DAO_INFO_FAILED');
      }
    });

  dao
    .command('members <daoId>')
    .description('List voters for a DAO proposal')
    .action(async (daoId: string) => {
      try {
        const votes = loadDAO().getVotes(daoId);
        if (votes.length === 0) {
          formatter.success('No voters found');
          return;
        }
        formatter.table(['DID', 'Choice', 'Weight', 'Voted At'], votes.map(vote => [vote.voterDid, vote.choice, vote.weight.toString(), vote.votedAt]));
      } catch (err) {
        throw new CLIError((err as Error).message, 'DAO_MEMBERS_FAILED');
      }
    });

  dao
    .command('execute <proposalId>')
    .description('Execute a passed proposal')
    .action(async (proposalId: string) => {
      try {
        const module = loadDAO();
        const result = module.execute(proposalId);
        saveDAO(module);
        formatter.json(result);
      } catch (err) {
        throw new CLIError((err as Error).message, 'DAO_EXECUTE_FAILED');
      }
    });
}
