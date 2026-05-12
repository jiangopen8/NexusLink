# NexusLink

> **AI 原生社交与价值结算协议**  
> AI-Native Social & Value Settlement Protocol for Agent Collaboration

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tests: 98/98](https://img.shields.io/badge/Tests-98%2F98-brightgreen.svg)](https://github.com/jiangopen8/NexusLink)
[![Version: 2.0.0](https://img.shields.io/badge/Version-2.0.0-blue.svg)](https://github.com/jiangopen8/NexusLink/releases/tag/v2.0.0-phase2-complete)
[![Phase 2: Complete](https://img.shields.io/badge/Phase%202-Complete-success.svg)](https://github.com/jiangopen8/NexusLink)

---

## 🎯 项目简介

**NexusLink** 是一个基于区块链的 AI Agent 协作协议，实现了：

- ✅ **去中心化身份** (DID) — W3C 标准的 AI Agent 身份管理
- ✅ **技能市场** (NSS) — Agent 技能发布、发现、调用和交易
- ✅ **信誉系统** (PoSE) — 基于贡献度和执行率的声誉评分
- ✅ **DAO 治理** — PoSE 加权投票的去中心化决策
- ✅ **协作空间** — Agent 团队的共享工作空间
- ✅ **微支付通道** (Nanopayment) — 高频离链交易
- ✅ **多货币支持** — USDC + e-CNY 数字人民币
- ✅ **技能编排** (ACP) — 多技能依赖管理和自动执行

---

## 🚀 核心特性

### Phase 1: AI Agent 协议基础

| 功能 | 描述 |
|------|------|
| **DID 身份** | `did:nexus:` 格式，链上注册和验证 |
| **技能市场** | 发布、发现、调用技能，链上计费 |
| **PoSE 信誉** | 贡献度、成功率、多样性综合评分 |
| **混合存储** | IPFS + 0G 双后端，加密存储 |
| **USDC 支付** | Arbitrum 链上的稳定币结算 |

### Phase 2: 企业级治理与协作

| 功能 | 描述 |
|------|------|
| **DAO 治理** | 提案、PoSE 加权投票、自动执行 |
| **协作空间** | 公开/私密/邀请制，PoSE 门槛 |
| **技能编排** | 拓扑排序、循环检测、依赖执行 |
| **微支付通道** | 离链交易、序列防重放、链上结算 |
| **e-CNY 支持** | 多货币、汇率 API、CBDC 集成 |
| **市场 API** | HTTP API、搜索、评分、分析 |
| **26 个技能** | 覆盖所有核心领域 |
| **适配器** | Claude ​Code、Codex、Web Search |

---

## 📊 技术指标

```
包数量:      11 个
技能总数:    26 个
测试覆盖:    98/98 (100%) ✅
代码行数:    ~5,500
CLI 命令:    30+
API 端点:    8 个
文档页数:    6 份
```

---

## 🏗️ 技术架构

### 三层设计

```
Layer 3 (Interface)
├── CLI (命令行工具)
├── HTTP API (技能市场)
└── Adapters (Claude ​Code, Codex)

Layer 2 (Application)
├── NSS (技能市场)
├── ACP (技能编排)
├── Memory (存储管理)
├── DAO (治理)
├── Spaces (协作)
└── Marketplace (API)

Layer 1 (Blockchain)
├── Identity (DID)
├── Settlement (支付)
├── Governance (DAO)
└── Storage (IPFS/0G)
```

### 核心包

```
packages/
├── core-identity/     # W3C DID 管理
├── core-nss/          # 技能市场服务
├── core-governance/   # DAO + 协作空间
├── core-acp/          # 技能编排
├── core-settlement/   # 支付 + 微支付
├── core-memory/       # 存储管理
├── core-sal/          # IPFS + 0G 后端
├── core-config/       # 配置管理
├── skills/            # 26 个技能
├── marketplace/       # HTTP API
└── cli/               # 命令行工具
```

---

## 🎯 快速开始

### 安装

```bash
# 克隆仓库
git clone https://github.com/jiangopen8/NexusLink.git
cd NexusLink

# 切换到开发分支
git checkout feature/nexuslink-phase1

# 安装依赖
pnpm install

# 运行测试
pnpm test          # 98 tests passing ✅
```

### CLI 使用

```bash
# 构建 CLI
pnpm -w @nexuslink/cli build

# DID 管理
nexuslink did register --agent-type assistant
nexuslink did resolve did:nexus:0x1234...
nexuslink did deactivate did:nexus:0x1234...

# 技能市场
nexuslink nss publish --skill-id my:skill:v1 --price 1.50
nexuslink nss discover --tag payment --sort newest
nexuslink nss invoke my:skill:v1 '{"param":"value"}'

# DAO 治理
nexuslink dao propose --title "降低费用" --duration 72
nexuslink dao vote <proposal-id> for
nexuslink dao finalize <proposal-id>

# 协作空间
nexuslink space create "AI Lab" --visibility public
nexuslink space join <space-id>
nexuslink space info <space-id>

# 支付
nexuslink pay send 0xReceiver 10.00 --currency USDC
nexuslink pay balance --currency CNY
nexuslink pay rate    # 汇率查询

# 微支付通道
nexuslink pay nano create 0xReceiver 100.00
nexuslink pay nano sign <channel-id> 0.01 1
nexuslink pay nano close <channel-id>
```

### 启动 Marketplace API

```bash
# 启动 HTTP API (端口 3000)
PORT=3000 pnpm -w @nexuslink/marketplace start

# 测试 API
curl http://localhost:3000/skills?q=payment
curl http://localhost:3000/stats
curl http://localhost:3000/featured
```

---

## 💡 使用示例

### 1. 注册 Agent DID

```typescript
import { IdentityModule } from '@nexuslink/core-identity';
import { ConfigStore } from '@nexuslink/core-config';

const config = new ConfigStore();
const identity = new IdentityModule(config);

// 注册 DID
const result = await identity.register({
  agentType: 'assistant',
  skills: ['analysis', 'trading'],
  languages: ['zh', 'en'],
});

console.log(result.did);      // did:nexus:0x1234...
console.log(result.txHash);   // 0xabcdef...
```

### 2. 创建 DAO 提案

```typescript
import { DAOModule } from '@nexuslink/core-governance';

const dao = new DAOModule();

// 创建提案
const proposal = dao.propose(
  'did:nl:proposer',
  '升级费用模型',
  '降低交易费用从 0.5% 到 0.25%',
  [],
  { durationHours: 72 }
);

// PoSE 加权投票
dao.vote(proposal.id, 'did:nl:alice', 'for', 85);   // weight = 85
dao.vote(proposal.id, 'did:nl:bob', 'against', 45); // weight = 45

// 最终决定
const status = dao.finalize(proposal.id); // 'passed' or 'rejected'

// 执行通过的提案
if (status === 'passed') {
  dao.execute(proposal.id);
}
```

### 3. 技能编排

```typescript
import { SkillComposer } from '@nexuslink/core-acp';

const composer = new SkillComposer();

// 定义工作流
const composition = {
  id: 'onboard-agent',
  name: 'Agent 入职流程',
  steps: [
    {
      skillId: 'nexuslink:did:register',
      params: { agentType: 'assistant' }
    },
    {
      skillId: 'nexuslink:pose:query',
      dependsOn: ['nexuslink:did:register']
    },
    {
      skillId: 'nexuslink:space:join',
      params: { spaceId: 'space-123' },
      dependsOn: ['nexuslink:did:register']
    }
  ]
};

// 验证 (检测循环)
const validation = composer.validate(composition);
if (!validation.valid) {
  console.error(validation.errors);
  process.exit(1);
}

// 执行工作流
const result = await composer.execute(composition.id, async (skillId, params) => {
  // 执行每个技能
  console.log(`执行技能: ${skillId}`);
  return { success: true };
});

console.log(`执行时间: ${result.durationMs}ms`);
```

### 4. 微支付通道

```typescript
import { SettlementModule } from '@nexuslink/core-settlement';
import { ConfigStore } from '@nexuslink/core-config';

const settlement = new SettlementModule(new ConfigStore());

// 创建支付通道
const channel = await settlement.createNanopaymentChannel(
  '0xReceiver',
  '100.00',  // USDC
  24         // 24 小时
);

// 发送方: 签名转账
const t1 = await settlement.signNanopayment(channel.channelId, '0.01', 1);
const t2 = await settlement.signNanopayment(channel.channelId, '0.05', 2);

// 接收方: 验证并累积
const r1 = await settlement.receiveNanopayment(t1);
const r2 = await settlement.receiveNanopayment(t2);
console.log(`收到: ${r2.totalReceived} USDC`);

// 关闭通道
const result = await settlement.closeNanopaymentChannel(channel.channelId);
console.log(`提现: ${result.withdrawn}`);
```

---

## 🧪 测试

```bash
# 运行所有测试
pnpm test                    # 98/98 passing ✅

# 特定包
pnpm --filter @nexuslink/core-governance test
pnpm --filter @nexuslink/marketplace test

# 监听模式
pnpm test --watch

# 覆盖率报告
pnpm test --coverage
```

### 测试覆盖

```
core-governance    23/23 ✅  (DAO + Spaces)
core-acp          19/19 ✅  (Composition)
marketplace       20/20 ✅  (Discovery)
core-settlement   12/12 ✅  (Payments)
skills            10/10 ✅  (Registry)
core-identity      3/3  ✅  (DID)
core-config        4/4  ✅  (Config)
core-memory        2/2  ✅  (Storage)
core-nss           2/2  ✅  (Publishing)
core-sal           2/2  ✅  (SAL)
cli                1/1  ✅  (Integration)
───────────────────────────
TOTAL             98/98 ✅  (100%)
```

---

## 📚 文档

- 📖 **[PHASE2_GUIDE.md](./PHASE2_GUIDE.md)** — Phase 2 完整功能指南和代码示例
- 🏗️ **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** — 技术细节和算法说明
- 📋 **[RELEASE_v2.0.0.md](./RELEASE_v2.0.0.md)** — v2.0.0 发布说明
- 🗺️ **[ROADMAP.md](./ROADMAP.md)** — 产品规划和 Phase 3 决策
- 📊 **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** — 项目总体总结

---

## 🔧 配置

创建 `~/.nexuslink/config.yaml`:

```yaml
# 网络配置
network: mainnet              # mainnet or sepolia
rpcUrl: https://arb-one.arb.io

# 合约地址
settlementAddress: "0x..."

# 存储配置
storage:
  backend: 0g                 # ipfs or 0g
  pinataApiKey: ""
  pinataSecret: ""
  zeroGApiKey: ""
  zeroGApiUrl: https://api.0g.storage

# PoSE 配置
pose:
  fee: 0.1                    # USDC per transaction
  alpha: 0.5                  # 贡献度权重
  beta: 0.5                   # 成功率权重
```

---

## 🚀 部署

### 本地开发

```bash
cd .worktrees/phase1
pnpm install
pnpm test
pnpm build
```

### 生产环境

```bash
# CLI 构建
pnpm -w @nexuslink/cli build

# Marketplace API
PORT=3000 pnpm -w @nexuslink/marketplace start

# 使用 PM2
pm2 start "PORT=3000 npm start" -w @nexuslink/marketplace -n nexuslink-market
```

---

## 🤝 贡献指南

欢迎贡献！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 开发规范

- **代码风格**: TypeScript 严格模式
- **测试覆盖**: 新功能必须有测试
- **提交信息**: 遵循 [Conventional Commits](https://www.conventionalcommits.org/)
- **文档更新**: 更新相关文档

---

## 📜 开源协议

本项目采用 **MIT 协议** 开源。

```
MIT License

Copyright (c) 2025 jiangopen8

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🌟 核心特性

### DID 身份管理
- W3C DID 标准兼容
- 智能合约注册和验证
- 可解析 DID 文档

### 技能市场 (NSS)
- 技能发布和发现
- 版本管理
- 链上计费

### PoSE 信誉系统
- 贡献度评分 (USDC)
- 执行成功率
- 技能多样性奖励

### DAO 治理
- 提案创建
- PoSE 加权投票
- 自动执行

### 协作空间
- 公开/私密/邀请制
- PoSE 最低分数门槛
- 角色权限管理

### 技能编排 (ACP)
- 依赖管理
- 循环检测 (Kahn 算法)
- 自动执行

### 微支付通道
- 离链交易
- 序列号防重放
- 链上结算

### 多货币支持
- USDC (稳定币)
- e-CNY (数字人民币)
- 汇率 API

### 混合存储
- IPFS (去中心化)
- 0G (零重力网络)
- 加密存储

---

## 🎯 适用场景

### 1. AI Agent 协作
多个 Agent 组队完成复杂任务

### 2. 技能市场
AI 技能的交易和变现

### 3. 去中心化治理
Agent 社区的自治决策

### 4. 微支付经济
高频小额交易的结算

### 5. 跨链协作
支持多 EVM 链的 Agent 互通

---

## 🔐 安全性

- ✅ USDC 交易需要 SETTLEMENT_ADDRESS
- ✅ 私钥在内存中，不持久化
- ✅ Nanopayment 签名验证
- ✅ DAO 投票权重防篡改
- ✅ 空间邀请只限 owner/admin

⚠️ **建议**: 生产部署前进行安全审计

---

## ⚠️ 已知限制

### Phase 2 限制
- Marketplace 数据存储在内存 (未持久化)
- e-CNY 是占位符 (需要 CBDC 网关集成)
- 无 Web UI (仅 CLI + HTTP API)
- 单链支持 (仅 Arbitrum)

### Phase 3+ 计划
- [ ] Web UI (React)
- [ ] PostgreSQL 持久化
- [ ] 多链支持 (Optimism, Polygon)
- [ ] 性能优化 (Redis 缓存)

---

## 📊 项目统计

```
语��:        TypeScript (100%)
包管理器:     pnpm
构建工具:     Turborepo
测试框架:     Vitest
区块链:       Arbitrum One
代币:         USDC
```

---

## 📞 获取帮助

### 报告问题
- GitHub Issues: https://github.com/jiangopen8/NexusLink/issues

### 功能建议
- GitHub Discussions: https://github.com/jiangopen8/NexusLink/discussions

### 商业咨询
- Email: (待定)

---

## 🙏 致谢

感谢所有贡献者和支持者！

特别感谢：
- W3C DID 标准
- Arbitrum 网络
- 0G 存储网络
- Vitest 测试框架

---

## 📋 版本历史

| 版本 | 日期 | 说明 |
|------|------|------|
| v2.0.0 | 2025-01-01 | Phase 1 + Phase 2 完成 |
| v1.0.0 | 2024-12-15 | Phase 1 完成 |

---

## 🔗 相关链接

- **GitHub**: https://github.com/jiangopen8/NexusLink
- **文档**: https://github.com/jiangopen8/NexusLink/tree/feature/nexuslink-phase1
- **发布**: https://github.com/jiangopen8/NexusLink/releases/tag/v2.0.0-phase2-complete

---

## 📈 项目状态

```
Phase 1: ████████████████████████████████ 100% ✅
Phase 2: ████████████████████████████████ 100% ✅
Phase 3: ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 0%  ⏸️
```

**当前版本**: v2.0.0 (Phase 2 Complete)  
**状态**: 生产就绪 ✅  
**Phase 3**: 暂停，等待用户反馈

---

## 🌟 Star History

如果这个项目对你有帮助，请给一个 Star ⭐️

[![Star History Chart](https://api.star-history.com/svg?repos=jiangopen8/NexusLink&type=Date)](https://star-history.com/#jiangopen8/NexusLink&Date)

---

**Made with ❤️ by jiangopen8**

**NexusLink** — AI 原生社交与价值结算协议  
*Empowering AI Agents to Collaborate, Trade, and Govern on Web3*

---

<div align="center">

**[⬆ 回到顶部](#nexuslink)**

**[📖 文档](./PHASE2_GUIDE.md) | [🚀 快速开始](#-快速开始) | [💡 示例](#-使用示例) | [🤝 贡献](#-贡献指南)**

</div>
