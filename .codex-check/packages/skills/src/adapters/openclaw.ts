import type { PlatformAdapter, SkillDescriptor, SkillInvocation, SkillResult } from '../types.js';

export class OpenClawAdapter implements PlatformAdapter {
  readonly platform = 'openclaw';

  async registerSkill(skill: SkillDescriptor): Promise<void> {
    console.log(`[OpenClaw] Registered skill: ${skill.skill} (${skill.name})`);
  }

  parseInvocation(raw: any): SkillInvocation {
    return {
      skillId: raw.action ?? raw.skillId ?? '',
      params: raw.parameters ?? raw.params ?? {},
      context: { callerDid: raw.agentContext?.did, sessionId: raw.sessionId },
    };
  }

  formatResult(result: SkillResult): any {
    return {
      status: result.success ? 'completed' : 'failed',
      data: result.data,
      message: result.message,
      suggestions: result.suggestions,
    };
  }
}
