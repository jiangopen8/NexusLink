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
