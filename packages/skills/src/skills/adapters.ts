import type { SkillDescriptor } from '../types.js';

/**
 * Claude Code Adapter & Codex Adapter skills
 * These allow NexusLink agents to invoke AI coding assistants as skills.
 */
export const ADAPTER_SKILLS: Record<string, SkillDescriptor> = {
  'nexuslink:adapter:claude-code': {
    skill: 'nexuslink:adapter:claude-code',
    version: '1.0.0',
    name: 'Claude Code Adapter',
    description: 'Invoke Claude Code AI assistant for code generation, review, and debugging tasks',
    intent: {
      triggerPatterns: [
        'generate code', 'write code', 'review code', 'debug code', 'refactor',
        '生成代码', '代码审查', '调试代码', 'claude code',
      ],
      category: 'ai-coding',
    },
    parameters: {
      type: 'object',
      properties: {
        task: { type: 'string', description: 'Description of the coding task' },
        language: { type: 'string', description: 'Programming language (optional)' },
        context: { type: 'string', description: 'Additional code context' },
        maxTokens: { type: 'number', description: 'Maximum response tokens', default: 4096 },
        model: {
          type: 'string',
          enum: ['claude-opus-4-6', 'claude-sonnet-4-6', 'claude-haiku-4-5'],
          default: 'claude-sonnet-4-6',
        },
      },
      required: ['task'],
    },
    returns: {
      type: 'object',
      properties: {
        code: { type: 'string', description: 'Generated or reviewed code' },
        explanation: { type: 'string' },
        suggestions: { type: 'array', items: { type: 'string' } },
        model: { type: 'string' },
        tokensUsed: { type: 'number' },
      },
    },
    examples: [{
      input: { task: 'Write a TypeScript function to validate an Ethereum address', language: 'typescript' },
      output: { code: 'function isValidAddress(addr: string): boolean { ... }', explanation: '...', tokensUsed: 320 },
    }],
  },

  'nexuslink:adapter:codex': {
    skill: 'nexuslink:adapter:codex',
    version: '1.0.0',
    name: 'OpenAI Codex Adapter',
    description: 'Invoke OpenAI Codex (GPT-4o) for code completion and generation tasks',
    intent: {
      triggerPatterns: [
        'codex', 'gpt code', 'openai code', 'complete code', 'code completion',
        'openai coding', '代码补全',
      ],
      category: 'ai-coding',
    },
    parameters: {
      type: 'object',
      properties: {
        prompt: { type: 'string', description: 'Code generation prompt' },
        language: { type: 'string' },
        temperature: { type: 'number', minimum: 0, maximum: 2, default: 0.2 },
        maxTokens: { type: 'number', default: 2048 },
        model: {
          type: 'string',
          enum: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo'],
          default: 'gpt-4o',
        },
      },
      required: ['prompt'],
    },
    returns: {
      type: 'object',
      properties: {
        code: { type: 'string' },
        finishReason: { type: 'string', enum: ['stop', 'length', 'content_filter'] },
        tokensUsed: { type: 'number' },
        model: { type: 'string' },
      },
    },
    examples: [{
      input: { prompt: 'Complete this Solidity contract for USDC payments', language: 'solidity' },
      output: { code: 'contract USDCPayment { ... }', finishReason: 'stop', tokensUsed: 800 },
    }],
  },

  'nexuslink:adapter:search': {
    skill: 'nexuslink:adapter:search',
    version: '1.0.0',
    name: 'Web Search Adapter',
    description: 'Search the web for current information to augment agent knowledge',
    intent: {
      triggerPatterns: ['search web', 'find information', 'look up', '搜索', '查询资料'],
      category: 'information',
    },
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string' },
        numResults: { type: 'number', default: 5 },
        language: { type: 'string', default: 'en' },
      },
      required: ['query'],
    },
    returns: {
      type: 'object',
      properties: {
        results: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              url: { type: 'string' },
              snippet: { type: 'string' },
            },
          },
        },
        totalFound: { type: 'number' },
      },
    },
    examples: [{
      input: { query: 'Arbitrum Layer 2 gas fees 2025', numResults: 3 },
      output: { results: [{ title: 'Arbitrum Gas Guide', url: 'https://...', snippet: '...' }], totalFound: 3 },
    }],
  },
};
