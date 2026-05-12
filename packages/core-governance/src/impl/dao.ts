import { randomUUID } from 'node:crypto';
import type { DAOProposal, DAOVote, DAOAction, ProposalStatus, VoteChoice } from '../types.js';

/**
 * DAOModule - Phase 2: Decentralized Autonomous Organization
 *
 * Enables NexusLink agents to participate in governance:
 * - Create proposals
 * - Vote with PoSE-weighted voting power
 * - Execute passed proposals
 */
export class DAOModule {
  private proposals = new Map<string, DAOProposal>();
  private votes = new Map<string, DAOVote[]>(); // proposalId → votes

  /**
   * Create a new DAO proposal
   */
  propose(
    proposerDid: string,
    title: string,
    description: string,
    actions: DAOAction[],
    options: {
      quorum?: number;
      threshold?: number;
      durationHours?: number;
    } = {}
  ): DAOProposal {
    const id = `dao-${randomUUID()}`;
    const now = new Date();
    const endTime = new Date(now.getTime() + (options.durationHours ?? 72) * 3600 * 1000);

    const proposal: DAOProposal = {
      id,
      title,
      description,
      proposerDid,
      actions,
      status: 'active',
      votesFor: 0,
      votesAgainst: 0,
      votesAbstain: 0,
      quorum: options.quorum ?? 10,
      threshold: options.threshold ?? 51,
      startTime: now.toISOString(),
      endTime: endTime.toISOString(),
      createdAt: now.toISOString(),
    };

    this.proposals.set(id, proposal);
    this.votes.set(id, []);
    return proposal;
  }

  /**
   * Vote on an active proposal
   */
  vote(
    proposalId: string,
    voterDid: string,
    choice: VoteChoice,
    poseScore: number
  ): DAOVote {
    const proposal = this.proposals.get(proposalId);
    if (!proposal) throw new Error(`Proposal not found: ${proposalId}`);
    if (proposal.status !== 'active') throw new Error(`Proposal is not active: ${proposal.status}`);

    // Check for duplicate vote
    const existingVotes = this.votes.get(proposalId) ?? [];
    if (existingVotes.some(v => v.voterDid === voterDid)) {
      throw new Error(`${voterDid} has already voted on this proposal`);
    }

    // Weight vote by PoSE score (minimum weight of 1)
    const weight = Math.max(1, Math.floor(poseScore));
    const daoVote: DAOVote = {
      proposalId,
      voterDid,
      choice,
      weight,
      votedAt: new Date().toISOString(),
    };

    existingVotes.push(daoVote);
    this.votes.set(proposalId, existingVotes);

    // Update proposal tallies
    const updated = { ...proposal };
    if (choice === 'for') updated.votesFor += weight;
    else if (choice === 'against') updated.votesAgainst += weight;
    else updated.votesAbstain += weight;

    this.proposals.set(proposalId, updated);
    return daoVote;
  }

  /**
   * Finalize a proposal after voting period ends
   */
  finalize(proposalId: string): ProposalStatus {
    const proposal = this.proposals.get(proposalId);
    if (!proposal) throw new Error(`Proposal not found: ${proposalId}`);
    if (proposal.status !== 'active') return proposal.status;
    if (new Date() <= new Date(proposal.endTime)) throw new Error('Voting period has not ended');

    const totalVotes = proposal.votesFor + proposal.votesAgainst + proposal.votesAbstain;
    const participation = totalVotes; // simplified quorum check
    const forPct = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 0;

    let status: ProposalStatus;
    if (participation < proposal.quorum) {
      status = 'rejected'; // quorum not met
    } else if (forPct >= proposal.threshold) {
      status = 'passed';
    } else {
      status = 'rejected';
    }

    this.proposals.set(proposalId, { ...proposal, status });
    return status;
  }

  /**
   * Execute a passed proposal
   */
  execute(proposalId: string): DAOProposal {
    const proposal = this.proposals.get(proposalId);
    if (!proposal) throw new Error(`Proposal not found: ${proposalId}`);
    if (proposal.status !== 'passed') throw new Error(`Proposal is not passed: ${proposal.status}`);

    const executed: DAOProposal = {
      ...proposal,
      status: 'executed',
      executedAt: new Date().toISOString(),
    };
    this.proposals.set(proposalId, executed);
    return executed;
  }

  /**
   * Get proposal details
   */
  getProposal(proposalId: string): DAOProposal | undefined {
    return this.proposals.get(proposalId);
  }

  /**
   * List all proposals
   */
  listProposals(status?: ProposalStatus): DAOProposal[] {
    const all = Array.from(this.proposals.values());
    return status ? all.filter(p => p.status === status) : all;
  }

  /**
   * Get votes for a proposal
   */
  getVotes(proposalId: string): DAOVote[] {
    return this.votes.get(proposalId) ?? [];
  }

  exportState(): { proposals: DAOProposal[]; votes: Record<string, DAOVote[]> } {
    return {
      proposals: Array.from(this.proposals.values()),
      votes: Object.fromEntries(this.votes),
    };
  }

  importState(state: { proposals?: DAOProposal[]; votes?: Record<string, DAOVote[]> }): void {
    this.proposals = new Map((state.proposals ?? []).map(proposal => [proposal.id, proposal]));
    this.votes = new Map(Object.entries(state.votes ?? {}));
  }
}
