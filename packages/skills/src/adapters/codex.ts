import type { PlatformAdapter, SkillDescriptor, SkillInvocation, SkillResult } from '../types.js';

export class CodexAdapter implements PlatformAdapter {
  readonly platform = 'codex';
  private registered = new Map<string, SkillDescriptor>();

  async registerSkill(skill: SkillDescriptor): Promise<void> {
    this.registered.set(skill.skill, skill);
  }

  parseInvocation(raw: any): SkillInvocation {
    return {
      skillId: raw.skillId ?? raw.name ?? raw.tool ?? '',
      params: raw.params ?? raw.input ?? raw.arguments ?? {},
      context: {
        callerDid: raw.context?.callerDid,
        sessionId: raw.context?.sessionId ?? raw.sessionId,
        intentText: raw.context?.intentText ?? raw.intentText,
      },
    };
  }

  formatResult(result: SkillResult): unknown {
    return {
      ok: result.success,
      data: result.data,
      message: result.message,
      suggestions: result.suggestions ?? [],
      relatedSkills: result.relatedSkills ?? [],
    };
  }

  exportManifest(): unknown {
    return {
      platform: this.platform,
      skills: Array.from(this.registered.values()).map(skill => ({
        id: skill.skill,
        description: skill.description,
        parameters: skill.parameters,
      })),
    };
  }
}
