import { describe, expect, it } from 'vitest';
import { capabilityModules, findings, qualityGates, simulationFlow } from './data';
import {
  averageScore,
  commandCount,
  findingBuckets,
  flowCompletion,
  gateSummary,
  modulesByStatus,
  searchModules,
  skillCount,
  sortModules,
  statusLabel,
} from './model';

describe('webapp dashboard model', () => {
  it('covers the current NexusLink architecture surface', () => {
    expect(capabilityModules.map(module => module.id)).toEqual([
      'identity',
      'memory',
      'sal',
      'config',
      'nss',
      'acp',
      'governance',
      'settlement',
      'cli',
      'skills',
      'marketplace',
      'contracts',
    ]);
    expect(capabilityModules.every(module => module.features.length >= 5)).toBe(true);
    expect(skillCount(capabilityModules)).toBeGreaterThanOrEqual(20);
    expect(commandCount(capabilityModules)).toBeGreaterThanOrEqual(25);
  });

  it('summarizes module status and readiness', () => {
    expect(statusLabel('ready')).toBe('可内测');
    expect(statusLabel('simulation')).toBe('模拟可用');
    expect(statusLabel('needs-integration')).toBe('待外部集成');
    expect(modulesByStatus(capabilityModules)).toEqual({
      ready: 10,
      simulation: 1,
      'needs-integration': 1,
    });
    expect(averageScore(capabilityModules)).toBeGreaterThan(85);
  });

  it('filters and sorts capability modules for the UI', () => {
    expect(searchModules(capabilityModules, 'Claude').map(module => module.id)).toContain('skills');
    expect(searchModules(capabilityModules, 'pay nano').map(module => module.id)).toEqual(['settlement']);
    const sorted = sortModules(capabilityModules);
    expect(sorted[0].status).toBe('ready');
    expect(sorted.at(-1)?.status).toBe('needs-integration');
  });

  it('represents a complete internal simulation and quality gate baseline', () => {
    expect(simulationFlow).toHaveLength(8);
    expect(flowCompletion(simulationFlow)).toBe(100);
    expect(gateSummary(qualityGates)).toBe('5/5');
    expect(qualityGates.map(gate => gate.name)).toEqual(['端到端模拟', 'TS/Vitest', 'Contracts', '覆盖率', '依赖安全']);
  });

  it('keeps fixed issues and remaining risks visible', () => {
    expect(findingBuckets(findings)).toEqual({ 已修复: 3, 待集成: 1, 观察项: 1 });
    expect(findings.some(finding => finding.title.includes('Node 25'))).toBe(true);
    expect(findings.some(finding => finding.area === 'e-CNY')).toBe(true);
  });
});
