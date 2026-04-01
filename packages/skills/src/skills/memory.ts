import type { SkillDescriptor } from '../types.js';

export const MEMORY_SKILLS: Record<string, SkillDescriptor> = {
  'nexuslink:memory:store': {
    skill: 'nexuslink:memory:store',
    version: '1.0.0',
    name: 'Store Memory',
    description: 'Store data in decentralized storage (IPFS or 0G)',
    intent: { triggerPatterns: ['store memory', 'save data', 'upload to storage', '存储记忆', '保存数据'], category: 'memory' },
    parameters: {
      type: 'object',
      properties: {
        data: { type: 'string', description: 'Base64-encoded data to store' },
        encrypt: { type: 'boolean', description: 'Encrypt before storing' },
        tags: { type: 'array', items: { type: 'string' } },
      },
      required: ['data'],
    },
    returns: { type: 'object', properties: { cid: { type: 'string' }, encrypted: { type: 'boolean' } } },
    examples: [{ input: { data: 'SGVsbG8=', encrypt: true }, output: { cid: 'Qm...', encrypted: true } }],
  },

  'nexuslink:memory:retrieve': {
    skill: 'nexuslink:memory:retrieve',
    version: '1.0.0',
    name: 'Retrieve Memory',
    description: 'Retrieve and optionally decrypt data from decentralized storage',
    intent: { triggerPatterns: ['retrieve memory', 'load data', 'fetch from storage', '读取记忆', '获取数据'], category: 'memory' },
    parameters: {
      type: 'object',
      properties: {
        cid: { type: 'string' },
        decrypt: { type: 'boolean' },
      },
      required: ['cid'],
    },
    returns: { type: 'object', properties: { data: { type: 'string' }, size: { type: 'number' } } },
  },

  'nexuslink:memory:delete': {
    skill: 'nexuslink:memory:delete',
    version: '1.0.0',
    name: 'Delete Memory',
    description: 'Unpin/delete data from decentralized storage',
    intent: { triggerPatterns: ['delete memory', 'remove stored data', '删除记忆'], category: 'memory' },
    parameters: {
      type: 'object',
      properties: { cid: { type: 'string' } },
      required: ['cid'],
    },
    returns: { type: 'object', properties: { success: { type: 'boolean' } } },
  },
};
