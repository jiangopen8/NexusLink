import type { SkillDescriptor, SkillInvocation, SkillResult } from '../types.js';
import { SkillRegistry } from '../registry.js';

export class ClaudeCodeAdapter {
  readonly platform = 'claude-code';

  async registerSkill(skill: SkillDescriptor): Promise<void> {
    console.log(`[ClaudeCode] Registered skill: ${skill.skill} (${skill.name})`);
  }

  parseInvocation(raw: any): SkillInvocation {
    return {
      skillId: raw.name ?? raw.skillId ?? '',
      params: raw.input ?? raw.params ?? {},
      context: {},
    };
  }

  formatResult(result: SkillResult): string {
    return JSON.stringify(result, null, 2);
  }

  exportAsTools(): any[] {
    const registry = new SkillRegistry();
    return registry.list().map(skill => ({
      name: skill.skill.replace('nexuslink:', '').replace(/:/g, '_'),
      description: skill.description,
      inputSchema: skill.parameters,
    }));
  }
}
