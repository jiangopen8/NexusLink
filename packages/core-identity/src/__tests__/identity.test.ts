import { describe, it, expect } from 'vitest';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { ConfigStore } from '@nexuslink/core-config';
import { IdentityModule } from '../impl/identity.js';
import type { DIDDocument, DIDRegisterOptions, DIDPatch } from '../types.js';

describe('Identity types', () => {
  it('DIDRegisterOptions accepts valid options', () => {
    const opts: DIDRegisterOptions = {
      type: 'AssistantAgent',
      skills: ['financial-analysis'],
      languages: ['en', 'zh'],
    };
    expect(opts.type).toBe('AssistantAgent');
    expect(opts.skills).toContain('financial-analysis');
  });

  it('DIDDocument has correct structure', () => {
    const doc: DIDDocument = {
      id: 'did:nexus:0x123',
      type: 'AssistantAgent',
      owner: '0x123',
      skills: [],
      languages: [],
      ipfsHash: '0xabc',
    };
    expect(doc.id).toContain('did:nexus');
    expect(['AssistantAgent', 'ToolAgent', 'Human'] as const).toContain(doc.type);
  });

  it('DIDPatch allows partial updates', () => {
    const patch: DIDPatch = {
      skills: ['code-review'],
      languages: ['zh-CN'],
    };
    expect(patch.skills).toContain('code-review');
    expect(patch.languages).toContain('zh-CN');
  });

  it('registers, resolves, updates, and deactivates DID locally without chain env', async () => {
    const oldPk = process.env.PRIVATE_KEY;
    const oldRegistry = process.env.DID_REGISTRY_ADDRESS;
    delete process.env.PRIVATE_KEY;
    delete process.env.DID_REGISTRY_ADDRESS;
    const dir = mkdtempSync(join(tmpdir(), 'nexuslink-did-'));
    const identity = new IdentityModule(new ConfigStore(join(dir, 'config.yaml')), join(dir, 'did.json'));
    const doc = await identity.register({ type: 'AssistantAgent', skills: ['nss'] });
    expect(doc.id).toMatch(/^did:nexus:/);
    expect((await identity.resolve(doc.id)).skills).toContain('nss');
    await identity.update(doc.id, { languages: ['zh-CN'] });
    expect((await identity.resolve(doc.id)).languages).toContain('zh-CN');
    await identity.deactivate(doc.id);
    expect((await identity.resolve(doc.id)).deactivated).toBe(true);
    if (oldPk) process.env.PRIVATE_KEY = oldPk;
    if (oldRegistry) process.env.DID_REGISTRY_ADDRESS = oldRegistry;
  });
});
