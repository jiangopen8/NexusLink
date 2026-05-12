import { describe, it, expect } from 'vitest';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { ACPModule, LocalACPTransport } from '../impl/acp.js';

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
    expect(result.id).toBe(p.id);
    expect(result.status).toBe('executed');
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

  it('sends, listens, marks delivery, and pings via local transport', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'nexuslink-acp-'));
    const acp = new ACPModule(new LocalACPTransport(join(dir, 'acp.json')));
    await acp.heartbeat('did:nexus:bob');
    expect((await acp.ping('did:nexus:bob')).reachable).toBe(true);
    const sent = await acp.send('did:nexus:bob', 'hello', 'did:nexus:alice');
    expect(sent.id).toMatch(/^msg-/);
    const inbox = await acp.listen('did:nexus:bob');
    expect(inbox).toHaveLength(1);
    expect(await acp.listen('did:nexus:bob')).toHaveLength(0);
  });
});
