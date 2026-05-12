export type ModuleStatus = 'ready' | 'simulation' | 'needs-integration';

export interface CapabilityModule {
  id: string;
  name: string;
  layer: 'Protocol Core' | 'CLI' | 'Agent Skills' | 'Marketplace' | 'Contracts' | 'Infrastructure';
  status: ModuleStatus;
  score: number;
  summary: string;
  features: string[];
  commands: string[];
  skills: string[];
}

export interface FlowStep {
  id: string;
  title: string;
  module: string;
  detail: string;
  telemetry: string;
}

export interface QualityGate {
  name: string;
  result: string;
  coverage: number;
  detail: string;
}

export interface Finding {
  area: string;
  severity: '已修复' | '待集成' | '观察项';
  title: string;
  impact: string;
}

export const capabilityModules: CapabilityModule[] = [
  {
    id: 'identity',
    name: 'DID 身份与意图边界',
    layer: 'Protocol Core',
    status: 'ready',
    score: 92,
    summary: '注册、解析、更新、停用 DID，并将 Agent 能力、语言、Owner DID 和意图边界写入身份文档。',
    features: ['W3C DID 文档', 'Agent 类型', 'Owner 绑定', 'Intent Boundary', '本地/链上回退'],
    commands: ['nexus did register', 'nexus did resolve', 'nexus did set-boundary'],
    skills: ['nexuslink:did:register', 'nexuslink:did:resolve', 'nexuslink:did:update'],
  },
  {
    id: 'memory',
    name: '加密记忆',
    layer: 'Protocol Core',
    status: 'ready',
    score: 88,
    summary: 'Memory 使用 AES-256-GCM 加密、NXM1G 版本前缀和本地索引，负责 Agent 私有/共享记忆分片。',
    features: ['AES-256-GCM', 'NXM1G 版本前缀', '记忆分片索引', '按 ID 检索', '同步与删除'],
    commands: ['nexus memory store', 'nexus memory retrieve', 'nexus memory sync', 'nexus memory switch-backend'],
    skills: ['nexuslink:memory:store', 'nexuslink:memory:retrieve', 'nexuslink:memory:sync'],
  },
  {
    id: 'sal',
    name: 'SAL 存储抽象层',
    layer: 'Infrastructure',
    status: 'ready',
    score: 83,
    summary: 'SAL 统一本地、IPFS/Pinata、0G/ZeroG 存储后端，为 Memory 和后续内容资产提供可切换存储面。',
    features: ['local 后端', 'IPFS/Pinata 适配', '0G/ZeroG 适配', '后端能力检测', '配置驱动切换'],
    commands: ['nexus memory status', 'nexus memory switch-backend local', 'nexus memory switch-backend ipfs'],
    skills: ['nexuslink:memory:store', 'nexuslink:memory:sync'],
  },
  {
    id: 'config',
    name: '配置与运行时基线',
    layer: 'Infrastructure',
    status: 'ready',
    score: 85,
    summary: 'Config 管理网络、默认 DID、存储后端、本地状态路径和环境变量回退，是 CLI 与 Core 的统一运行时入口。',
    features: ['config.yaml', '默认 DID', '网络切换', '存储配置', '本地状态目录'],
    commands: ['nexus config init', 'nexus config set', 'nexus config get', 'nexus config network'],
    skills: ['nexuslink:did:register', 'nexuslink:memory:store', 'nexuslink:pay:send'],
  },
  {
    id: 'nss',
    name: 'NSS 技能注册与发现',
    layer: 'Protocol Core',
    status: 'ready',
    score: 90,
    summary: '技能描述符校验、发布、发现、调用和组合，向 CLI、Skills 与 Marketplace 提供统一能力目录。',
    features: ['Descriptor 校验', '意图发现', '价格过滤', 'PoSE 过滤', '本地注册表'],
    commands: ['nexus nss validate', 'nexus nss publish', 'nexus nss discover', 'nexus nss invoke'],
    skills: ['nexuslink:nss:publish', 'nexuslink:nss:discover', 'nexuslink:nss:invoke'],
  },
  {
    id: 'acp',
    name: 'ACP 通信与契约编排',
    layer: 'Protocol Core',
    status: 'ready',
    score: 86,
    summary: '本地 ACP inbox、ping、合同 propose/sign/execute 和 SkillComposer 工作流编排已形成闭环。',
    features: ['ACP send/listen/ping', 'Contract Proposal', '签署与执行', '组合持久化', 'DAG 依赖顺序'],
    commands: ['nexus acp send', 'nexus acp listen', 'nexus contract execute', 'nexus acp compose execute'],
    skills: ['nexuslink:contract:propose', 'nexuslink:contract:execute', 'nexuslink:acp:compose'],
  },
  {
    id: 'governance',
    name: 'PoSE、VC、Space 与 DAO',
    layer: 'Protocol Core',
    status: 'ready',
    score: 84,
    summary: '贡献凭证、信誉查询、协作空间准入、DAO 提案与加权投票支持内测模拟治理场景。',
    features: ['PoSE 查询', 'W3C VC 签发/验证', 'Space 准入', 'DAO 提案', '信誉加权投票'],
    commands: ['nexus pose query', 'nexus credential verify', 'nexus space join', 'nexus dao vote'],
    skills: ['nexuslink:pose:query', 'nexuslink:credential:issue', 'nexuslink:dao:vote'],
  },
  {
    id: 'settlement',
    name: '价值结算与 Nanopayment',
    layer: 'Protocol Core',
    status: 'simulation',
    score: 82,
    summary: 'USDC 本地账本、链上合约路径、e-CNY 网关接口和 nanopayment channel 已支持跨进程 CLI 内测。',
    features: ['USDC 支付', 'e-CNY 模拟', '汇率查询', 'Nanopayment Channel', 'Transfer 签名与接收'],
    commands: ['nexus pay send', 'nexus pay balance', 'nexus pay nano create', 'nexus pay nano sign'],
    skills: ['nexuslink:pay:send', 'nexuslink:pay:nano:create', 'nexuslink:pay:ecny'],
  },
  {
    id: 'cli',
    name: '开发者 CLI 工具层',
    layer: 'CLI',
    status: 'ready',
    score: 89,
    summary: 'nexus CLI 将 Core 能力封装为人类开发者、脚本和 CI/CD 可直接调用的命令，并支持 table/json/yaml/quiet 输出。',
    features: ['Commander 命令树', 'JSON 输出', '表格输出', '跨进程状态', 'CI/CD 友好'],
    commands: ['nexus --help', 'nexus did', 'nexus nss', 'nexus acp', 'nexus pay'],
    skills: ['Core SDK consumer', 'CLI integration tests'],
  },
  {
    id: 'skills',
    name: 'Agent Skills 与多平台适配',
    layer: 'Agent Skills',
    status: 'ready',
    score: 94,
    summary: '32 个 Skill 描述符覆盖身份、记忆、治理、结算、合约、协作、分析和平台适配。',
    features: ['OpenClaw Adapter', 'Claude Code Adapter', 'Codex Adapter', 'JSON Schema 参数', '意图触发'],
    commands: ['nexus --help'],
    skills: ['nexuslink:adapter:claude-code', 'nexuslink:adapter:codex', 'nexuslink:adapter:search'],
  },
  {
    id: 'marketplace',
    name: '技能市场与调用反馈',
    layer: 'Marketplace',
    status: 'ready',
    score: 87,
    summary: '技能发布、搜索、评分、调用统计和排序能力可用于内测观察技能供需和质量。',
    features: ['技能发布', '关键词搜索', 'PoSE 排序', '调用成功率', 'Review 平均分'],
    commands: ['HTTP API / marketplace module'],
    skills: ['nexuslink:nss:discover', 'nexuslink:analytics:pose'],
  },
  {
    id: 'contracts',
    name: '链上合约注册表',
    layer: 'Contracts',
    status: 'needs-integration',
    score: 76,
    summary: 'DIDRegistry、NSSRegistry、Settlement 合约和 Hardhat 测试已具备，正式环境需接入链上地址与密钥。',
    features: ['DIDRegistry', 'NSSRegistry', 'Settlement', 'Hardhat 测试', '部署脚本'],
    commands: ['hardhat compile', 'hardhat test', 'contracts/scripts/deploy.ts'],
    skills: ['nexuslink:did:register', 'nexuslink:nss:publish', 'nexuslink:pay:send'],
  },
];

