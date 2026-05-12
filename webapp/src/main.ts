import {
  capabilityModules,
  findings,
  headlineStats,
  qualityGates,
  simulationFlow,
} from './data';
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
import './styles.css';

const appRoot = document.querySelector<HTMLDivElement>('#app');

if (!appRoot) {
  throw new Error('App root not found');
}

const root: HTMLDivElement = appRoot;

let activeModule = capabilityModules[0].id;
let query = '';

function badgeClass(status: string): string {
  return `badge badge-${status}`;
}

function findingClass(severity: string): string {
  if (severity === '已修复') return 'finding-fixed';
  if (severity === '待集成') return 'finding-integration';
  return 'finding-watch';
}

function renderStats(): string {
  const status = modulesByStatus(capabilityModules);
  const stats = [
    ...headlineStats,
    { label: '能力均分', value: averageScore(capabilityModules).toString(), hint: `${status.ready} 个可内测，${status.simulation} 个模拟可用` },
    { label: 'CLI 命令面', value: commandCount(capabilityModules).toString(), hint: '覆盖开发者、CI/CD 和运维入口' },
    { label: 'Skill 入口', value: skillCount(capabilityModules).toString(), hint: '覆盖 Agent 平台调用入口' },
    { label: '质量门禁', value: gateSummary(qualityGates), hint: 'build、lint、test、coverage、audit' },
  ];

  return stats.map(stat => `
    <article class="stat">
      <span>${stat.label}</span>
      <strong>${stat.value}</strong>
      <small>${stat.hint}</small>
    </article>
  `).join('');
}

function renderModuleList(): string {
  const filtered = sortModules(searchModules(capabilityModules, query));
  if (filtered.length === 0) {
    return '<div class="empty">没有匹配的模块</div>';
  }

  return filtered.map(module => `
    <button class="module-button ${module.id === activeModule ? 'active' : ''}" data-module="${module.id}">
      <span>
        <strong>${module.name}</strong>
        <small>${module.layer}</small>
      </span>
      <span class="${badgeClass(module.status)}">${statusLabel(module.status)}</span>
    </button>
  `).join('');
}

function renderActiveModule(): string {
  const module = capabilityModules.find(item => item.id === activeModule) ?? capabilityModules[0];
  return `
    <section class="panel module-detail" aria-label="模块详情">
      <div class="panel-heading">
        <div>
          <span class="eyebrow">${module.layer}</span>
          <h2>${module.name}</h2>
        </div>
        <span class="${badgeClass(module.status)}">${statusLabel(module.status)}</span>
      </div>
      <p>${module.summary}</p>
      <div class="score-row">
        <span>内测成熟度</span>
        <strong>${module.score}</strong>
      </div>
      <div class="score-track"><span style="width:${module.score}%"></span></div>
      <div class="detail-grid">
        <div>
          <h3>功能点</h3>
          <ul>${module.features.map(feature => `<li>${feature}</li>`).join('')}</ul>
        </div>
        <div>
          <h3>CLI 入口</h3>
          <ul>${module.commands.map(command => `<li><code>${command}</code></li>`).join('')}</ul>
        </div>
        <div>
          <h3>Skill 入口</h3>
          <ul>${module.skills.map(skill => `<li><code>${skill}</code></li>`).join('')}</ul>
        </div>
      </div>
    </section>
  `;
}

function renderFlow(): string {
  return simulationFlow.map((step, index) => `
    <article class="flow-step">
      <div class="step-index">${index + 1}</div>
      <div>
        <span>${step.module}</span>
        <h3>${step.title}</h3>
        <p>${step.detail}</p>
      </div>
      <strong>${step.telemetry}</strong>
    </article>
  `).join('');
}

function renderGates(): string {
  return qualityGates.map(gate => `
    <article class="gate">
      <div>
        <span>${gate.name}</span>
        <strong>${gate.result}</strong>
      </div>
      <p>${gate.detail}</p>
      <div class="gate-meter"><span style="width:${Math.min(100, gate.coverage)}%"></span></div>
    </article>
  `).join('');
}

