import { describe, it, expect } from 'vitest';
import { SkillRegistry } from '../registry.js';

describe('SkillRegistry', () => {
  it('registers all skills', () => {
    const registry = new SkillRegistry();
    expect(registry.count()).toBeGreaterThan(10);
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
});
