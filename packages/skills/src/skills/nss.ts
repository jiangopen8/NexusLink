import type { SkillDescriptor } from '../types.js';

export const NSS_SKILLS: Record<string, SkillDescriptor> = {
  'nexuslink:nss:publish': {
    skill: 'nexuslink:nss:publish',
    version: '1.0.0',
    name: 'Publish NSS Skill',
    description: 'Publish a skill to the NSS registry on-chain',
    intent: { triggerPatterns: ['publish skill', '发布技能'], category: 'skills' },
    parameters: {
      type: 'object',
      properties: {
        skillId: { type: 'string' }, name: { type: 'string' }, description: { type: 'string' },
        version: { type: 'string' }, publisherDid: { type: 'string' }, priceUsdc: { type: 'string' }, tags: { type: 'array', items: { type: 'string' } },
      },
      required: ['skillId', 'name', 'publisherDid'],
    },
    returns: { type: 'object', properties: { skillId: { type: 'string' }, txHash: { type: 'string' } } },
  },
  'nexuslink:nss:invoke': {
    skill: 'nexuslink:nss:invoke',
    version: '1.0.0',
    name: 'Invoke NSS Skill',
    description: 'Invoke a published skill',
    intent: { triggerPatterns: ['invoke skill', 'use skill', '调用技能'], category: 'skills' },
    parameters: { type: 'object', properties: { skillId: { type: 'string' }, input: { type: 'object' } }, required: ['skillId'] },
    returns: { type: 'object', properties: { success: { type: 'boolean' }, data: { type: 'object' }, message: { type: 'string' } } },
  },
  'nexuslink:nss:discover': {
    skill: 'nexuslink:nss:discover',
    version: '1.0.0',
    name: 'Discover NSS Skills',
    description: 'Discover skills by intent or tags',
    intent: { triggerPatterns: ['discover skills', 'find skill', '发现技能'], category: 'skills' },
    parameters: { type: 'object', properties: { intent: { type: 'string' }, minPose: { type: 'number' }, maxPrice: { type: 'string' } } },
    returns: { type: 'object', properties: { skills: { type: 'array' } } },
  },
};
