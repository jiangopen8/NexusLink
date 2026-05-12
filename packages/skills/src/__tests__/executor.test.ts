import { describe, it, expect } from 'vitest';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { SkillExecutor } from '../executor.js';

describe('SkillExecutor', () => {
  function isolateHome(): void {
    process.env.USERPROFILE = mkdtempSync(join(tmpdir(), 'nexuslink-skills-home-'));
    process.env.HOME = process.env.USERPROFILE;
    delete process.env.PRIVATE_KEY;
    delete process.env.DID_REGISTRY_ADDRESS;
    delete process.env.NSS_REGISTRY_ADDRESS;
    delete process.env.SETTLEMENT_ADDRESS;
    process.env.AGENT_DID = 'did:nexus:test-agent';
  }

  it('returns not found for unknown skill', async () => {
    const executor = new SkillExecutor();
    const result = await executor.execute({ skillId: 'nexuslink:unknown:skill', params: {} });
    expect(result.success).toBe(false);
    expect(result.message).toContain('not found');
  });

  it('returns suggestions for unknown skill', async () => {
    const executor = new SkillExecutor();
    const result = await executor.execute({ skillId: 'nexuslink:unknown', params: {} });
    expect(result.suggestions).toBeDefined();
    expect(result.suggestions!.length).toBeGreaterThan(0);
  });

  it('executes every registered skill without missing implementation branch', async () => {
    isolateHome();
    const executor = new SkillExecutor();
    const registry = executor.getRegistry();
    const createdDid = await executor.execute({ skillId: 'nexuslink:did:register', params: { agentType: 'assistant', skills: ['analysis'] } });
    expect(createdDid.success).toBe(true);
    const did = createdDid.data.did as string;

    const publish = await executor.execute({
      skillId: 'nexuslink:nss:publish',
      params: {
        skillId: 'nss://analysis',
        name: 'Analysis',
        description: 'analysis skill',
        version: '1.0.0',
        publisherDid: did,
        tags: ['analysis'],
      },
    });
    expect(publish.success).toBe(true);

    const memoryStore = await executor.execute({
      skillId: 'nexuslink:memory:store',
      params: { data: Buffer.from('memory').toString('base64'), tags: ['test'] },
    });
    expect(memoryStore.success).toBe(true);

    const space = await executor.execute({
      skillId: 'nexuslink:space:create',
      params: { name: 'Test Space', visibility: 'public' },
      context: { callerDid: did },
    });
    expect(space.success).toBe(true);

    const proposal = await executor.execute({
      skillId: 'nexuslink:dao:propose',
      params: { title: 'Proposal', description: 'Test proposal' },
      context: { callerDid: did },
    });
    expect(proposal.success).toBe(true);

    const baseParams: Record<string, Record<string, unknown>> = {
      'nexuslink:did:register': { agentType: 'assistant' },
      'nexuslink:did:resolve': { did },
      'nexuslink:did:deactivate': { did },
      'nexuslink:did:update': { did, skills: ['updated'] },
      'nexuslink:did:set-boundary': { did, allowedDomains: ['payments'], maxValueUsdc: 10 },
      'nexuslink:nss:publish': { skillId: 'nss://other', name: 'Other', description: 'other skill', version: '1.0.0', publisherDid: did, tags: ['other'] },
      'nexuslink:nss:discover': { intent: 'analysis' },
      'nexuslink:nss:invoke': { skillId: 'nss://analysis', input: { prompt: 'run' } },
      'nexuslink:pose:query': { did },
      'nexuslink:credential:issue': { subjectDid: did, claim: 'completed task' },
      'nexuslink:credential:verify': { vc: (await executor.execute({ skillId: 'nexuslink:credential:issue', params: { subjectDid: did, claim: 'verify' } })).data.vc },
      'nexuslink:pay:send': { to: 'did:nexus:receiver', amount: '1.00' },
      'nexuslink:pay:balance': { account: 'did:nexus:receiver' },
      'nexuslink:memory:store': { data: Buffer.from('again').toString('base64') },
      'nexuslink:memory:retrieve': { cid: memoryStore.data.shardId },
      'nexuslink:memory:delete': { cid: memoryStore.data.shardId },
      'nexuslink:memory:sync': {},
      'nexuslink:contract:propose': { to: 'did:nexus:receiver', template: 'instant', terms: { amount: '1' } },
      'nexuslink:space:create': { name: 'Another Space', visibility: 'public' },
      'nexuslink:space:join': { spaceId: space.data.spaceId, memberDid: 'did:nexus:space-member', poseScore: 1 },
      'nexuslink:acp:compose': { name: 'Workflow', steps: [{ skillId: 'step-1' }] },
      'nexuslink:dao:propose': { title: 'Another Proposal', description: 'Text' },
      'nexuslink:dao:vote': { proposalId: proposal.data.proposalId, choice: 'for', poseScore: 10 },
      'nexuslink:pay:nano:create': { receiver: 'did:nexus:receiver', totalDeposit: '1.00' },
      'nexuslink:pay:ecny': { to: 'did:nexus:receiver', amount: '10' },
      'nexuslink:analytics:pose': { contributionUsdc: 10, successRate: 90, skillDiversity: 2 },
      'nexuslink:adapter:claude-code': { task: 'review' },
      'nexuslink:adapter:codex': { task: 'complete' },
      'nexuslink:adapter:search': { query: 'nexuslink' },
    };

    const channel = await executor.execute({ skillId: 'nexuslink:pay:nano:create', params: baseParams['nexuslink:pay:nano:create'] });
    baseParams['nexuslink:pay:nano:send'] = { channelId: channel.data.channelId, amount: '0.1', sequence: 1 };
    const contract = await executor.execute({ skillId: 'nexuslink:contract:propose', params: baseParams['nexuslink:contract:propose'] });
    baseParams['nexuslink:contract:sign'] = { contractId: contract.data.id };
    baseParams['nexuslink:contract:execute'] = { contractId: contract.data.id };

    for (const skill of registry.list()) {
      const result = await executor.execute({
        skillId: skill.skill,
        params: baseParams[skill.skill] ?? {},
        context: { callerDid: did },
      });
      expect(result.success, skill.skill).toBe(true);
    }
  });
});
