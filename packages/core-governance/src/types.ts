export interface PoSEScore {
  did: string;
  score: number;
  contributionUsdc: number;
  successRate: number;
  disputeRate: number;
  totalTasks: number;
  calculatedAt: string;
}

export interface VerifiableCredential {
  '@context': string[];
  type: string[];
  issuer: string;
  issuanceDate: string;
  credentialSubject: Record<string, unknown>;
  proof?: unknown;
}

export interface CredentialSubject {
  id: string;
  claim: string;
  evidence?: unknown;
}
