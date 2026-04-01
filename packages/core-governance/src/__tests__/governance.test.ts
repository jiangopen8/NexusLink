import { describe, it, expect } from 'vitest';
import { GovernanceModule } from '../impl/governance.js';
import { PoSEModule } from '../impl/pose.js';
import { CredentialModule } from '../impl/credential.js';

describe('PoSEModule', () => {
  it('calculates score correctly', () => {
    const pose = new PoSEModule();
    const score = pose.calculateScore(230, 93.6, 2.1);
    expect(score).toBeGreaterThan(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  it('caps score at 100', () => {
    const pose = new PoSEModule();
    expect(pose.calculateScore(10000, 100, 0)).toBe(100);
  });

  it('floors score at 0', () => {
    const pose = new PoSEModule();
    expect(pose.calculateScore(0, 0, 100)).toBe(0);
  });
});

describe('CredentialModule', () => {
  it('issues valid W3C VC', async () => {
    const cred = new CredentialModule();
    const vc = await cred.issue({ id: 'did:nexus:0x123', claim: 'great work' });
    expect(vc['@context']).toContain('https://www.w3.org/2018/credentials/v1');
    expect(vc.type).toContain('VerifiableCredential');
    expect(vc.issuer).toBe('did:nexus:0x123');
  });

  it('verifies well-formed VC', async () => {
    const cred = new CredentialModule();
    const vc = await cred.issue({ id: 'did:nexus:0xABC', claim: 'great work' });
    expect(await cred.verify(vc)).toBe(true);
  });

  it('rejects malformed VC', async () => {
    const cred = new CredentialModule();
    const malformedVC = {
      '@context': [],
      type: [],
      issuer: '',
      credentialSubject: {},
      issuanceDate: new Date().toISOString(),
    } as any;
    expect(await cred.verify(malformedVC)).toBe(false);
  });
});

describe('GovernanceModule', () => {
  it('queryPoSE returns score', () => {
    const gov = new GovernanceModule();
    const score = gov.queryPoSE('did:nexus:0xTEST');
    expect(score.did).toBe('did:nexus:0xTEST');
    expect(typeof score.score).toBe('number');
  });
});

// ─── DAOModule ────────────────────────────────────────────────────────────────

import { DAOModule } from '../impl/dao.js';
import { SpaceModule } from '../impl/space.js';

describe('DAOModule', () => {
  const proposer = 'did:nl:proposer';

  function makeDAO() { return new DAOModule(); }

  it('creates proposal with active status', () => {
    const p = makeDAO().propose(proposer, 'Title', 'Desc', []);
    expect(p.status).toBe('active');
    expect(p.proposerDid).toBe(proposer);
  });

  it('tallies votes weighted by PoSE score', () => {
    const dao = makeDAO();
    const p = dao.propose(proposer, 'T', 'D', []);
    dao.vote(p.id, 'did:nl:alice', 'for', 80);
    dao.vote(p.id, 'did:nl:bob', 'against', 40);
    const u = dao.getProposal(p.id)!;
    expect(u.votesFor).toBe(80);
    expect(u.votesAgainst).toBe(40);
  });

  it('gives min weight 1 for zero PoSE', () => {
    const dao = makeDAO();
    const p = dao.propose(proposer, 'T', 'D', []);
    dao.vote(p.id, 'did:nl:z', 'for', 0);
    expect(dao.getProposal(p.id)!.votesFor).toBe(1);
  });

  it('prevents double voting', () => {
    const dao = makeDAO();
    const p = dao.propose(proposer, 'T', 'D', []);
    dao.vote(p.id, 'did:nl:a', 'for', 50);
    expect(() => dao.vote(p.id, 'did:nl:a', 'against', 50)).toThrow('already voted');
  });

  it('finalizes: passes when threshold met', () => {
    const dao = makeDAO();
    const p = dao.propose(proposer, 'T', 'D', [], { durationHours: -1, quorum: 1, threshold: 50 });
    dao.vote(p.id, 'did:nl:a', 'for', 70);
    dao.vote(p.id, 'did:nl:b', 'against', 30);
    expect(dao.finalize(p.id)).toBe('passed');
  });

  it('finalizes: rejected when below quorum', () => {
    const dao = makeDAO();
    const p = dao.propose(proposer, 'T', 'D', [], { durationHours: -1, quorum: 100, threshold: 51 });
    dao.vote(p.id, 'did:nl:a', 'for', 10);
    expect(dao.finalize(p.id)).toBe('rejected');
  });

  it('executes a passed proposal', () => {
    const dao = makeDAO();
    const p = dao.propose(proposer, 'T', 'D', [], { durationHours: -1, quorum: 1, threshold: 50 });
    dao.vote(p.id, 'did:nl:a', 'for', 60);
    dao.finalize(p.id);
    expect(dao.execute(p.id).status).toBe('executed');
  });

  it('prevents executing non-passed proposal', () => {
    const dao = makeDAO();
    const p = dao.propose(proposer, 'T', 'D', []);
    expect(() => dao.execute(p.id)).toThrow('not passed');
  });
});

describe('SpaceModule', () => {
  const owner = 'did:nl:owner';
  const alice = 'did:nl:alice';
  const bob = 'did:nl:bob';

  function makeSpace() { return new SpaceModule(); }

  it('creates public space with owner as member', () => {
    const sm = makeSpace();
    const space = sm.create(owner, 'Lab', 'desc');
    expect(space.ownerDid).toBe(owner);
    expect(space.members[0].role).toBe('owner');
  });

  it('allows joining public space', () => {
    const sm = makeSpace();
    const space = sm.create(owner, 'Open', '');
    const updated = sm.join(space.id, alice, 50);
    expect(updated.members).toHaveLength(2);
  });

  it('blocks joining when PoSE too low', () => {
    const sm = makeSpace();
    const space = sm.create(owner, 'Gated', '', { minPoSEScore: 60 });
    expect(() => sm.join(space.id, alice, 30)).toThrow('Insufficient PoSE');
  });

  it('blocks joining invite-only spaces', () => {
    const sm = makeSpace();
    const space = sm.create(owner, 'Club', '', { visibility: 'invite-only' });
    expect(() => sm.join(space.id, alice, 90)).toThrow('invite-only');
  });

  it('owner can invite to private space', () => {
    const sm = makeSpace();
    const space = sm.create(owner, 'Club', '', { visibility: 'invite-only' });
    const updated = sm.invite(space.id, owner, alice, 70);
    expect(updated.members.some((m: any) => m.did === alice)).toBe(true);
  });

  it('regular members cannot invite', () => {
    const sm = makeSpace();
    const space = sm.create(owner, 'Club', '');
    sm.join(space.id, alice, 50);
    expect(() => sm.invite(space.id, alice, bob, 60)).toThrow('Only admins');
  });

  it('members can leave, owner cannot', () => {
    const sm = makeSpace();
    const space = sm.create(owner, 'Open', '');
    sm.join(space.id, alice, 50);
    sm.leave(space.id, alice);
    expect(sm.get(space.id)!.members).toHaveLength(1);
    expect(() => sm.leave(space.id, owner)).toThrow('Owner cannot leave');
  });

  it('search finds by name and tag', () => {
    const sm = makeSpace();
    sm.create(owner, 'AI Research', '', { tags: ['ai'] });
    sm.create(owner, 'Crypto Defi', '', { tags: ['defi'] });
    expect(sm.search('research')).toHaveLength(1);
    expect(sm.search('ai')).toHaveLength(1);
  });
});
