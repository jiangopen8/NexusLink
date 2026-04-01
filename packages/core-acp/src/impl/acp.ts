import type { ContractProposal, ContractTemplate } from '../types.js';

export class ACPModule {
  private proposals = new Map<string, ContractProposal>();

  async propose(to: string, template: ContractTemplate, terms: Record<string, unknown>): Promise<ContractProposal> {
    const proposal: ContractProposal = {
      id: `contract-${Date.now()}`,
      from: 'did:nexus:self',
      to,
      template,
      terms,
      status: 'proposed',
      createdAt: new Date().toISOString(),
    };
    this.proposals.set(proposal.id, proposal);
    return proposal;
  }

  async sign(contractId: string): Promise<ContractProposal> {
    const p = this.proposals.get(contractId);
    if (!p) throw new Error(`Contract not found: ${contractId}`);
    const updated: ContractProposal = { ...p, status: 'signed' };
    this.proposals.set(contractId, updated);
    return updated;
  }

  async execute(contractId: string): Promise<{ success: boolean }> {
    const p = this.proposals.get(contractId);
    if (!p) throw new Error(`Contract not found: ${contractId}`);
    if (p.status !== 'signed') throw new Error(`Contract must be signed before execution: ${p.status}`);
    const updated: ContractProposal = { ...p, status: 'executed' };
    this.proposals.set(contractId, updated);
    return { success: true };
  }

  async status(contractId: string): Promise<ContractProposal | undefined> {
    return this.proposals.get(contractId);
  }
}
