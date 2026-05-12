import { describe, it, expect } from 'vitest';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { ConfigStore } from '@nexuslink/core-config';
import { NSSModule } from '../impl/nss.js';

describe('NSSModule.validate', () => {
  it('validates complete descriptor', () => {
    const desc = { skillId: 'skill:analysis:v1', name: 'Analysis Skill', version: '1.0.0', publisherDid: 'did:nexus:0x123', tags: ['analysis'], description: 'Test skill' };
    const result = NSSModule.prototype.validate(desc);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('rejects missing required fields', () => {
    const desc = { skillId: '', name: '', version: '', publisherDid: '', tags: [], description: '' };
    const result = NSSModule.prototype.validate(desc);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('skillId is required');
    expect(result.errors).toContain('name is required');
  });

  it('publishes, discovers, and invokes skills locally without chain env', async () => {
    const oldPk = process.env.PRIVATE_KEY;
    const oldRegistry = process.env.NSS_REGISTRY_ADDRESS;
    delete process.env.PRIVATE_KEY;
    delete process.env.NSS_REGISTRY_ADDRESS;
    const dir = mkdtempSync(join(tmpdir(), 'nexuslink-nss-'));
    const nss = new NSSModule(new ConfigStore(join(dir, 'config.yaml')), join(dir, 'nss.json'));
    const descriptor = {
      skillId: 'nss://analysis',
      name: 'Analysis Skill',
      version: '1.0.0',
      publisherDid: 'did:nexus:publisher',
      tags: ['analysis'],
      description: 'financial analysis',
      priceUsdc: '0.1',
    };
    await nss.publish(descriptor);
    expect(await nss.discover('financial')).toHaveLength(1);
    const result = await nss.invoke('nss://analysis', { prompt: 'run' });
    expect(result.success).toBe(true);
    if (oldPk) process.env.PRIVATE_KEY = oldPk;
    if (oldRegistry) process.env.NSS_REGISTRY_ADDRESS = oldRegistry;
  });
});
