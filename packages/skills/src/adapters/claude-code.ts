import type { PlatformAdapter, SkillDescriptor, SkillInvocation, SkillResult } from '../types.js';
import { SkillRegistry } from '../registry.js';

export class ClaudeCodeAdapter implements PlatformAdapter {
  readonly platform = 'claude-code';
  private aliases = new Map<string, string>();

  async registerSkill(skill: SkillDescriptor): Promise<void> {
    this.aliases.set(this.toToolName(skill.skill), skill.skill);
    console.log(`[ClaudeCode] Registered skill: ${skill.skill} (${skill.name})`);
  }

  parseInvocation(raw: any): SkillInvocation {
    const rawName = String(raw.name ?? raw.skillId ?? '');
    return {
      skillId: this.aliases.get(rawName) ?? this.fromToolName(rawName),
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
      name: this.toToolName(skill.skill),
      description: skill.description,
      inputSchema: skill.parameters,
    }));
  }

  private toToolName(skillId: string): string {
    return skillId.replace('nexuslink:', '').replace(/:/g, '_');
  }

  private fromToolName(name: string): string {
    return name.startsWith('nexuslink:') ? name : `nexuslink:${name.replace(/_/g, ':')}`;
  }
}
