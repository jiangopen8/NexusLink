import { describe, it, expect } from 'vitest';
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
});
