import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { homedir } from 'node:os';
import { randomUUID } from 'node:crypto';
import type { ACPMessage, ACPTransport, ContractProposal, ContractTemplate } from '../types.js';

interface LocalACPState {
  messages: ACPMessage[];
  heartbeats: Record<string, string>;
}

interface LocalContractState {
  proposals: ContractProposal[];
}

function resolveStatePath(path?: string): string {
  return (path ?? '~/.nexuslink/acp-state.json').replace(/^~/, homedir());
}

export class LocalACPTransport implements ACPTransport {
  private path: string;

  constructor(path?: string) {
    this.path = resolveStatePath(path);
  }

  async send(message: ACPMessage): Promise<void> {
    const state = this.read();
    state.messages.push(message);
    this.write(state);
  }

  async listInbox(did: string): Promise<ACPMessage[]> {
    return this.read().messages.filter(message => message.to === did && !message.deliveredAt);
  }

  async markDelivered(messageIds: string[]): Promise<void> {
    if (messageIds.length === 0) return;
    const ids = new Set(messageIds);
    const deliveredAt = new Date().toISOString();
    const state = this.read();
    state.messages = state.messages.map(message =>
      ids.has(message.id) ? { ...message, deliveredAt } : message
    );
    this.write(state);
  }

  async heartbeat(did: string): Promise<void> {
    const state = this.read();
    state.heartbeats[did] = new Date().toISOString();
    this.write(state);
  }

  async lastSeen(did: string): Promise<string | undefined> {
    return this.read().heartbeats[did];
  }

  private read(): LocalACPState {
    if (!existsSync(this.path)) return { messages: [], heartbeats: {} };
    const raw = readFileSync(this.path, 'utf-8');
    const parsed = JSON.parse(raw) as Partial<LocalACPState>;
    return {
      messages: parsed.messages ?? [],
      heartbeats: parsed.heartbeats ?? {},
    };
  }

  private write(state: LocalACPState): void {
    const dir = dirname(this.path);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(this.path, JSON.stringify(state, null, 2), 'utf-8');
  }
}

export class ACPModule {
  private proposals = new Map<string, ContractProposal>();
  private contractPath: string;

  constructor(private transport: ACPTransport = new LocalACPTransport(), contractPath?: string) {
    this.contractPath = (contractPath ?? '~/.nexuslink/acp-contracts.json').replace(/^~/, homedir());
    for (const proposal of this.readContracts().proposals) {
      this.proposals.set(proposal.id, proposal);
    }
  }

  async propose(to: string, template: ContractTemplate, terms: Record<string, unknown>): Promise<ContractProposal> {
    const proposal: ContractProposal = {
      id: `contract-${randomUUID()}`,
      from: 'did:nexus:self',
      to,
      template,
      terms,
      status: 'proposed',
      createdAt: new Date().toISOString(),
    };
    this.proposals.set(proposal.id, proposal);
    this.writeContracts();
    return proposal;
  }

  async sign(contractId: string): Promise<ContractProposal> {
    this.reloadContracts();
    const p = this.proposals.get(contractId);
    if (!p) throw new Error(`Contract not found: ${contractId}`);
    const updated: ContractProposal = { ...p, status: 'signed' };
    this.proposals.set(contractId, updated);
    this.writeContracts();
    return updated;
  }

  async execute(contractId: string): Promise<ContractProposal> {
    this.reloadContracts();
    const p = this.proposals.get(contractId);
    if (!p) throw new Error(`Contract not found: ${contractId}`);
    if (p.status !== 'signed') throw new Error(`Contract must be signed before execution: ${p.status}`);
    const updated: ContractProposal = { ...p, status: 'executed' };
    this.proposals.set(contractId, updated);
    this.writeContracts();
    return updated;
  }

  async status(contractId: string): Promise<ContractProposal | undefined> {
    this.reloadContracts();
    return this.proposals.get(contractId);
  }

  listContracts(partyDid?: string): ContractProposal[] {
    this.reloadContracts();
    const all = Array.from(this.proposals.values());
    return partyDid ? all.filter(contract => contract.from === partyDid || contract.to === partyDid) : all;
  }

  async send(to: string, body: string, from = 'did:nexus:self'): Promise<ACPMessage> {
    const message: ACPMessage = {
      id: `msg-${randomUUID()}`,
      from,
      to,
      body,
      sentAt: new Date().toISOString(),
    };
    await this.transport.send(message);
    return message;
  }

  async listen(did: string, options: { markDelivered?: boolean } = {}): Promise<ACPMessage[]> {
    const messages = await this.transport.listInbox(did);
    if (options.markDelivered ?? true) {
      await this.transport.markDelivered?.(messages.map(message => message.id));
    }
    await this.transport.heartbeat(did);
    return messages;
  }

  async ping(did: string): Promise<{ reachable: boolean; lastSeen?: string }> {
    const lastSeen = await this.transport.lastSeen(did);
    return { reachable: Boolean(lastSeen), lastSeen };
  }

  async heartbeat(did: string): Promise<void> {
    await this.transport.heartbeat(did);
  }

  private reloadContracts(): void {
    this.proposals.clear();
    for (const proposal of this.readContracts().proposals) {
      this.proposals.set(proposal.id, proposal);
    }
  }

  private readContracts(): LocalContractState {
    if (!existsSync(this.contractPath)) return { proposals: [] };
    return JSON.parse(readFileSync(this.contractPath, 'utf-8')) as LocalContractState;
  }

  private writeContracts(): void {
    const dir = dirname(this.contractPath);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(this.contractPath, JSON.stringify({ proposals: Array.from(this.proposals.values()) }, null, 2), 'utf-8');
  }
}
