export interface PoSEScore {
  did: string;
  score: number;
  contributionUsdc: number;
  successRate: number;
  disputeRate: number;
  totalTasks: number;
  calculatedAt: string;
}

export interface VerifiableCredential {
  '@context': string[];
  type: string[];
  issuer: string;
  issuanceDate: string;
  credentialSubject: Record<string, unknown>;
  proof?: unknown;
}

export interface CredentialSubject {
  id: string;
  claim: string;
  evidence?: unknown;
}

// Phase 2: DAO governance types

export type ProposalStatus = 'active' | 'passed' | 'rejected' | 'executed' | 'cancelled';
export type VoteChoice = 'for' | 'against' | 'abstain';

export interface DAOProposal {
  id: string;
  title: string;
  description: string;
  proposerDid: string;
  actions: DAOAction[];
  status: ProposalStatus;
  votesFor: number;
  votesAgainst: number;
  votesAbstain: number;
  quorum: number;     // minimum participation (0-100)
  threshold: number;  // % for > against to pass (0-100)
  startTime: string;
  endTime: string;
  createdAt: string;
  executedAt?: string;
}

export interface DAOAction {
  type: 'transfer' | 'parameter-change' | 'contract-call' | 'text';
  target?: string;
  data: Record<string, unknown>;
}

export interface DAOVote {
  proposalId: string;
  voterDid: string;
  choice: VoteChoice;
  weight: number;     // voting power based on PoSE score
  votedAt: string;
}

// Phase 2: Collaboration Space types

export type SpaceVisibility = 'public' | 'private' | 'invite-only';

export interface CollaborationSpace {
  id: string;
  name: string;
  description: string;
  ownerDid: string;
  members: SpaceMember[];
  visibility: SpaceVisibility;
  minPoSEScore: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SpaceMember {
  did: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: string;
  poseScore: number;
}

