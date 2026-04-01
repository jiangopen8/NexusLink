import type { SkillDescriptor } from './types.js';
import { DID_SKILLS } from './skills/did.js';
import { NSS_SKILLS } from './skills/nss.js';
import { GOVERNANCE_SKILLS } from './skills/governance.js';
import { SETTLEMENT_SKILLS } from './skills/settlement.js';
import { MEMORY_SKILLS } from './skills/memory.js';
import { COLLABORATION_SKILLS } from './skills/collaboration.js';
import { ADAPTER_SKILLS } from './skills/adapters.js';
import { NANOPAYMENT_SKILLS } from './skills/nanopayment.js';
import { ANALYTICS_SKILLS } from './skills/analytics.js';

const ALL_SKILLS: SkillDescriptor[] = [
  ...Object.values(DID_SKILLS),
  ...Object.values(NSS_SKILLS),
  ...Object.values(GOVERNANCE_SKILLS),
  ...Object.values(SETTLEMENT_SKILLS),
  ...Object.values(MEMORY_SKILLS),
  ...Object.values(COLLABORATION_SKILLS),
  ...Object.values(ADAPTER_SKILLS),
  ...Object.values(NANOPAYMENT_SKILLS),
  ...Object.values(ANALYTICS_SKILLS),
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
