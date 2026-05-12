import type { SkillDescriptor } from '../types.js';

export const NANOPAYMENT_SKILLS: Record<string, SkillDescriptor> = {
  'nexuslink:pay:nano:create': {
    skill: 'nexuslink:pay:nano:create',
    version: '1.0.0',
    name: 'Create Nanopayment Channel',
    description: 'Open an off-chain micropayment channel for high-frequency microtransactions',
    intent: { triggerPatterns: ['create payment channel', 'nano payment', 'micropayment', '创建支付通道', '微支付'], category: 'payment' },
    parameters: {
      type: 'object',
      properties: {
        receiver: { type: 'string', description: 'Receiver Ethereum address' },
        totalDeposit: { type: 'string', description: 'Total USDC deposit for channel' },
        durationHours: { type: 'number', default: 24 },
      },
      required: ['receiver', 'totalDeposit'],
    },
    returns: {
      type: 'object',
      properties: {
        channelId: { type: 'string' },
        expiresAt: { type: 'string' },
      },
    },
    examples: [{ input: { receiver: '0xABC...', totalDeposit: '10.00' }, output: { channelId: 'nano-123', expiresAt: '2025-01-01T00:00:00Z' } }],
  },

  'nexuslink:pay:nano:send': {
    skill: 'nexuslink:pay:nano:send',
    version: '1.0.0',
    name: 'Send Nanopayment',
    description: 'Sign and transmit a nanopayment transfer through an existing channel',
    intent: { triggerPatterns: ['send nano', 'micropayment transfer', '发送微支付', '支付微额'], category: 'payment' },
    parameters: {
      type: 'object',
      properties: {
        channelId: { type: 'string' },
        amount: { type: 'string', description: 'USDC amount to transfer' },
        sequence: { type: 'number' },
      },
      required: ['channelId', 'amount', 'sequence'],
    },
    returns: {
      type: 'object',
      properties: {
        signature: { type: 'string' },
        totalSent: { type: 'string' },
      },
    },
  },

  'nexuslink:pay:ecny': {
    skill: 'nexuslink:pay:ecny',
    version: '1.0.0',
    name: 'e-CNY Payment',
    description: 'Send payment in digital Chinese Yuan (e-CNY/DCEP)',
    intent: { triggerPatterns: ['pay with ecny', 'digital yuan', 'e-cny payment', '数字人民币支付', '数字元支付'], category: 'payment' },
    parameters: {
      type: 'object',
      properties: {
        to: { type: 'string' },
        amount: { type: 'string', description: 'Amount in CNY' },
        contractId: { type: 'string' },
      },
      required: ['to', 'amount'],
    },
    returns: {
      type: 'object',
      properties: {
        reference: { type: 'string', description: 'e-CNY transaction reference' },
        status: { type: 'string', enum: ['pending', 'success', 'failed'] },
      },
    },
    examples: [{ input: { to: '0xRec...', amount: '100' }, output: { reference: 'ecny-ref-xyz', status: 'pending' } }],
  },
};
