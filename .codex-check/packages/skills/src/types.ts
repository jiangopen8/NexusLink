export interface SkillDescriptor {
  skill: string;
  version: string;
  name: string;
  description: string;
  intent: { triggerPatterns: string[]; category: string };
  parameters: { type: 'object'; properties: Record<string, unknown>; required?: string[] };
  returns: { type: 'object'; properties: Record<string, unknown> };
  examples?: Array<{ input: unknown; output: unknown }>;
}

export interface SkillInvocation {
  skillId: string;
  params: Record<string, unknown>;
  context?: { callerDid?: string; sessionId?: string; intentText?: string };
}

export interface SkillResult {
  success: boolean;
  data: Record<string, unknown>;
  message: string;
  suggestions?: string[];
  relatedSkills?: string[];
}

export interface PlatformAdapter {
  readonly platform: string;
  registerSkill(skill: SkillDescriptor): Promise<void>;
  parseInvocation(raw: unknown): SkillInvocation;
  formatResult(result: SkillResult): unknown;
}
