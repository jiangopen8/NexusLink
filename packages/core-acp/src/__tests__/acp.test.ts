import { describe, it, expect } from 'vitest';
import { ACPModule } from '../impl/acp.js';

describe('ACPModule', () => {
  const acp = new ACPModule();

  it('proposes a contract', async () => {
    const p = await acp.propose('did:nexus:0xTO', 'instant', { amount: '10 USDC' });
    expect(p.status).toBe('proposed');
    expect(p.id).toMatch(/^contract-/);
  });

  it('signs a contract', async () => {
    const p = await acp.propose('did:nexus:0xTO', 'milestone', {});
    const signed = await acp.sign(p.id);
    expect(signed.status).toBe('signed');
  });

  it('executes a signed contract', async () => {
    const p = await acp.propose('did:nexus:0xTO', 'instant', {});
    await acp.sign(p.id);
    const result = await acp.execute(p.id);
    expect(result.success).toBe(true);
  });

  it('rejects execution of unsigned contract', async () => {
    const p = await acp.propose('did:nexus:0xTO', 'instant', {});
    await expect(acp.execute(p.id)).rejects.toThrow('must be signed');
  });

  it('returns contract status', async () => {
    const p = await acp.propose('did:nexus:0xTO', 'subscription', {});
    const status = await acp.status(p.id);
    expect(status?.id).toBe(p.id);
    expect(status?.status).toBe('proposed');
  });
});
