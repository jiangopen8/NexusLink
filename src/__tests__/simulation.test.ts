import { describe, expect, it } from 'vitest';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { Buffer } from 'node:buffer';
import { ConfigStore } from '../../packages/core-config/src/index.js';
import { IdentityModule } from '../../packages/core-identity/src/index.js';
import { NSSModule } from '../../packages/core-nss/src/index.js';
import { GovernanceModule, SpaceModule, DAOModule } from '../../packages/core-governance/src/index.js';
import { ACPModule, SkillComposer } from '../../packages/core-acp/src/index.js';
import { MemoryModule } from '../../packages/core-memory/src/index.js';
import { SALModule } from '../../packages/core-sal/src/index.js';
import { SettlementModule } from '../../packages/core-settlement/src/index.js';
import { SkillMarketplace } from '../../packages/marketplace/src/index.js';
import { SkillExecutor, SkillRegistry, ClaudeCodeAdapter, CodexAdapter, OpenClawAdapter } from '../../packages/skills/src/index.js';

function isolateRuntime(): string {
  const home = mkdtempSync(join(tmpdir(), 'nexuslink-simulation-'));
  process.env.HOME = home;
  process.env.USERPROFILE = home;
  process.env.AGENT_DID = 'did:nexus:simulation-runner';
  process.env.NEXUSLINK_MEMORY_KEY = 'simulation-memory-key';
  delete process.env.PRIVATE_KEY;
  delete process.env.DID_REGISTRY_ADDRESS;
  delete process.env.NSS_REGISTRY_ADDRESS;
  delete process.env.SETTLEMENT_ADDRESS;
  delete process.env.PINATA_API_KEY;
  delete process.env.PINATA_SECRET;
  delete process.env.ZERO_G_API_KEY;
  return home;
}

