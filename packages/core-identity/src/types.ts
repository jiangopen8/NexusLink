export interface IntentBoundary {
  allowedDomains: string[];
  maxValueUsdc: number;
  selfSigned: boolean;
}

export interface DIDDocument {
  id: string;
  type: 'AssistantAgent' | 'ToolAgent' | 'Human';
  owner?: string;
  skills: string[];
  languages: string[];
  ipfsHash?: string;
  intentBoundary?: IntentBoundary;
  createdAt?: string;
  updatedAt?: string;
  deactivated?: boolean;
}

export interface DIDRegisterOptions {
  type: 'AssistantAgent' | 'ToolAgent' | 'Human';
  skills?: string[];
  languages?: string[];
  ownerDid?: string;
}

export interface DIDPatch {
  skills?: string[];
  languages?: string[];
  intentBoundary?: IntentBoundary;
}