export const simulationFlow: FlowStep[] = [
  {
    id: 'did',
    title: '注册 Alice/Bob Agent DID',
    module: 'Identity',
    detail: 'Alice 作为 AssistantAgent，Bob 作为 ToolAgent，双方写入 skills、languages、ownerDid。',
    telemetry: '2 DID docs',
  },
  {
    id: 'discover',
    title: '发布并发现市场研究技能',
    module: 'NSS + Marketplace',
    detail: 'Bob 发布 nss://market-research-v1，Alice 通过意图 market 和价格上限发现技能。',
    telemetry: 'PoSE 88 / rating 4.0',
  },
  {
    id: 'memory',
    title: '记录协作记忆',
    module: 'Memory + SAL',
    detail: '将选中的 skillId 加密写入本地 SAL 后端，并从 memory index 恢复。',
    telemetry: 'AES-GCM shard',
  },
  {
    id: 'config',
    title: '加载本地运行配置',
    module: 'Config + CLI',
    detail: '用 local network、默认 DID、local storage 和隔离 HOME 目录驱动整条模拟链路。',
    telemetry: 'config.yaml',
  },
  {
    id: 'contract',
    title: 'ACP 消息与契约执行',
    module: 'ACP + Contract',
    detail: 'Alice 发送 ACP 消息给 Bob，创建 instant 合同，签署后执行并返回 executed 状态。',
    telemetry: 'msg + contract',
  },
  {
    id: 'govern',
    title: '签发 VC 并进入治理空间',
    module: 'Governance + Space + DAO',
    detail: 'Bob 获得完成凭证，加入 Simulation Ops Space，并用 PoSE 权重投票支持提案。',
    telemetry: 'votesFor 88',
  },
  {
    id: 'settle',
    title: 'USDC、e-CNY 与 Nanopayment 结算',
    module: 'Settlement',
    detail: '执行 USDC 支付，打开 nanopayment channel，签名并接收小额 transfer，再模拟 e-CNY 支付。',
    telemetry: '0.25 USDC + 0.10 nano',
  },
  {
    id: 'adapter',
    title: '通过平台 Adapter 调用 Skill',
    module: 'Agent Skills',
    detail: 'OpenClaw 使用 action，Claude Code 使用 nss_invoke 工具名，Codex 返回 ok 格式。',
    telemetry: '32 skills',
  },
];

