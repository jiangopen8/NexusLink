import { describe, it, expect } from 'vitest';
import { SkillExecutor } from '../executor.js';

describe('SkillExecutor', () => {
  it('returns not found for unknown skill', async () => {
    const executor = new SkillExecutor();
    const result = await executor.execute({ skillId: 'nexuslink:unknown:skill', params: {} });
    expect(result.success).toBe(false);
    expect(result.message).toContain('not found');
  });

  it('returns suggestions for unknown skill', async () => {
    const executor = new SkillExecutor();
    const result = await executor.execute({ skillId: 'nexuslink:unknown', params: {} });
    expect(result.suggestions).toBeDefined();
    expect(result.suggestions!.length).toBeGreaterThan(0);
  });
});
