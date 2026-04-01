import type { SkillDescriptor } from '../types.js';

export const GOVERNANCE_SKILLS: Record<string, SkillDescriptor> = {
  'nexuslink:pose:query': {
    skill: 'nexuslink:pose:query',
    version: '1.0.0',
    name: 'Query PoSE Score',
    description: 'Query the PoSE reputation score for an agent DID',
    intent: { triggerPatterns: ['check reputation', '查信誉', 'query pose', '查信誉分'], category: 'governance' },
    parameters: { type: 'object', properties: { did: { type: 'string' } }, required: ['did'] },
    returns: { type: 'object', properties: { did: { type: 'string' }, score: { type: 'number' }, contributionUsdc: { type: 'number' } } },
  },
  'nexuslink:credential:issue': {
    skill: 'nexuslink:credential:issue',
    version: '1.0.0',
    name: 'Issue W3C VC Credential',
    description: 'Issue a W3C Verifiable Credential for an agent',
    intent: { triggerPatterns: ['issue credential', '签发凭证'], category: 'governance' },
    parameters: { type: 'object', properties: { subjectDid: { type: 'string' }, claim: { type: 'string' }, evidence: { type: 'object' } }, required: ['subjectDid', 'claim'] },
    returns: { type: 'object', properties: { vc: { type: 'object' } } },
  },
  'nexuslink:credential:verify': {
    skill: 'nexuslink:credential:verify',
    version: '1.0.0',
    name: 'Verify W3C VC Credential',
    description: 'Verify a W3C Verifiable Credential',
    intent: { triggerPatterns: ['verify credential', '验证凭证'], category: 'governance' },
    parameters: { type: 'object', properties: { vc: { type: 'object' } }, required: ['vc'] },
    returns: { type: 'object', properties: { valid: { type: 'boolean' } } },
  },
};
