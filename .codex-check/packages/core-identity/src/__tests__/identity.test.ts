import { describe, it, expect } from 'vitest';
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
});
