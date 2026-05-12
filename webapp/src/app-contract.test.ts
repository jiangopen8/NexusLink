import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { capabilityModules, findings, headlineStats, qualityGates, simulationFlow } from './data';

describe('webapp artifact contract', () => {
  it('has a Vite HTML entry that mounts the dashboard', () => {
    const html = readFileSync(resolve(__dirname, '../index.html'), 'utf-8');
    expect(html).toContain('<div id="app"></div>');
    expect(html).toContain('/src/main.ts');
    expect(html).toContain('NexusLink 内测控制台');
  });

  it('contains the required internal-test dashboard sections and evidence data', () => {
    expect(headlineStats.map(stat => stat.label)).toContain('能力模块');
    expect(capabilityModules.map(module => module.name)).toEqual(expect.arrayContaining([
      'DID 身份与意图边界',
      '加密记忆',
      'SAL 存储抽象层',
      '配置与运行时基线',
      'NSS 技能注册与发现',
      'ACP 通信与契约编排',
      'PoSE、VC、Space 与 DAO',
      '价值结算与 Nanopayment',
      '开发者 CLI 工具层',
      'Agent Skills 与多平台适配',
      '技能市场与调用反馈',
      '链上合约注册表',
    ]));
    expect(simulationFlow.some(step => step.module.includes('Settlement'))).toBe(true);
    expect(qualityGates.some(gate => gate.name === '覆盖率' && gate.detail.includes('82.71%'))).toBe(true);
    expect(findings.some(finding => finding.title.includes('跨进程状态丢失'))).toBe(true);
  });
});
