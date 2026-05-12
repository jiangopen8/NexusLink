import type { SkillDescriptor } from '../types.js';

export const ANALYTICS_SKILLS: Record<string, SkillDescriptor> = {
  'nexuslink:analytics:pose': {
    skill: 'nexuslink:analytics:pose',
    version: '1.0.0',
    name: 'Analyze PoSE Score',
    description: 'Calculate and analyze PoSE (Proof-of-Skill-Execution) reputation score',
    intent: {
      triggerPatterns: [
        'calculate pose score', 'reputation score', 'skill execution proof',
        'PoSE分析', '信誉评分', '技能执行证明',
      ],
      category: 'analytics',
    },
    parameters: {
      type: 'object',
      properties: {
        contributionUsdc: { type: 'number', description: 'Total USDC contributed' },
        successRate: { type: 'number', description: 'Skill execution success rate (0-100)' },
        skillDiversity: { type: 'number', description: 'Number of unique skills executed' },
      },
      required: ['contributionUsdc', 'successRate', 'skillDiversity'],
    },
    returns: {
      type: 'object',
      properties: {
        poseScore: { type: 'number', description: 'Final PoSE score (0-100)' },
        breakdown: {
          type: 'object',
          properties: {
            contributionScore: { type: 'number' },
            executionScore: { type: 'number' },
            diversityBonus: { type: 'number' },
          },
        },
      },
    },
    examples: [{
      input: { contributionUsdc: 230, successRate: 93.6, skillDiversity: 2.1 },
      output: { poseScore: 84, breakdown: { contributionScore: 50, executionScore: 34, diversityBonus: 0 } },
    }],
  },
};
