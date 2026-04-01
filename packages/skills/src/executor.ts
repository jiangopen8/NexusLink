import type { SkillInvocation, SkillResult } from './types.js';
import { SkillRegistry } from './registry.js';
import { ConfigStore } from '@nexuslink/core-config';
import { IdentityModule } from '@nexuslink/core-identity';
import { NSSModule } from '@nexuslink/core-nss';
import { SettlementModule } from '@nexuslink/core-settlement';
import { GovernanceModule } from '@nexuslink/core-governance';

export class SkillExecutor {
  private registry: SkillRegistry;

  constructor() {
    this.registry = new SkillRegistry();
  }

  async execute(invocation: SkillInvocation): Promise<SkillResult> {
    const skill = this.registry.get(invocation.skillId);
    if (!skill) {
      return {
        success: false,
        data: {},
        message: `Skill not found: ${invocation.skillId}`,
        suggestions: this.registry.list().slice(0, 3).map(s => s.skill),
      };
    }

    try {
      switch (invocation.skillId) {
        case 'nexuslink:did:register': {
          const config = new ConfigStore();
          const identity = new IdentityModule(config);
          const doc = await identity.register(invocation.params as any);
          return { success: true, data: { did: doc.id, txHash: doc.ipfsHash }, message: 'DID registered successfully', suggestions: ['nexuslink:did:resolve'] };
        }
        case 'nexuslink:did:resolve': {
          const config = new ConfigStore();
          const identity = new IdentityModule(config);
          const doc = await identity.resolve(invocation.params.did as string);
          return { success: true, data: doc as unknown as Record<string, unknown>, message: `Resolved DID: ${doc.id}` };
        }
        case 'nexuslink:nss:invoke': {
          const config = new ConfigStore();
          const nss = new NSSModule(config);
          const result = await nss.invoke(invocation.params.skillId as string, invocation.params.input);
          return { success: true, data: result.data as unknown as Record<string, unknown>, message: result.message };
        }
        case 'nexuslink:pose:query': {
          const gov = new GovernanceModule();
          const score = gov.queryPoSE(invocation.params.did as string);
          return { success: true, data: score as unknown as Record<string, unknown>, message: `PoSE score: ${score.score}` };
        }
        case 'nexuslink:pay:send': {
          const config = new ConfigStore();
          const settlement = new SettlementModule(config);
          const result = await settlement.send(invocation.params.to as string, invocation.params.amount as string, invocation.params.contractId as string | undefined);
          return { success: true, data: result, message: 'Payment sent successfully' };
        }
        default:
          return { success: false, data: {}, message: `Skill not implemented: ${invocation.skillId}` };
      }
    } catch (err) {
      return { success: false, data: {}, message: (err as Error).message };
    }
  }

  getRegistry(): SkillRegistry {
    return this.registry;
  }
}
