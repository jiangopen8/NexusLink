import { describe, it, expect } from 'vitest';
import { SkillRegistry } from '../registry.js';

describe('SkillRegistry', () => {
  it('registers at least 25 skills', () => {
    const registry = new SkillRegistry();
    expect(registry.count()).toBeGreaterThanOrEqual(25);
  });

  it('retrieves skill by ID', () => {
    const registry = new SkillRegistry();
    const skill = registry.get('nexuslink:did:register');
    expect(skill).toBeDefined();
    expect(skill?.name).toBe('Register Agent DID');
  });

  it('finds skills by intent', () => {
    const registry = new SkillRegistry();
    const found = registry.findByIntent('I want to register a new agent identity');
    expect(found.length).toBeGreaterThan(0);
  });

  it('lists all skills', () => {
    const registry = new SkillRegistry();
    const all = registry.list();
    expect(all.length).toBe(registry.count());
  });

  it('finds Claude ​Code adapter skill', () => {
    const registry = new SkillRegistry();
    const skill = registry.get('nexuslink:adapter:claude-code');
    expect(skill).toBeDefined();
    expect(skill?.intent.category).toBe('ai-coding');
  });

  it('finds nanopayment skill by intent', () => {
    const registry = new SkillRegistry();
    const found = registry.findByIntent('create payment channel for micropayment');
    expect(found.length).toBeGreaterThan(0);
  });

  it('finds collaboration skills', () => {
    const registry = new SkillRegistry();
    expect(registry.get('nexuslink:space:create')).toBeDefined();
    expect(registry.get('nexuslink:acp:compose')).toBeDefined();
  });

  it('finds DAO governance skills', () => {
    const registry = new SkillRegistry();
    expect(registry.get('nexuslink:dao:propose')).toBeDefined();
    expect(registry.get('nexuslink:dao:vote')).toBeDefined();
  });
});
