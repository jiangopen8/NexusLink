import type { CapabilityModule, Finding, FlowStep, ModuleStatus, QualityGate } from './data';

export function statusLabel(status: ModuleStatus): string {
  switch (status) {
    case 'ready':
      return '可内测';
    case 'simulation':
      return '模拟可用';
    case 'needs-integration':
      return '待外部集成';
  }
}

export function statusRank(status: ModuleStatus): number {
  return status === 'ready' ? 3 : status === 'simulation' ? 2 : 1;
}

export function modulesByStatus(modules: CapabilityModule[]): Record<ModuleStatus, number> {
  return modules.reduce<Record<ModuleStatus, number>>((acc, module) => {
    acc[module.status] += 1;
    return acc;
  }, { ready: 0, simulation: 0, 'needs-integration': 0 });
}

export function averageScore(modules: CapabilityModule[]): number {
  if (modules.length === 0) return 0;
  const total = modules.reduce((sum, module) => sum + module.score, 0);
  return Math.round((total / modules.length) * 10) / 10;
}

export function searchModules(modules: CapabilityModule[], query: string): CapabilityModule[] {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return modules;
  return modules.filter(module => {
    const haystack = [
      module.id,
      module.name,
      module.layer,
      module.summary,
      ...module.features,
      ...module.commands,
      ...module.skills,
    ].join(' ').toLowerCase();
    return terms.every(term => haystack.includes(term));
  });
}

export function sortModules(modules: CapabilityModule[]): CapabilityModule[] {
  return [...modules].sort((a, b) => statusRank(b.status) - statusRank(a.status) || b.score - a.score);
}

export function flowCompletion(flow: FlowStep[]): number {
  return flow.length === 0 ? 0 : 100;
}

export function gateSummary(gates: QualityGate[]): string {
  const passing = gates.filter(gate => ['通过', '达标', '中高风险通过'].includes(gate.result)).length;
  return `${passing}/${gates.length}`;
}

export function findingBuckets(findings: Finding[]): Record<Finding['severity'], number> {
  return findings.reduce<Record<Finding['severity'], number>>((acc, finding) => {
    acc[finding.severity] += 1;
    return acc;
  }, { 已修复: 0, 待集成: 0, 观察项: 0 });
}

export function commandCount(modules: CapabilityModule[]): number {
  return new Set(modules.flatMap(module => module.commands)).size;
}

export function skillCount(modules: CapabilityModule[]): number {
  return new Set(modules.flatMap(module => module.skills)).size;
}
