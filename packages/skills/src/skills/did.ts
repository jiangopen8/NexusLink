import type { SkillDescriptor } from '../types.js';

export const DID_SKILLS: Record<string, SkillDescriptor> = {
  'nexuslink:did:register': {
    skill: 'nexuslink:did:register',
    version: '1.0.0',
    name: 'Register Agent DID',
    description: 'Register a W3C DID-compliant decentralized identity for an AI Agent',
    intent: { triggerPatterns: ['register a new agent identity', 'create DID for agent', '注册智能体身份', '创建 Agent DID'], category: 'identity' },
    parameters: {
      type: 'object',
      properties: {
        agentType: { type: 'string', enum: ['assistant', 'tool'] },
        skills: { type: 'array', items: { type: 'string' } },
        languages: { type: 'array', items: { type: 'string' } },
      },
      required: ['agentType'],
    },
    returns: { type: 'object', properties: { did: { type: 'string' }, txHash: { type: 'string' } } },
    examples: [{ input: { agentType: 'assistant', skills: ['analysis'] }, output: { did: 'did:nexus:0x...', txHash: '0x...' } }],
  },
  'nexuslink:did:resolve': {
    skill: 'nexuslink:did:resolve',
    version: '1.0.0',
    name: 'Resolve DID Document',
    description: 'Resolve a DID to retrieve its document',
    intent: { triggerPatterns: ['resolve DID', 'lookup agent', '查询DID'], category: 'identity' },
    parameters: { type: 'object', properties: { did: { type: 'string' } }, required: ['did'] },
    returns: { type: 'object', properties: { id: { type: 'string' }, type: { type: 'string' }, owner: { type: 'string' } } },
  },
  'nexuslink:did:deactivate': {
    skill: 'nexuslink:did:deactivate',
    version: '1.0.0',
    name: 'Deactivate DID',
    description: 'Deactivate a previously registered DID',
    intent: { triggerPatterns: ['deactivate DID', '注销身份'], category: 'identity' },
    parameters: { type: 'object', properties: { did: { type: 'string' } }, required: ['did'] },
    returns: { type: 'object', properties: {} },
  },
};
