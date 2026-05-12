import { Buffer } from 'node:buffer';
import { randomUUID } from 'node:crypto';
import type { SkillInvocation, SkillResult } from './types.js';
import { SkillRegistry } from './registry.js';
import { ConfigStore } from '@nexuslink/core-config';
import { IdentityModule } from '@nexuslink/core-identity';
import { NSSModule } from '@nexuslink/core-nss';
import { SettlementModule } from '@nexuslink/core-settlement';
import { GovernanceModule, DAOModule, SpaceModule } from '@nexuslink/core-governance';
import { SkillComposer } from '@nexuslink/core-acp';
import { ACPModule } from '@nexuslink/core-acp';
import { MemoryModule } from '@nexuslink/core-memory';
import { SALModule } from '@nexuslink/core-sal';

const dao = new DAOModule();
const spaces = new SpaceModule();
const composer = new SkillComposer();
const acp = new ACPModule();

function config(): ConfigStore {
  return new ConfigStore();
}

function memory(): MemoryModule {
  const store = config();
  const sal = new SALModule(store.getStorageConfig());
  const ownerDid = store.getDefaultDid() ?? 'did:nexus:local';
  const key = Buffer.from(process.env.NEXUSLINK_MEMORY_KEY ?? 'nexuslink-local-memory-key');
  return new MemoryModule(ownerDid, key, sal);
}

function ok(data: Record<string, unknown>, message: string, extra: Partial<SkillResult> = {}): SkillResult {
  return { success: true, data, message, ...extra };
}

export class SkillExecutor {
  private registry: SkillRegistry;
  private settlement: SettlementModule;

