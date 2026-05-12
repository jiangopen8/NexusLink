import type { SkillDescriptor } from '../types.js';

export const COLLABORATION_SKILLS: Record<string, SkillDescriptor> = {
  'nexuslink:space:create': {
    skill: 'nexuslink:space:create',
    version: '1.0.0',
    name: 'Create Collaboration Space',
    description: 'Create a collaboration space for agent coordination',
    intent: { triggerPatterns: ['create space', 'create collaboration', 'new workspace', '创建协作空间'], category: 'collaboration' },
    parameters: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        visibility: { type: 'string', enum: ['public', 'private', 'invite-only'] },
        minPoSEScore: { type: 'number' },
        tags: { type: 'array', items: { type: 'string' } },
      },
      required: ['name'],
    },
    returns: { type: 'object', properties: { spaceId: { type: 'string' }, name: { type: 'string' } } },
    examples: [{ input: { name: 'AI Lab', visibility: 'public' }, output: { spaceId: 'space-123', name: 'AI Lab' } }],
  },

  'nexuslink:space:join': {
    skill: 'nexuslink:space:join',
    version: '1.0.0',
    name: 'Join Collaboration Space',
    description: 'Join an existing public collaboration space',
    intent: { triggerPatterns: ['join space', 'join collaboration', '加入协作空间'], category: 'collaboration' },
    parameters: {
      type: 'object',
      properties: {
        spaceId: { type: 'string' },
      },
      required: ['spaceId'],
    },
    returns: { type: 'object', properties: { success: { type: 'boolean' }, memberCount: { type: 'number' } } },
  },

  'nexuslink:acp:compose': {
    skill: 'nexuslink:acp:compose',
    version: '1.0.0',
    name: 'Compose Skill Workflow',
    description: 'Create and execute a multi-skill composition workflow',
    intent: { triggerPatterns: ['compose skills', 'chain skills', 'skill workflow', '技能编排', '组合技能'], category: 'orchestration' },
    parameters: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        steps: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              skillId: { type: 'string' },
              params: { type: 'object' },
              dependsOn: { type: 'array', items: { type: 'string' } },
            },
            required: ['skillId'],
          },
        },
      },
      required: ['name', 'steps'],
    },
    returns: {
      type: 'object',
      properties: {
        compositionId: { type: 'string' },
        success: { type: 'boolean' },
        durationMs: { type: 'number' },
      },
    },
    examples: [{
      input: {
        name: 'Register and verify agent',
        steps: [
          { skillId: 'nexuslink:did:register', params: { agentType: 'assistant' } },
          { skillId: 'nexuslink:pose:record', params: {}, dependsOn: ['nexuslink:did:register'] },
        ],
      },
      output: { compositionId: 'comp-abc', success: true, durationMs: 450 },
    }],
  },
};
