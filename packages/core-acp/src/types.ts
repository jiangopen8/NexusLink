export type ContractTemplate = 'instant' | 'milestone' | 'subscription';

export interface ContractProposal {
  id: string;
  from: string;
  to: string;
  template: ContractTemplate;
  terms: Record<string, unknown>;
  status: 'proposed' | 'signed' | 'executed' | 'disputed';
  createdAt: string;
}

export interface ACPMessage {
  id: string;
  from: string;
  to: string;
  body: string;
  sentAt: string;
  deliveredAt?: string;
}

export interface ACPTransport {
  send(message: ACPMessage): Promise<void>;
  listInbox(did: string): Promise<ACPMessage[]>;
  markDelivered?(messageIds: string[]): Promise<void>;
  heartbeat(did: string): Promise<void>;
  lastSeen(did: string): Promise<string | undefined>;
}

// Phase 2: Skill Composition types

export interface SkillNode {
  skillId: string;
  params?: Record<string, unknown>;
  dependsOn?: string[]; // skillId[] of dependencies
}

export interface SkillComposition {
  id: string;
  name: string;
  description: string;
  steps: SkillNode[];
  timeout?: number; // ms
}

export interface CompositionValidation {
  valid: boolean;
  errors: string[];
  warnings: string[];
  executionOrder?: string[]; // topological sort order
}

export interface CompositionResult {
  compositionId: string;
  success: boolean;
  stepResults: Record<string, { success: boolean; data?: unknown; error?: string }>;
  executedAt: string;
  durationMs: number;
}

