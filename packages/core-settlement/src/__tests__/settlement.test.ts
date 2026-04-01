import { describe, it, expect, beforeEach } from 'vitest';
import { SettlementModule } from '../impl/settlement.js';
import { ConfigStore } from '@nexuslink/core-config';

// Deterministic test private key (not a real key)
const TEST_PK = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

describe('SettlementModule - on-chain (requires testnet)', () => {
  it('placeholder - send/balance require SETTLEMENT_ADDRESS and testnet', () => {
    // Covered via integration tests against Arbitrum Sepolia
  });
});

describe('SettlementModule - Nanopayments', () => {
  let settlement: SettlementModule;

  beforeEach(() => {
    process.env.PRIVATE_KEY = TEST_PK;
    settlement = new SettlementModule(new ConfigStore());
  });

  it('creates a nanopayment channel', async () => {
    const ch = await settlement.createNanopaymentChannel('0xRecipient', '10.00', 24);
    expect(ch.channelId).toMatch(/^nano-/);
    expect(ch.totalDeposit).toBe('10.00');
    expect(ch.withdrawn).toBe('0');
    expect(new Date(ch.expiresAt) > new Date()).toBe(true);
  });

  it('retrieves channel by ID', async () => {
    const ch = await settlement.createNanopaymentChannel('0xR', '5.00');
    expect(settlement.getNanopaymentChannel(ch.channelId)).toBeDefined();
  });

  it('lists channels by address', async () => {
    const ch = await settlement.createNanopaymentChannel('0xR', '1.00');
    const list = settlement.listNanopaymentChannels(ch.sender);
    expect(list.some(c => c.channelId === ch.channelId)).toBe(true);
  });

  it('signs a nanopayment transfer', async () => {
    const ch = await settlement.createNanopaymentChannel('0xR', '5.00');
    const t = await settlement.signNanopayment(ch.channelId, '0.01', 1);
    expect(t.sequence).toBe(1);
    expect(t.signature).toMatch(/^0x/);
  });

  it('receives and accumulates transfers', async () => {
    const ch = await settlement.createNanopaymentChannel('0xR', '5.00');
    const t1 = await settlement.signNanopayment(ch.channelId, '0.05', 1);
    const t2 = await settlement.signNanopayment(ch.channelId, '0.10', 2);
    await settlement.receiveNanopayment(t1);
    const r2 = await settlement.receiveNanopayment(t2);
    expect(parseFloat(r2.totalReceived)).toBeCloseTo(0.15);
  });

  it('rejects out-of-sequence transfers', async () => {
    const ch = await settlement.createNanopaymentChannel('0xR', '5.00');
    const t1 = await settlement.signNanopayment(ch.channelId, '0.01', 1);
    await settlement.receiveNanopayment(t1);
    const t3 = await settlement.signNanopayment(ch.channelId, '0.01', 3);
    await expect(settlement.receiveNanopayment(t3)).rejects.toThrow('Invalid sequence');
  });

  it('closes channel and returns withdrawn amount', async () => {
    const ch = await settlement.createNanopaymentChannel('0xR', '5.00');
    const t1 = await settlement.signNanopayment(ch.channelId, '0.10', 1);
    await settlement.receiveNanopayment(t1);
    const result = await settlement.closeNanopaymentChannel(ch.channelId);
    expect(parseFloat(result.withdrawn)).toBeCloseTo(0.10);
    expect(settlement.getNanopaymentChannel(ch.channelId)).toBeUndefined();
  });

  it('throws when signing for unknown channel', async () => {
    await expect(settlement.signNanopayment('bad-id', '0.01', 1)).rejects.toThrow('not found');
  });
});

describe('SettlementModule - Multi-currency', () => {
  let settlement: SettlementModule;

  beforeEach(() => {
    process.env.PRIVATE_KEY = TEST_PK;
    settlement = new SettlementModule(new ConfigStore());
  });

  it('returns roughly reciprocal exchange rates', async () => {
    const rate = await settlement.getExchangeRate();
    expect(rate.usdToCny).toBeGreaterThan(1);
    expect(rate.cnyToUsd).toBeGreaterThan(0);
    expect(Math.abs(rate.usdToCny * rate.cnyToUsd - 1)).toBeLessThan(0.01);
  });

  it('sendMultiCurrency CNY returns reference (not txHash)', async () => {
    const result = await settlement.sendMultiCurrency('0xReceiver', '100', 'CNY');
    expect(result.reference).toBeDefined();
    expect(result.txHash).toBeUndefined();
  });

  it('getBalance CNY returns placeholder string with CNY', async () => {
    const bal = await settlement.getBalance('CNY');
    expect(bal).toContain('CNY');
  });
});
