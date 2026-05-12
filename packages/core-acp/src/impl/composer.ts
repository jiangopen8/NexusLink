import type { SkillComposition, CompositionValidation, CompositionResult } from '../types.js';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { homedir } from 'node:os';

/**
 * SkillComposer - Phase 2: Skill Composition Engine
 *
 * Enables chaining multiple skills together into composite workflows.
 * Validates dependencies, detects cycles, produces execution order.
 */
export class SkillComposer {
  private compositions = new Map<string, SkillComposition>();

  constructor(private statePath?: string) {
    if (statePath) {
      this.statePath = statePath.replace(/^~/, homedir());
      this.reload();
    }
  }

  /**
   * Validate a skill composition for structural correctness.
   * Checks for: missing deps, circular dependencies, invalid skill IDs.
   */
  validate(composition: SkillComposition): CompositionValidation {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!composition.id) errors.push('Composition id is required');
    if (!composition.name) errors.push('Composition name is required');
    if (!composition.steps || composition.steps.length === 0) {
      errors.push('Composition must have at least one step');
    }

    const skillIds = new Set(composition.steps.map(s => s.skillId));

    // Check for duplicate skill IDs
    if (skillIds.size !== composition.steps.length) {
      errors.push('Duplicate skillId in composition steps');
    }

    // Validate dependencies
    for (const step of composition.steps) {
      if (!step.skillId) {
        errors.push('Each step must have a skillId');
        continue;
      }
      for (const dep of step.dependsOn ?? []) {
        if (!skillIds.has(dep)) {
          errors.push(`Step "${step.skillId}" depends on unknown skill: "${dep}"`);
        }
      }
    }

    // Detect circular dependencies using DFS
    const executionOrder = errors.length === 0
      ? this.topologicalSort(composition)
      : undefined;

    if (!executionOrder && errors.length === 0) {
      errors.push('Circular dependency detected in skill composition');
    }

    if (composition.steps.length > 10) {
      warnings.push('Large compositions (>10 steps) may have increased latency');
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      executionOrder,
    };
  }

  /**
   * Register a composition for later execution.
   */
  register(composition: SkillComposition): CompositionValidation {
    const validation = this.validate(composition);
    if (validation.valid) {
      this.compositions.set(composition.id, composition);
      this.persist();
    }
    return validation;
  }

  /**
   * Get a registered composition.
   */
  get(compositionId: string): SkillComposition | undefined {
    this.reload();
    return this.compositions.get(compositionId);
  }

  /**
   * List all registered compositions.
   */
  list(): SkillComposition[] {
    this.reload();
    return Array.from(this.compositions.values());
  }

  /**
   * Execute a registered composition with a provided skill executor.
   */
  async execute(
    compositionId: string,
    executor: (skillId: string, params: Record<string, unknown>) => Promise<unknown>
  ): Promise<CompositionResult> {
    const composition = this.compositions.get(compositionId);
    if (!composition) {
      throw new Error(`Composition not found: ${compositionId}`);
    }

    const validation = this.validate(composition);
    if (!validation.valid) {
      throw new Error(`Invalid composition: ${validation.errors.join(', ')}`);
    }

    const startTime = Date.now();
    const stepResults: Record<string, { success: boolean; data?: unknown; error?: string }> = {};
    const executionOrder = validation.executionOrder!;

    let success = true;
    for (const skillId of executionOrder) {
      const step = composition.steps.find(s => s.skillId === skillId)!;
      try {
        const data = await executor(skillId, step.params ?? {});
        stepResults[skillId] = { success: true, data };
      } catch (err) {
        success = false;
        stepResults[skillId] = {
          success: false,
          error: err instanceof Error ? err.message : String(err)
        };
        break; // Stop on first failure
      }
    }

    return {
      compositionId,
      success,
      stepResults,
      executedAt: new Date().toISOString(),
      durationMs: Date.now() - startTime,
    };
  }

  /**
   * Topological sort of skill steps (Kahn's algorithm).
   * Returns null if a cycle is detected.
   */
  private topologicalSort(composition: SkillComposition): string[] | undefined {
    const inDegree = new Map<string, number>();
    const graph = new Map<string, string[]>();

    for (const step of composition.steps) {
      inDegree.set(step.skillId, 0);
      graph.set(step.skillId, []);
    }

    for (const step of composition.steps) {
      for (const dep of step.dependsOn ?? []) {
        graph.get(dep)!.push(step.skillId);
        inDegree.set(step.skillId, (inDegree.get(step.skillId) ?? 0) + 1);
      }
    }

    const queue: string[] = [];
    for (const [id, degree] of inDegree) {
      if (degree === 0) queue.push(id);
    }

    const result: string[] = [];
    while (queue.length > 0) {
      const current = queue.shift()!;
      result.push(current);
      for (const neighbor of graph.get(current) ?? []) {
        const newDegree = (inDegree.get(neighbor) ?? 0) - 1;
        inDegree.set(neighbor, newDegree);
        if (newDegree === 0) queue.push(neighbor);
      }
    }

    return result.length === composition.steps.length ? result : undefined;
  }

  private reload(): void {
    if (!this.statePath || !existsSync(this.statePath)) return;
    const compositions = JSON.parse(readFileSync(this.statePath, 'utf-8')) as SkillComposition[];
    this.compositions = new Map(compositions.map(composition => [composition.id, composition]));
  }

  private persist(): void {
    if (!this.statePath) return;
    const dir = dirname(this.statePath);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(this.statePath, JSON.stringify(Array.from(this.compositions.values()), null, 2), 'utf-8');
  }
}
