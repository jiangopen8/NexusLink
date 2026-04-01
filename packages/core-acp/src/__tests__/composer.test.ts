import { describe, it, expect } from 'vitest';
import { SkillComposer } from '../impl/composer.js';
import type { SkillComposition } from '../types.js';

const makeComposition = (overrides: Partial<SkillComposition> = {}): SkillComposition => ({
  id: 'comp-001',
  name: 'Test Composition',
  description: 'A test composition',
  steps: [
    { skillId: 'skill-a' },
    { skillId: 'skill-b', dependsOn: ['skill-a'] },
    { skillId: 'skill-c', dependsOn: ['skill-a'] },
  ],
  ...overrides,
});

describe('SkillComposer', () => {
  describe('validate', () => {
    it('validates a valid linear composition', () => {
      const composer = new SkillComposer();
      const result = composer.validate(makeComposition());
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('produces correct topological execution order', () => {
      const composer = new SkillComposer();
      const result = composer.validate(makeComposition());
      expect(result.executionOrder).toBeDefined();
      // skill-a must come before skill-b and skill-c
      const order = result.executionOrder!;
      expect(order.indexOf('skill-a')).toBeLessThan(order.indexOf('skill-b'));
      expect(order.indexOf('skill-a')).toBeLessThan(order.indexOf('skill-c'));
    });

    it('rejects composition with missing name', () => {
      const composer = new SkillComposer();
      const result = composer.validate(makeComposition({ name: '' }));
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.includes('name'))).toBe(true);
    });

    it('rejects composition with empty steps', () => {
      const composer = new SkillComposer();
      const result = composer.validate(makeComposition({ steps: [] }));
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.includes('one step'))).toBe(true);
    });

    it('rejects composition with unknown dependency', () => {
      const composer = new SkillComposer();
      const result = composer.validate(makeComposition({
        steps: [
          { skillId: 'skill-a', dependsOn: ['non-existent'] },
        ],
      }));
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.includes('non-existent'))).toBe(true);
    });

    it('detects circular dependencies', () => {
      const composer = new SkillComposer();
      const result = composer.validate(makeComposition({
        steps: [
          { skillId: 'skill-a', dependsOn: ['skill-b'] },
          { skillId: 'skill-b', dependsOn: ['skill-a'] },
        ],
      }));
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.toLowerCase().includes('circular'))).toBe(true);
    });

    it('rejects duplicate skill IDs in steps', () => {
      const composer = new SkillComposer();
      const result = composer.validate(makeComposition({
        steps: [
          { skillId: 'skill-a' },
          { skillId: 'skill-a' },
        ],
      }));
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.includes('Duplicate'))).toBe(true);
    });

    it('warns for compositions with >10 steps', () => {
      const composer = new SkillComposer();
      const steps = Array.from({ length: 11 }, (_, i) => ({
        skillId: `skill-${i}`,
        dependsOn: i > 0 ? [`skill-${i - 1}`] : [],
      }));
      const result = composer.validate(makeComposition({ steps }));
      expect(result.valid).toBe(true);
      expect(result.warnings.length).toBeGreaterThan(0);
    });
  });

  describe('register / get / list', () => {
    it('registers a valid composition', () => {
      const composer = new SkillComposer();
      const validation = composer.register(makeComposition());
      expect(validation.valid).toBe(true);
      expect(composer.get('comp-001')).toBeDefined();
      expect(composer.list()).toHaveLength(1);
    });

    it('does not register an invalid composition', () => {
      const composer = new SkillComposer();
      composer.register(makeComposition({ steps: [] }));
      expect(composer.list()).toHaveLength(0);
    });

    it('returns undefined for unknown composition', () => {
      const composer = new SkillComposer();
      expect(composer.get('unknown')).toBeUndefined();
    });
  });

  describe('execute', () => {
    it('executes steps in dependency order', async () => {
      const composer = new SkillComposer();
      composer.register(makeComposition());

      const executedOrder: string[] = [];
      const result = await composer.execute('comp-001', async (skillId) => {
        executedOrder.push(skillId);
        return { skillId };
      });

      expect(result.success).toBe(true);
      expect(result.compositionId).toBe('comp-001');
      expect(executedOrder).toHaveLength(3);
      expect(executedOrder.indexOf('skill-a')).toBeLessThan(executedOrder.indexOf('skill-b'));
      expect(executedOrder.indexOf('skill-a')).toBeLessThan(executedOrder.indexOf('skill-c'));
    });

    it('stops on first step failure', async () => {
      const composer = new SkillComposer();
      composer.register(makeComposition({
        steps: [
          { skillId: 'step-1' },
          { skillId: 'step-2', dependsOn: ['step-1'] },
        ],
      }));

      const result = await composer.execute('comp-001', async (skillId) => {
        if (skillId === 'step-1') throw new Error('Step 1 failed');
        return {};
      });

      expect(result.success).toBe(false);
      expect(result.stepResults['step-1'].success).toBe(false);
      expect(result.stepResults['step-2']).toBeUndefined();
    });

    it('throws for unknown composition', async () => {
      const composer = new SkillComposer();
      await expect(composer.execute('unknown', async () => ({}))).rejects.toThrow('not found');
    });
  });
});