function renderFindings(): string {
  const buckets = findingBuckets(findings);
  return `
    <div class="finding-summary">
      <span>已修复 ${buckets.已修复}</span>
      <span>待集成 ${buckets.待集成}</span>
      <span>观察项 ${buckets.观察项}</span>
    </div>
    ${findings.map(finding => `
      <article class="finding ${findingClass(finding.severity)}">
        <span>${finding.area} · ${finding.severity}</span>
        <h3>${finding.title}</h3>
        <p>${finding.impact}</p>
      </article>
    `).join('')}
  `;
}

function render(): void {
  root.innerHTML = `
    <header class="topbar">
      <div>
        <span class="brand-mark">NL</span>
        <strong>NexusLink 内测控制台</strong>
      </div>
      <nav aria-label="页面区域">
        <a href="#overview">总览</a>
        <a href="#capabilities">能力</a>
        <a href="#simulation">模拟</a>
        <a href="#quality">质量</a>
        <a href="#findings">缺陷</a>
      </nav>
    </header>

    <main>
      <section id="overview" class="overview">
        <div class="panel overview-main">
          <div class="overview-heading">
            <div>
              <span class="eyebrow">Internal Test Console</span>
              <h1>NexusLink 协议内测工作台</h1>
            </div>
            <div class="runtime-state">
              <span>运行基线</span>
              <strong>Node 20/22</strong>
              <small>当前 Node 25 仅用于本轮验证</small>
            </div>
          </div>
          <div class="stats-grid overview-stats" aria-label="工程指标">${renderStats()}</div>
        </div>

        <aside class="overview-side">
          <section class="panel topology-panel" aria-label="协议能力拓扑">
            <div class="panel-heading">
              <div>
                <span class="eyebrow">Architecture</span>
                <h2>三层工程架构</h2>
              </div>
            </div>
            <div class="topology-map">
              <div class="node node-core">Core</div>
              <div class="node node-cli">CLI</div>
              <div class="node node-skills">Skills</div>
              <div class="node node-market">Market</div>
              <div class="node node-chain">Chain</div>
              <svg viewBox="0 0 420 260" role="img" aria-label="NexusLink capability network">
                <path d="M210 130 L82 70 L94 198 Z" />
                <path d="M210 130 L330 66 L318 198 Z" />
                <path d="M82 70 L330 66 L318 198 L94 198 Z" />
              </svg>
            </div>
          </section>
          <section class="panel overview-flow">
            <div class="panel-heading">
              <div>
                <span class="eyebrow">Latest Simulation</span>
                <h2>协作链路</h2>
              </div>
              <strong>${flowCompletion(simulationFlow)}%</strong>
            </div>
            ${simulationFlow.slice(0, 4).map(step => `
              <div class="mini-step">
                <span>${step.module}</span>
                <strong>${step.title}</strong>
              </div>
            `).join('')}
          </section>
        </aside>
      </section>

      <section id="capabilities" class="capabilities">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Capability Map</span>
            <h2>当前功能与特点</h2>
          </div>
          <label class="search">
            <span>搜索</span>
            <input id="module-search" type="search" value="${query}" placeholder="DID / pay / Claude / DAO" />
          </label>
        </div>
        <div class="capability-layout">
          <aside class="module-list" aria-label="模块列表">${renderModuleList()}</aside>
          ${renderActiveModule()}
        </div>
      </section>

      <section id="simulation" class="simulation">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Simulation</span>
            <h2>端到端协作模拟</h2>
          </div>
          <div class="completion">${flowCompletion(simulationFlow)}% 链路覆盖</div>
        </div>
        <div class="flow">${renderFlow()}</div>
      </section>

      <section id="quality" class="quality">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Quality Gates</span>
            <h2>构建与测试基线</h2>
          </div>
          <div class="completion">${gateSummary(qualityGates)} 门禁通过</div>
        </div>
        <div class="gate-grid">${renderGates()}</div>
      </section>

      <section id="findings" class="findings">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Risk Radar</span>
            <h2>缺陷修复与后续集成</h2>
          </div>
        </div>
        <div class="finding-grid">${renderFindings()}</div>
      </section>
    </main>
  `;

  document.querySelectorAll<HTMLButtonElement>('[data-module]').forEach(button => {
    button.addEventListener('click', () => {
      activeModule = button.dataset.module ?? activeModule;
      render();
    });
  });

  document.querySelector<HTMLInputElement>('#module-search')?.addEventListener('input', event => {
    query = (event.target as HTMLInputElement).value;
    render();
    document.querySelector<HTMLInputElement>('#module-search')?.focus();
  });
}

render();
