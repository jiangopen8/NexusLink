import type { SkillDescriptor } from './types.js';
import { DID_SKILLS } from './skills/did.js';
import { NSS_SKILLS } from './skills/nss.js';
import { GOVERNANCE_SKILLS } from './skills/governance.js';
import { SETTLEMENT_SKILLS } from './skills/settlement.js';

const ALL_SKILLS: SkillDescriptor[] = [
  ...Object.values(DID_SKILLS),
  ...Object.values(NSS_SKILLS),
  ...Object.values(GOVERNANCE_SKILLS),
  ...Object.values(SETTLEMENT_SKILLS),
];

export class SkillRegistry {
  private skills = new Map<string, SkillDescriptor>();

  constructor() {
    for (const skill of ALL_SKILLS) {
      this.skills.set(skill.skill, skill);
    }
  }

  get(skillId: string): SkillDescriptor | undefined {
    return this.skills.get(skillId);
  }

  list(): SkillDescriptor[] {
    return Array.from(this.skills.values());
  }

  findByIntent(text: string): SkillDescriptor[] {
    const lower = text.toLowerCase();
    return this.list().filter(s =>
      s.intent.triggerPatterns.some(p => lower.includes(p.toLowerCase())),
    );
  }

  count(): number {
    return this.skills.size;
  }
}
