import type { VerifiableCredential, CredentialSubject } from '../types.js';

export class CredentialModule {
  async issue(subject: CredentialSubject): Promise<VerifiableCredential> {
    return {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential', 'NexusContributionCredential'],
      issuer: subject.id,
      issuanceDate: new Date().toISOString(),
      credentialSubject: { id: subject.id, claim: subject.claim, evidence: subject.evidence },
    };
  }

  async verify(vc: VerifiableCredential): Promise<boolean> {
    return !!(
      vc['@context'] && Array.isArray(vc['@context']) &&
      vc.type && Array.isArray(vc.type) &&
      vc.issuer && vc.credentialSubject && vc.issuanceDate
    );
  }
}
