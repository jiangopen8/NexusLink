import type { SkillDescriptor } from '../types.js';

export const CONTRACT_SKILLS: Record<string, SkillDescriptor> = {
  'nexuslink:contract:propose': {
    skill: 'nexuslink:contract:propose',
    version: '1.0.0',
    name: 'Propose Cooperation Contract',
    description: 'Create an ACP/X402 cooperation contract proposal',
    intent: { triggerPatterns: ['propose contract', 'create contract', 'cooperation contract'], category: 'contract' },
    parameters: { type: 'object', properties: { to: { type: 'string' }, template: { type: 'string' }, terms: { type: 'object' } }, required: ['to', 'template'] },
    returns: { type: 'object', properties: { id: { type: 'string' }, status: { type: 'string' } } },
  },
  'nexuslink:contract:sign': {
    skill: 'nexuslink:contract:sign',
    version: '1.0.0',
    name: 'Sign Cooperation Contract',
    description: 'Sign an existing cooperation contract',
    intent: { triggerPatterns: ['sign contract', 'approve contract'], category: 'contract' },
    parameters: { type: 'object', properties: { contractId: { type: 'string' } }, required: ['contractId'] },
    returns: { type: 'object', properties: { id: { type: 'string' }, status: { type: 'string' } } },
  },
  'nexuslink:contract:execute': {
    skill: 'nexuslink:contract:execute',
    version: '1.0.0',
    name: 'Execute Cooperation Contract',
    description: 'Execute a signed cooperation contract',
    intent: { triggerPatterns: ['execute contract', 'run contract'], category: 'contract' },
    parameters: { type: 'object', properties: { contractId: { type: 'string' } }, required: ['contractId'] },
    returns: { type: 'object', properties: { success: { type: 'boolean' } } },
  },
};