describe('NexusLink architecture simulation', () => {
  it('runs a full local agent cooperation scenario across core, skills, marketplace, and settlement', async () => {
    const home = isolateRuntime();
    const config = ConfigStore.init(join(home, 'config.yaml'));
    config.set({ network: 'local', storage: { backend: 'local', localPath: join(home, 'storage') } });

    const identity = new IdentityModule(config);
    const alice = await identity.register({
      type: 'AssistantAgent',
      ownerDid: 'did:nexus:human-alice',
      skills: ['analysis', 'coordination'],
      languages: ['en', 'zh-CN'],
    });
    const bob = await identity.register({
      type: 'ToolAgent',
      ownerDid: 'did:nexus:human-bob',
      skills: ['marketplace-research', 'payment'],
      languages: ['en'],
    });
    config.setDefaultDid(alice.id);

    const resolvedAlice = await identity.resolve(alice.id);
    expect(resolvedAlice.skills).toContain('analysis');

    const nss = new NSSModule(config);
    const researchSkill = {
      skillId: 'nss://market-research-v1',
      name: 'Market Research',
      description: 'Find and summarize market signals for agent cooperation',
      version: '1.0.0',
      publisherDid: bob.id,
      priceUsdc: '0.25',
      tags: ['research', 'analysis', 'market'],
    };
    await expect(nss.publish(researchSkill)).resolves.toMatchObject({ skillId: researchSkill.skillId });
    const discovered = await nss.discover('market', { maxPrice: '1', limit: 5 });
    expect(discovered.map(skill => skill.skillId)).toContain(researchSkill.skillId);

    const marketplace = new SkillMarketplace();
    marketplace.publish({ ...researchSkill, poseScore: 88, publishedAt: '' });
    marketplace.recordInvocation(researchSkill.skillId, true);
    marketplace.recordInvocation(researchSkill.skillId, false);
    marketplace.submitReview(researchSkill.skillId, {
      reviewerDid: alice.id,
      rating: 4,
      comment: 'Useful for simulated cooperation',
    });
    const marketSearch = marketplace.search({ q: 'research', minPose: 80, sort: 'pose' });
    expect(marketSearch.items[0].skillId).toBe(researchSkill.skillId);
    expect(marketplace.getAverageRating(researchSkill.skillId)).toBe(4);

    const sal = new SALModule(config.getStorageConfig());
    expect(sal.getBackendType()).toBe('local');
    const memory = new MemoryModule(alice.id, Buffer.from('simulation-memory-key'), sal, join(home, 'memory-index.json'));
    const shard = await memory.store(Buffer.from(JSON.stringify({ selectedSkill: researchSkill.skillId })), ['simulation', 'nss']);
    const restored = JSON.parse(Buffer.from(await memory.retrieve(shard)).toString('utf-8')) as { selectedSkill: string };
    expect(restored.selectedSkill).toBe(researchSkill.skillId);

    const acp = new ACPModule();
    const sent = await acp.send(bob.id, 'Please run market research', alice.id);
    const inbox = await acp.listen(bob.id);
    expect(inbox[0]).toMatchObject({ id: sent.id, body: 'Please run market research' });

    const contract = await acp.propose(bob.id, 'instant', { skillId: researchSkill.skillId, amount: '0.25' }, alice.id);
    await acp.sign(contract.id);
    await expect(acp.execute(contract.id)).resolves.toMatchObject({ id: contract.id, status: 'executed' });

    const governance = new GovernanceModule();
    const credential = await governance.issueCredential({
      id: bob.id,
      claim: `completed ${researchSkill.skillId}`,
      evidence: { contractId: contract.id, memoryShardId: shard.id },
    });
    await expect(governance.verifyCredential(credential)).resolves.toBe(true);
    expect(governance.queryPoSE(bob.id).did).toBe(bob.id);

    const spaces = new SpaceModule();
    const space = spaces.create(alice.id, 'Simulation Ops', 'Full stack test space', {
      visibility: 'public',
      minPoSEScore: 1,
      tags: ['simulation', 'agent-cooperation'],
    });
    expect(spaces.join(space.id, bob.id, 88).members).toHaveLength(2);
    expect(() => spaces.join(space.id, 'did:nexus:low-score', 0)).toThrow('Insufficient PoSE score');

    const dao = new DAOModule();
    const proposal = dao.propose(alice.id, 'Promote research skill', 'Feature high quality skill', [], {
      quorum: 1,
      threshold: 50,
      durationHours: 1,
    });
    dao.vote(proposal.id, bob.id, 'for', 88);
    expect(dao.getProposal(proposal.id)?.votesFor).toBe(88);

    const settlement = new SettlementModule(config, join(home, 'settlement-ledger.json'));
    await settlement.send(bob.id, '0.25', contract.id);
    expect(await settlement.getBalance('USDC', bob.id)).toBe('0.250000 USDC');
    const channel = await settlement.createNanopaymentChannel(bob.id, '1.00', 1);
    const transfer = await settlement.signNanopayment(channel.channelId, '0.10', 1);
    await expect(settlement.receiveNanopayment(transfer)).resolves.toMatchObject({ valid: true, totalReceived: '0.100000' });
    await expect(settlement.sendMultiCurrency(bob.id, '10', 'CNY')).resolves.toMatchObject({ status: 'success' });

    const registry = new SkillRegistry();
    expect(registry.count()).toBe(32);
    expect(registry.findByIntent('create payment channel for micropayment').length).toBeGreaterThan(0);

    const skill = registry.get('nexuslink:nss:invoke')!;
    const openclaw = new OpenClawAdapter();
    const claude = new ClaudeCodeAdapter();
    const codex = new CodexAdapter();
    await Promise.all([
      openclaw.registerSkill(skill),
      claude.registerSkill(skill),
      codex.registerSkill(skill),
    ]);
    expect(openclaw.parseInvocation({ action: skill.skill, parameters: { skillId: researchSkill.skillId } }).skillId).toBe(skill.skill);
    expect(claude.exportAsTools().some(tool => tool.name === 'nss_invoke')).toBe(true);
    expect(claude.parseInvocation({ name: 'nss_invoke', input: { skillId: researchSkill.skillId } }).skillId).toBe(skill.skill);
    expect(codex.formatResult({ success: true, data: { skillId: skill.skill }, message: 'ok' })).toMatchObject({ ok: true });

    const executor = new SkillExecutor();
    const invokeViaSkill = await executor.execute({
      skillId: 'nexuslink:nss:invoke',
      params: { skillId: researchSkill.skillId, input: { topic: 'simulation' } },
      context: { callerDid: alice.id },
    });
    expect(invokeViaSkill.success).toBe(true);
    expect(invokeViaSkill.data.skillId).toBe(researchSkill.skillId);

    const compositionId = 'simulation-workflow';
    const composer = new SkillComposer();
    const validation = composer.register({
      id: compositionId,
      name: 'Simulated cooperation workflow',
      description: 'Discover, invoke, pay, and record cooperation',
      steps: [
        { skillId: 'nexuslink:nss:discover', params: { intent: 'market' } },
        { skillId: 'nexuslink:nss:invoke', params: { skillId: researchSkill.skillId }, dependsOn: ['nexuslink:nss:discover'] },
        { skillId: 'nexuslink:pay:send', params: { to: bob.id, amount: '0.05' }, dependsOn: ['nexuslink:nss:invoke'] },
        { skillId: 'nexuslink:credential:issue', params: { subjectDid: bob.id, claim: 'workflow completed' }, dependsOn: ['nexuslink:pay:send'] },
      ],
    });
    expect(validation.valid).toBe(true);
    const composition = await composer.execute(compositionId, async (skillId, params) => {
      const result = await executor.execute({ skillId, params, context: { callerDid: alice.id } });
      if (!result.success) throw new Error(result.message);
      return result.data;
    });
    expect(composition.success).toBe(true);
    expect(Object.keys(composition.stepResults)).toEqual([
      'nexuslink:nss:discover',
      'nexuslink:nss:invoke',
      'nexuslink:pay:send',
      'nexuslink:credential:issue',
    ]);
  });
});