  constructor() {
    this.registry = new SkillRegistry();
    this.settlement = new SettlementModule(config());
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
      return await this.executeKnown(invocation);
    } catch (err) {
      return { success: false, data: {}, message: (err as Error).message };
    }
  }

  getRegistry(): SkillRegistry {
    return this.registry;
  }

  private async executeKnown(invocation: SkillInvocation): Promise<SkillResult> {
    const params = invocation.params;

    switch (invocation.skillId) {
      case 'nexuslink:did:register': {
        const typeMap: Record<string, 'AssistantAgent' | 'ToolAgent' | 'Human'> = {
          assistant: 'AssistantAgent',
          tool: 'ToolAgent',
          human: 'Human',
          AssistantAgent: 'AssistantAgent',
          ToolAgent: 'ToolAgent',
          Human: 'Human',
        };
        const identity = new IdentityModule(config());
        const doc = await identity.register({
          type: typeMap[String(params.agentType ?? params.type ?? 'assistant')],
          skills: params.skills as string[] | undefined,
          languages: params.languages as string[] | undefined,
          ownerDid: params.ownerDid as string | undefined,
        });
        return ok({ did: doc.id, txHash: doc.ipfsHash ?? '', document: doc as unknown as Record<string, unknown> }, 'DID registered successfully', { suggestions: ['nexuslink:did:resolve'] });
      }
      case 'nexuslink:did:resolve': {
        const doc = await new IdentityModule(config()).resolve(params.did as string);
        return ok(doc as unknown as Record<string, unknown>, `Resolved DID: ${doc.id}`);
      }
      case 'nexuslink:did:deactivate': {
        await new IdentityModule(config()).deactivate(params.did as string);
        return ok({ did: params.did as string, deactivated: true }, 'DID deactivated');
      }
      case 'nexuslink:did:update': {
        const doc = await new IdentityModule(config()).update(params.did as string, {
          skills: params.skills as string[] | undefined,
          languages: params.languages as string[] | undefined,
        });
        return ok(doc as unknown as Record<string, unknown>, 'DID updated');
      }
      case 'nexuslink:did:set-boundary': {
        const doc = await new IdentityModule(config()).update(params.did as string, {
          intentBoundary: {
            allowedDomains: (params.allowedDomains as string[] | undefined) ?? [],
            maxValueUsdc: Number(params.maxValueUsdc ?? 0),
            selfSigned: true,
          },
        } as any);
        return ok(doc as unknown as Record<string, unknown>, 'Intent boundary set');
      }
      case 'nexuslink:nss:publish': {
        const result = await new NSSModule(config()).publish(params as any);
        return ok(result, 'NSS skill published');
      }
      case 'nexuslink:nss:discover': {
        const skills = await new NSSModule(config()).discover(String(params.intent ?? ''), {
          minPose: params.minPose as number | undefined,
          maxPrice: params.maxPrice as string | undefined,
        });
        return ok({ skills }, `Discovered ${skills.length} skills`);
      }
      case 'nexuslink:nss:invoke': {
        const result = await new NSSModule(config()).invoke(params.skillId as string, params.input ?? {});
        return ok(result.data as Record<string, unknown>, result.message);
      }
      case 'nexuslink:pose:query': {
        const score = new GovernanceModule().queryPoSE(params.did as string);
        return ok(score as unknown as Record<string, unknown>, `PoSE score: ${score.score}`);
      }
      case 'nexuslink:credential:issue': {
        const vc = await new GovernanceModule().issueCredential({
          id: params.subjectDid as string,
          claim: params.claim as string,
          evidence: params.evidence,
        });
        return ok({ vc: vc as unknown as Record<string, unknown> }, 'Credential issued');
      }
      case 'nexuslink:credential:verify': {
        const valid = await new GovernanceModule().verifyCredential(params.vc as any);
        return ok({ valid }, valid ? 'Credential is valid' : 'Credential is invalid');
      }
      case 'nexuslink:pay:send': {
        const result = await this.settlement.send(params.to as string, params.amount as string, params.contractId as string | undefined);
        return ok(result, 'Payment sent successfully');
      }
      case 'nexuslink:pay:balance': {
        const balance = await this.settlement.getBalance('USDC', params.account as string | undefined);
        return ok({ balance }, 'Balance retrieved');
      }
      case 'nexuslink:memory:store': {
        const data = Buffer.from(params.data as string, 'base64');
        const shard = await memory().store(data, params.tags as string[] | undefined);
        return ok({ cid: shard.encryptedCid, shardId: shard.id, encrypted: true }, 'Memory stored');
      }
      case 'nexuslink:memory:retrieve': {
        const data = await memory().retrieveById(params.cid as string);
        return ok({ data: Buffer.from(data).toString('base64'), size: data.byteLength }, 'Memory retrieved');
      }
      case 'nexuslink:memory:delete': {
        await memory().delete(params.cid as string);
        return ok({ success: true }, 'Memory deleted');
      }
      case 'nexuslink:memory:sync': {
        return ok(memory().sync(), 'Memory synced');
      }
      case 'nexuslink:contract:propose': {
        const contract = await acp.propose(params.to as string, params.template as any, (params.terms as Record<string, unknown> | undefined) ?? {});
        return ok(contract as unknown as Record<string, unknown>, 'Contract proposed');
      }
      case 'nexuslink:contract:sign': {
        const contract = await acp.sign(params.contractId as string);
        return ok(contract as unknown as Record<string, unknown>, 'Contract signed');
      }
      case 'nexuslink:contract:execute': {
        const result = await acp.execute(params.contractId as string);
        return ok(result as unknown as Record<string, unknown>, 'Contract executed');
      }
      case 'nexuslink:space:create': {
        const space = spaces.create(
          invocation.context?.callerDid ?? 'did:nexus:local',
          params.name as string,
          (params.description as string | undefined) ?? '',
          {
            visibility: params.visibility as any,
            minPoSEScore: params.minPoSEScore as number | undefined,
            tags: params.tags as string[] | undefined,
          },
        );
        return ok({ spaceId: space.id, name: space.name, memberCount: space.members.length }, 'Space created');
      }
      case 'nexuslink:space:join': {
        const memberDid = (params.memberDid as string | undefined) ?? invocation.context?.callerDid ?? 'did:nexus:local';
        const space = spaces.join(params.spaceId as string, memberDid, (params.poseScore as number | undefined) ?? 0);
        return ok({ success: true, memberCount: space.members.length }, 'Joined space');
      }
      case 'nexuslink:acp:compose': {
        const composition = {
          id: `comp-${randomUUID()}`,
          name: params.name as string,
          description: (params.description as string | undefined) ?? '',
          steps: params.steps as any[],
        };
        const validation = composer.register(composition);
        if (!validation.valid) return { success: false, data: { errors: validation.errors }, message: 'Composition invalid' };
        const result = await composer.execute(composition.id, async skillId => ({ skillId, status: 'dry-run' }));
        return ok({ compositionId: result.compositionId, success: result.success, durationMs: result.durationMs }, 'Composition executed');
      }
      case 'nexuslink:dao:propose': {
        const proposal = dao.propose(invocation.context?.callerDid ?? 'did:nexus:local', params.title as string, params.description as string, [], {
          quorum: params.quorum as number | undefined,
          threshold: params.threshold as number | undefined,
          durationHours: params.durationHours as number | undefined,
        });
        return ok({ proposalId: proposal.id, endTime: proposal.endTime }, 'DAO proposal created');
      }
      case 'nexuslink:dao:vote': {
        const vote = dao.vote(params.proposalId as string, invocation.context?.callerDid ?? 'did:nexus:local', params.choice as any, (params.poseScore as number | undefined) ?? 1);
        const proposal = dao.getProposal(params.proposalId as string);
        return ok({ weight: vote.weight, currentTally: proposal }, 'DAO vote cast');
      }
      case 'nexuslink:pay:nano:create': {
        const channel = await this.settlement.createNanopaymentChannel(params.receiver as string, params.totalDeposit as string, (params.durationHours as number | undefined) ?? 24);
        return ok({ channelId: channel.channelId, expiresAt: channel.expiresAt }, 'Nanopayment channel created');
      }
      case 'nexuslink:pay:nano:send': {
        const transfer = await this.settlement.signNanopayment(params.channelId as string, params.amount as string, params.sequence as number);
        return ok({ signature: transfer.signature, totalSent: transfer.amount, transfer }, 'Nanopayment signed');
      }
      case 'nexuslink:pay:ecny': {
        const result = await this.settlement.sendMultiCurrency(params.to as string, params.amount as string, 'CNY', params.contractId as string | undefined);
        return ok({ ...result }, 'e-CNY payment sent');
      }
      case 'nexuslink:analytics:pose': {
        const contributionUsdc = Number(params.contributionUsdc ?? 0);
        const successRate = Number(params.successRate ?? 0);
        const skillDiversity = Number(params.skillDiversity ?? 0);
        const contributionScore = Math.min(50, contributionUsdc / 4);
        const executionScore = Math.min(40, successRate * 0.4);
        const diversityBonus = Math.min(10, skillDiversity * 2);
        return ok({
          poseScore: Math.round(contributionScore + executionScore + diversityBonus),
          breakdown: { contributionScore, executionScore, diversityBonus },
        }, 'PoSE analytics calculated');
      }
      case 'nexuslink:adapter:claude-code':
      case 'nexuslink:adapter:codex':
      case 'nexuslink:adapter:search':
        return ok({ accepted: true, params }, 'Adapter task accepted');
      default:
        throw new Error(`Unhandled registered skill: ${invocation.skillId}`);
    }
  }
}
