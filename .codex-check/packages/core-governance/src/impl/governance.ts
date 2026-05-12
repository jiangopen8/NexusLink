import { PoSEModule } from './pose.js';
import { CredentialModule } from './credential.js';
import type { PoSEScore, VerifiableCredential, CredentialSubject } from '../types.js';

export class GovernanceModule {
  private pose = new PoSEModule();
  private cred = new CredentialModule();

  queryPoSE(did: string): PoSEScore {
    return this.pose.buildScore(did);
  }

  issueCredential(subject: CredentialSubject): Promise<VerifiableCredential> {
    return this.cred.issue(subject);
  }

  verifyCredential(vc: VerifiableCredential): Promise<boolean> {
    return this.cred.verify(vc);
  }
}
