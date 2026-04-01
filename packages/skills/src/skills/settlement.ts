import type { SkillDescriptor } from '../types.js';

export const SETTLEMENT_SKILLS: Record<string, SkillDescriptor> = {
  'nexuslink:pay:send': {
    skill: 'nexuslink:pay:send',
    version: '1.0.0',
    name: 'Send USDC Payment',
    description: 'Send a USDC payment to another agent on Arbitrum',
    intent: { triggerPatterns: ['pay agent', 'send payment', '支付'], category: 'settlement' },
    parameters: {
      type: 'object',
      properties: { to: { type: 'string' }, amount: { type: 'string' }, contractId: { type: 'string' } },
      required: ['to', 'amount'],
    },
    returns: { type: 'object', properties: { txHash: { type: 'string' } } },
  },
  'nexuslink:pay:balance': {
    skill: 'nexuslink:pay:balance',
    version: '1.0.0',
    name: 'Query USDC Balance',
    description: 'Query USDC balance for an account',
    intent: { triggerPatterns: ['check balance', '查余额'], category: 'settlement' },
    parameters: { type: 'object', properties: { account: { type: 'string' } } },
    returns: { type: 'object', properties: { balance: { type: 'string' } } },
  },
};
