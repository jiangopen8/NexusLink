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
