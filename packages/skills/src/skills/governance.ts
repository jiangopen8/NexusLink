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

  // Phase 2: DAO governance skills
  'nexuslink:dao:propose': {
    skill: 'nexuslink:dao:propose',
    version: '1.0.0',
    name: 'Create DAO Proposal',
    description: 'Create a DAO governance proposal for community voting',
    intent: { triggerPatterns: ['create proposal', 'dao proposal', 'governance vote', '创建提案', 'DAO投票'], category: 'governance' },
    parameters: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        quorum: { type: 'number', default: 10 },
        threshold: { type: 'number', default: 51 },
        durationHours: { type: 'number', default: 72 },
      },
      required: ['title', 'description'],
    },
    returns: {
      type: 'object',
      properties: {
        proposalId: { type: 'string' },
        endTime: { type: 'string' },
      },
    },
    examples: [{
      input: { title: 'Upgrade fee model', description: 'Reduce fees by 20%', durationHours: 48 },
      output: { proposalId: 'dao-123', endTime: '2025-01-03T00:00:00Z' },
    }],
  },

  'nexuslink:dao:vote': {
    skill: 'nexuslink:dao:vote',
    version: '1.0.0',
    name: 'Vote on DAO Proposal',
    description: 'Cast a PoSE-weighted vote on an active DAO proposal',
    intent: { triggerPatterns: ['vote on proposal', 'cast vote', '投票', '提案投票'], category: 'governance' },
    parameters: {
      type: 'object',
      properties: {
        proposalId: { type: 'string' },
        choice: { type: 'string', enum: ['for', 'against', 'abstain'] },
      },
      required: ['proposalId', 'choice'],
    },
    returns: {
      type: 'object',
      properties: {
        weight: { type: 'number' },
        currentTally: { type: 'object' },
      },
    },
  },
};