export const qualityGates: QualityGate[] = [
  {
    name: '端到端模拟',
    result: '通过',
    coverage: 100,
    detail: 'pnpm test:simulation：1 个完整架构场景通过',
  },
  {
    name: 'TS/Vitest',
    result: '通过',
    coverage: 112,
    detail: '14 个 TS test files，112 个测试通过',
  },
  {
    name: 'Contracts',
    result: '通过',
    coverage: 7,
    detail: 'Hardhat DIDRegistry、NSSRegistry、Settlement：7 个测试通过',
  },
  {
    name: '覆盖率',
    result: '达标',
    coverage: 82.71,
    detail: 'Lines 82.71%，Statements 78.60%',
  },
  {
    name: '依赖安全',
    result: '中高风险通过',
    coverage: 3,
    detail: 'audit moderate 通过，仍有 3 个 low 风险',
  },
];

export const findings: Finding[] = [
  {
    area: 'Claude Code Adapter',
    severity: '已修复',
    title: '短工具名无法映射回完整 Skill ID',
    impact: 'nss_invoke 现在可稳定解析为 nexuslink:nss:invoke。',
  },
  {
    area: 'ACP / Contract',
    severity: '已修复',
    title: 'execute 返回信息过少',
    impact: '执行后返回更新后的 ContractProposal，便于 CLI 和 Skill 消费。',
  },
  {
    area: 'CLI Persistence',
    severity: '已修复',
    title: 'compose 与 nanopayment 跨进程状态丢失',
    impact: '组合和 channel/transfer 已持久化到本地 NexusLink 状态文件。',
  },
  {
    area: 'Runtime',
    severity: '观察项',
    title: 'Node 25 超出项目引擎范围',
    impact: '项目要求 Node >=20 <23，Hardhat 在 Node 25 下持续提示不受支持。',
  },
  {
    area: 'e-CNY',
    severity: '待集成',
    title: '当前为网关接口和本地模拟账本',
    impact: '正式内测前需接入真实合规支付网关或明确沙箱环境。',
  },
];

export const headlineStats = [
  { label: '能力模块', value: '12', hint: 'Core / CLI / Skills / Marketplace / Contracts / Infrastructure' },
  { label: 'Agent Skills', value: '32', hint: '统一 Skill 描述和多平台适配' },
  { label: '测试用例', value: '119', hint: '112 TS/Vitest + 7 Hardhat' },
  { label: 'Lines 覆盖率', value: '82.71%', hint: '最近一次 vitest coverage' },
];
