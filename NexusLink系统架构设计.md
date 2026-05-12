# NexusLink 系统架构设计

**基于 V2.0 技术白皮书的工程实现架构**

> 版本：V1.1
> 日期：2026年5月
> 定位：本文档将 NexusLink V2.0 协议白皮书的技术设计转化为可落地的系统架构，定义从协议核心模块到 CLI 工具再到 Agent Skills 的完整工程分层，并同步当前 Phase 1 + Phase 2 实现状态。

---

## 目录

1. [架构设计哲学](#1-架构设计哲学)
2. [总体架构：三层工程分层](#2-总体架构三层工程分层)
3. [第一层：协议核心模块（Protocol Core）](#3-第一层协议核心模块)
4. [第二层：CLI 工具层（@nexuslink/cli）](#4-第二层cli-工具层)
5. [第三层：Agent Skills 层（@nexuslink/skills）](#5-第三层agent-skills-层)
6. [模块映射：白皮书 → Core → CLI → Skills](#6-模块映射白皮书--core--cli--skills)
7. [CLI 命令规范](#7-cli-命令规范)
8. [Skills 接口规范](#8-skills-接口规范)
9. [多平台适配策略](#9-多平台适配策略)
10. [当前实现状态与后续路线](#10-当前实现状态与后续路线)
11. [验证与运行基线](#11-验证与运行基线)
12. [架构合理性论证](#12-架构合理性论证)

---

## 1. 架构设计哲学

### 1.1 核心问题

NexusLink 协议定义了四层技术架构（身份记忆 → 通信交互 → 合作治理 → 价值结算），但协议规范不等于可运行的软件。需要回答：

- 协议能力如何暴露给开发者和 Agent？
- 不同消费者（人类开发者 vs Agent 平台）如何以各自最自然的方式调用协议？
- 如何确保一次实现、多处复用？

### 1.2 设计原则

| 原则 | 说明 |
|------|------|
| Unix 哲学 | 每个 CLI 命令做好一件事，通过管道和脚本组合完成复杂任务 |
| 关注点分离 | Core 不关心调用方式，CLI 不关心 Agent 平台，Skills 不关心底层实现 |
| 单一实现源 | 所有业务逻辑只在 Core 层实现一次，CLI 和 Skills 都是 Core 的薄封装 |
| 渐进式暴露 | 开发者可以只用 CLI，也可以只用 Skills，也可以直接调用 Core SDK |
| 平台无关 | Skills 层定义统一接口，各 Agent 平台（OpenClaw/Claude Code/Codex）通过适配器加载 |

### 1.3 类比：行业成熟模式

```
git (Core Library)
 ├── git CLI（开发者直接使用）
 ├── GitHub CLI / gh（平台封装）
 └── VS Code Git Extension（IDE 集成）

NexusLink (Protocol Core)
 ├── nexus CLI（开发者 / CI/CD / 脚本直接使用）
 └── @nexuslink/skills（Agent 平台加载：OpenClaw / Claude Code / Codex）
```

---

## 2. 总体架构：三层工程分层

```
┌─────────────────────────────────────────────────────────────────┐
│                    Agent 平台消费层                               │
│                                                                 │
│  ┌──────────┐  ┌──────────────┐  ┌──────────┐  ┌──────────┐   │
│  │ OpenClaw │  │ Claude Code  │  │  Codex   │  │  其他...  │   │
│  └────┬─────┘  └──────┬───────┘  └────┬─────┘  └────┬─────┘   │
│       │               │               │              │         │
│       └───────────────┼───────────────┼──────────────┘         │
│                       │               │                         │
│                       ▼               ▼                         │
├─────────────────────────────────────────────────────────────────┤
│              第三层：Agent Skills（@nexuslink/skills）            │
│                                                                 │
│  统一 Skill 接口 · 意图描述 · 参数 Schema · 平台适配器           │
│  ┌──────────────────────────────────────────────────────┐      │
│  │ did:register  did:resolve  nss:publish  nss:invoke   │      │
│  │ pose:query    contract:sign  memory:store  pay:send  │      │
│  └──────────────────────────────────────────────────────┘      │
├─────────────────────────────────────────────────────────────────┤
│              第二层：CLI 工具（@nexuslink/cli）                    │
│                                                                 │
│  独立发布 · 开发者直接调用 · CI/CD 集成 · 脚本自动化              │
│  ┌──────────────────────────────────────────────────────┐      │
│  │ nexus did    nexus nss    nexus pose    nexus contract│      │
│  │ nexus memory nexus pay    nexus space   nexus dao     │      │
│  └──────────────────────────────────────────────────────┘      │
├─────────────────────────────────────────────────────────────────┤
│              第一层：协议核心模块（@nexuslink/core）               │
│                                                                 │
│  TypeScript SDK · 全部业务逻辑 · 链上交互 · 存储抽象              │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐      │
│  │Identity│ │ Memory │ │  ACP   │ │Governan│ │Settlem │      │
│  │Module  │ │ Module │ │ Module │ │ce Mod. │ │ent Mod.│      │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘      │
│  ┌────────┐ ┌────────┐ ┌────────┐                             │
│  │  NSS   │ │  PoSE  │ │  SAL   │                             │
│  │ Module │ │ Module │ │ Module │                             │
│  └────────┘ └────────┘ └────────┘                             │
├─────────────────────────────────────────────────────────────────┤
│                      基础设施层                                  │
│  EVM 链（DID/合约/凭证） · IPFS/0G/Arweave · ACP/A2A 网络       │
└─────────────────────────────────────────────────────────────────┘
```

**数据流方向：**

```
Agent 平台 → Skills（意图解析 + 参数映射）→ Core（业务逻辑）→ 链/存储
开发者/脚本 → CLI（命令解析 + 输出格式化）→ Core（业务逻辑）→ 链/存储
```

---

## 3. 第一层：协议核心模块

### 3.1 模块划分

Core 层是所有业务逻辑的唯一实现源，按白皮书四层架构 + 横切关注点划分为 8 个模块：

| 模块 | 包名 | 职责 | 对应白皮书章节 |
|------|------|------|--------------|
| Identity | `@nexuslink/core-identity` | W3C DID 注册/解析/更新、密钥管理、意图边界 | 第3章 §3.1 |
| Memory | `@nexuslink/core-memory` | SAL 存储抽象、加密分片、向量索引、共有记忆 | 第3章 §3.2-3.3 |
| ACP | `@nexuslink/core-acp` | ACP 通信抽象、A2A 适配、消息路由、nexuslink_extension | 第4章 |
| NSS | `@nexuslink/core-nss` | 技能注册/发现/调用/组合、NSS 规范校验 | 第7章 |
| Governance | `@nexuslink/core-governance` | PoSE 计算、W3C VC 凭证签发、诺瓦克规则引擎、DAO | 第5章 |
| Settlement | `@nexuslink/core-settlement` | ERC X402 契约、USDC 转账、e-CNY 桥接 | 第6章 |
| SAL | `@nexuslink/core-sal` | 存储后端抽象（0G/IPFS/Arweave）、热切换 | 第3章 §3.2 |
| Config | `@nexuslink/core-config` | 全局配置、网络选择、密钥存储路径 | 横切 |

**当前落地状态：**

- Identity、Memory、ACP、NSS、Governance、Settlement、SAL、Config 均已拆分为独立 workspace package，并提供 CLI/Skills 调用面。
- Memory 已从早期弱混淆升级为 AES-256-GCM 加密，密文采用 `NXM1G:` 版本前缀，保留旧格式解密兼容路径；空加密密钥会被拒绝。
- SAL 当前支持 `local`、`ipfs`/Pinata、`0g`/ZeroG 三类后端。`local` 后端用于本地开发和测试，`ipfs` 与 `0g` 需要对应 API 凭证。
- Settlement 支持 USDC 链上合约路径与本地账本回退路径，扩展了 nanopayment channel 与 e-CNY 网关接口；无链上环境变量时使用本地 ledger 便于开发测试。
- 所有本地生成 ID、协作 ID、支付引用和本地 txHash 均使用 `crypto.randomUUID()` 或 `crypto.randomBytes()`，不再依赖可预测随机数。

### 3.2 模块间依赖关系

```
Settlement ──→ Governance ──→ ACP ──→ Identity
    │              │            │         │
    │              ▼            │         ▼
    │            NSS ───────────┘       Memory ──→ SAL
    │              │
    └──────────────┘
                   │
                Config（全局注入）
```

### 3.3 Core SDK 接口示例

```typescript
// @nexuslink/core-identity
interface IdentityModule {
  register(options: DIDRegisterOptions): Promise<DIDDocument>;
  resolve(did: string): Promise<DIDDocument>;
  update(did: string, patch: DIDPatch): Promise<DIDDocument>;
  deactivate(did: string): Promise<void>;
  bindOwner(agentDid: string, ownerDid: string): Promise<void>;
  setIntentBoundary(did: string, boundary: IntentBoundary): Promise<void>;
}

// @nexuslink/core-nss
interface NSSModule {
  publish(descriptor: NSSDescriptor): Promise<{ skillId: string; txHash: string }>;
  discover(intent: string, filters?: DiscoverFilters): Promise<NSSDescriptor[]>;
  invoke(skillId: string, input: any, contract?: ContractRef): Promise<SkillResult>;
  compose(pipeline: CompositionPipeline): Promise<CompositeResult>;
  validate(descriptor: NSSDescriptor): ValidationResult;
}

// @nexuslink/core-governance
interface GovernanceModule {
  queryPoSE(did: string): Promise<PoSEScore>;
  issueCredential(subject: CredentialSubject): Promise<VerifiableCredential>;
  verifyCredential(vc: VerifiableCredential): Promise<boolean>;
  evaluateCooperation(agentA: string, agentB: string): Promise<CooperationDecision>;
}
```

---

## 4. 第二层：CLI 工具层

### 4.1 设计定位

`@nexuslink/cli` 是独立发布的 npm 包，安装后提供 `nexus` 命令。面向：

- **开发者**：本地开发调试协议功能
- **CI/CD**：自动化部署 DID、发布技能、验证凭证
- **脚本**：批量操作、数据迁移、监控
- **运维**：节点管理、网络诊断

### 4.2 CLI 命令树

```
nexus
├── did                          # 身份管理（白皮书第3章）
│   ├── register                 # 注册新 DID
│   ├── resolve <did>            # 解析 DID 文档
│   ├── update <did>             # 更新 DID 文档
│   ├── deactivate <did>         # 停用 DID
│   ├── bind-owner               # 绑定主人 DID
│   ├── set-boundary             # 设置意图边界
│   └── export                   # 导出 DID 文档
│
├── nss                          # 技能管理（白皮书第7章）
│   ├── publish <descriptor>     # 发布 NSS 技能
│   ├── discover <intent>        # 按意图搜索技能
│   ├── invoke <skillId>         # 调用技能
│   ├── validate <descriptor>    # 校验 NSS 描述符
│   ├── compose <pipeline>       # 执行技能组合
│   └── list [--publisher <did>] # 列出技能
│
├── pose                         # 信誉查询（白皮书第5章）
│   ├── query <did>              # 查询 PoSE 分数
│   ├── history <did>            # 查看信誉变化历史
│   └── leaderboard [--space]    # 排行榜
│
├── credential                   # 凭证管理（白皮书第3章/第5章）
│   ├── issue <subjectDid> <claim> # 签发 W3C VC 贡献凭证
│   └── verify [--vc <json>]     # 验证凭证，也支持 stdin
│
├── contract                     # 协作契约（白皮书第4章）
│   ├── propose                  # 发起契约提案
│   ├── sign <contractId>        # 签署契约
│   ├── execute <contractId>     # 执行契约
│   ├── status <contractId>      # 查询契约状态
│   └── list [--party <did>]     # 列出契约
│
├── memory                       # 记忆管理（白皮书第3章）
│   ├── store <data>             # 存储加密记忆
│   ├── retrieve <shardId>       # 检索记忆
│   ├── sync                     # 增量同步（心智漫游）
│   ├── import <file>            # 导入存量数据（微信等）
│   ├── delete <shardId>         # 删除记忆
│   ├── status                   # 查看当前存储后端能力
│   └── switch-backend <target>  # 切换存储后端
│
├── pay                          # 支付结算（白皮书第6章）
│   ├── send <to> <amount>       # 发送 USDC/CNY
│   ├── balance [<did>]          # 查询余额
│   ├── history [--party <did>]  # 交易历史
│   ├── rate                     # 查询 USDC/CNY 汇率
│   └── nano                     # nanopayment channel
│       ├── create <receiver> <deposit>
│       ├── sign <channelId> <amount> <sequence>
│       ├── receive              # 从 stdin 接收 transfer JSON
│       ├── close <channelId>
│       ├── list [address]
│       └── info <channelId>
│
├── space                        # 协作空间（白皮书第8章）
│   ├── create <name>            # 创建协作空间
│   ├── list                     # 列出协作空间
│   ├── join <spaceId>           # 加入空间
│   ├── leave <spaceId>          # 离开空间
│   ├── members <spaceId>        # 查看成员
│   └── info <spaceId>           # 查看空间详情
│
├── acp                          # ACP 通信（白皮书第4章）
│   ├── compose                  # 技能组合编排
│   │   ├── validate <json>
│   │   ├── register <json>
│   │   ├── execute <compositionId>
│   │   └── list
│   ├── send <to> <message>      # 发送 ACP 消息
│   ├── listen                   # 监听消息
│   └── ping <did>               # 连通性测试
│
├── dao                          # DAO 管理（白皮书第5章）
│   ├── create <title>           # 创建 DAO 提案
│   ├── propose <title>          # 创建 DAO 提案
│   ├── list                     # 列出提案
│   ├── vote <proposalId>        # 投票
│   ├── status <daoId>           # DAO 状态
│   ├── info <proposalId>        # 提案详情
│   ├── members <daoId>          # 成员/投票者列表
│   └── execute <proposalId>     # 执行已通过提案
│
└── config                       # 全局配置
    ├── init                     # 初始化配置
    ├── set <key> <value>        # 设置配置项
    ├── get <key>                # 读取配置项
    └── network <name>           # 切换网络（testnet/mainnet/local）
```

### 4.3 CLI 输出格式

所有命令支持 `--format` 参数：

| 格式 | 用途 | 示例 |
|------|------|------|
| `table`（默认） | 人类可读 | 终端交互 |
| `json` | 程序消费 | 脚本/CI/CD |
| `yaml` | 配置文件 | 导出配置 |
| `quiet` | 仅返回关键值 | 管道组合 |

```bash
# 人类使用
nexus did resolve did:nexus:0xABC123

# 脚本使用
POSE=$(nexus pose query did:nexus:0xABC123 --format quiet)
if [ "$POSE" -ge 70 ]; then
  nexus contract propose --to did:nexus:0xABC123 --type instant
fi

# CI/CD 使用
nexus nss publish ./my-skill.json --format json | jq '.skillId'
```

### 4.4 CLI 架构实现

```
┌──────────────────────────────────────┐
│           nexus CLI 入口              │
│  (Commander.js / yargs 命令解析)      │
├──────────────────────────────────────┤
│         命令处理器层                   │
│  did.ts  nss.ts  pose.ts  pay.ts ... │
│  (参数校验 → 调用 Core → 格式化输出)  │
├──────────────────────────────────────┤
│         @nexuslink/core               │
│  (全部业务逻辑)                       │
└──────────────────────────────────────┘
```

每个命令处理器是 Core 模块的薄封装，职责仅限于：
1. 解析命令行参数
2. 调用对应的 Core 方法
3. 格式化输出结果
4. 处理错误和退出码

---

## 5. 第三层：Agent Skills 层

### 5.1 设计定位

`@nexuslink/skills` 是面向 Agent 平台的技能包装层。它将 Core 能力封装为符合各 Agent 平台规范的 Skill 描述，使 Agent 能够通过自然语言意图触发协议操作。CLI 和 Skills 都调用 Core，但两者互不依赖。

**关键区别：CLI vs Skills**

| 维度 | CLI | Skills |
|------|-----|--------|
| 消费者 | 人类开发者、脚本、CI/CD | Agent 平台（OpenClaw/Claude Code/Codex） |
| 调用方式 | 命令行参数 | 意图匹配 + 结构化参数 |
| 输入 | 字符串参数 + flags | JSON Schema 约束的结构化输入 |
| 输出 | 格式化文本 / JSON | 结构化结果 + 状态码 + 后续建议 |
| 上下文 | 无状态 | 可携带会话上下文、Agent DID |
| 发现方式 | `nexus --help` | 意图描述 + triggerIntent 标签 |

### 5.2 Skill 统一描述格式

每个 Skill 遵循统一的描述格式，可被任何支持该格式的 Agent 平台加载：

```json
{
  "skill": "nexuslink:did:register",
  "version": "1.0.0",
  "name": "注册 Agent DID",
  "description": "为 AI Agent 注册一个符合 W3C DID 标准的去中心化身份",

  "intent": {
    "triggerPatterns": [
      "register a new agent identity",
      "create DID for agent",
      "注册智能体身份",
      "创建 Agent DID"
    ],
    "category": "identity"
  },

  "parameters": {
    "type": "object",
    "properties": {
      "agentType": {
        "type": "string",
        "enum": ["assistant", "tool"],
        "description": "Agent 类型：助理型或工具型"
      },
      "skills": {
        "type": "array",
        "items": { "type": "string" },
        "description": "Agent 技能标签列表"
      },
      "ownerDid": {
        "type": "string",
        "description": "主人的 DID（可选，后续绑定）"
      }
    },
    "required": ["agentType"]
  },

  "returns": {
    "type": "object",
    "properties": {
      "did": { "type": "string", "description": "生成的 DID" },
      "txHash": { "type": "string", "description": "链上交易哈希" }
    }
  },

  "cliMapping": {
    "command": "nexus did register",
    "argMapping": {
      "agentType": "--type",
      "skills": "--skills",
      "ownerDid": "--owner"
    }
  },

  "examples": [
    {
      "input": { "agentType": "assistant", "skills": ["financial-analysis", "community-management"] },
      "output": { "did": "did:nexus:0xNewAgent...", "txHash": "0x..." }
    }
  ]
}
```

### 5.3 Skills 完整清单

按白皮书协议层映射，Skills 层当前注册 32 个技能：

**身份与记忆层 Skills：**

| Skill ID | 名称 | CLI 映射 | 意图触发词 |
|----------|------|---------|-----------|
| `nexuslink:did:register` | 注册 DID | `nexus did register` | "register identity", "创建身份" |
| `nexuslink:did:resolve` | 解析 DID | `nexus did resolve` | "lookup agent", "查询身份" |
| `nexuslink:did:update` | 更新 DID | `nexus did update` | "update profile", "更新能力声明" |
| `nexuslink:did:deactivate` | 停用 DID | `nexus did deactivate` | "deactivate DID", "注销身份" |
| `nexuslink:did:set-boundary` | 设置意图边界 | `nexus did set-boundary` | "set permissions", "设置自主范围" |
| `nexuslink:memory:store` | 存储记忆 | `nexus memory store` | "save memory", "记住这个" |
| `nexuslink:memory:retrieve` | 检索记忆 | `nexus memory retrieve` | "recall", "回忆" |
| `nexuslink:memory:delete` | 删除记忆 | `nexus memory delete` | "delete memory", "删除记忆" |
| `nexuslink:memory:sync` | 心智漫游同步 | `nexus memory sync` | "sync state", "同步记忆" |

**通信与交互层 Skills：**

| Skill ID | 名称 | CLI 映射 | 意图触发词 |
|----------|------|---------|-----------|
| `nexuslink:contract:propose` | 发起契约 | `nexus contract propose` | "propose cooperation", "发起合作" |
| `nexuslink:contract:sign` | 签署契约 | `nexus contract sign` | "accept contract", "同意合作" |
| `nexuslink:contract:execute` | 执行契约 | `nexus contract execute` | "execute task", "执行任务" |
| `nexuslink:space:create` | 创建协作空间 | `nexus space create` | "create space", "创建空间" |
| `nexuslink:space:join` | 加入协作空间 | `nexus space join` | "join space", "加入空间" |
| `nexuslink:acp:compose` | 技能组合编排 | `nexus nss compose` | "chain skills", "组合技能" |

**合作治理层 Skills：**

| Skill ID | 名称 | CLI 映射 | 意图触发词 |
|----------|------|---------|-----------|
| `nexuslink:nss:publish` | 发布技能 | `nexus nss publish` | "publish skill", "发布技能" |
| `nexuslink:nss:discover` | 发现技能 | `nexus nss discover` | "discover skill", "搜索技能" |
| `nexuslink:nss:invoke` | 调用技能 | `nexus nss invoke` | "use skill", "调用技能" |
| `nexuslink:pose:query` | 查询信誉 | `nexus pose query` | "check reputation", "查信誉" |
| `nexuslink:credential:issue` | 签发凭证 | `nexus credential issue` | "issue credential", "签发凭证" |
| `nexuslink:credential:verify` | 验证凭证 | `nexus credential verify` | "verify credential", "验证凭证" |
| `nexuslink:dao:propose` | DAO 提案 | `nexus dao propose` | "create proposal", "创建提案" |
| `nexuslink:dao:vote` | DAO 投票 | `nexus dao vote` | "vote proposal", "投票" |
| `nexuslink:analytics:pose` | PoSE 分析 | 内部分析能力 | "calculate pose", "分析信誉" |

**价值结算层 Skills：**

| Skill ID | 名称 | CLI 映射 | 意图触发词 |
|----------|------|---------|-----------|
| `nexuslink:pay:send` | 发送支付 | `nexus pay send` | "pay agent", "支付" |
| `nexuslink:pay:balance` | 查询余额 | `nexus pay balance` | "check balance", "查余额" |
| `nexuslink:pay:nano:create` | 创建 nanopayment channel | `nexus pay nano create` | "create nano channel", "创建微支付通道" |
| `nexuslink:pay:nano:send` | 签名 nanopayment | `nexus pay nano send` | "send nano payment", "发送微支付" |
| `nexuslink:pay:ecny` | e-CNY 支付 | `nexus pay ecny` | "pay e-CNY", "数字人民币支付" |

**平台与适配技能：**

| Skill ID | 名称 | 用途 |
|----------|------|------|
| `nexuslink:adapter:claude-code` | Claude Code 适配任务 | 面向 Claude Code 的工具格式导出与适配 |
| `nexuslink:adapter:codex` | Codex 适配任务 | 面向 Codex 的工具/API 适配 |
| `nexuslink:adapter:search` | Adapter 搜索 | 检索可用平台适配能力 |

### 5.4 Skills 层架构实现

```
┌─────────────────────────────────────────────────────────┐
│                  @nexuslink/skills                       │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Skill Registry                      │   │
│  │  加载所有 Skill 描述 → 注册到平台适配器           │   │
│  └──────────────────────┬──────────────────────────┘   │
│                         │                               │
│  ┌──────────────────────▼──────────────────────────┐   │
│  │            Skill Executor                        │   │
│  │  接收结构化参数 → 调用 Core 模块 → 返回结果       │   │
│  └──────────────────────┬──────────────────────────┘   │
│                         │                               │
│  ┌──────────────────────▼──────────────────────────┐   │
│  │          Platform Adapters                       │   │
│  │                                                  │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐        │   │
│  │  │ OpenClaw │ │  Claude  │ │  Codex   │        │   │
│  │  │ Adapter  │ │  Adapter │ │ Adapter  │        │   │
│  │  └──────────┘ └──────────┘ └──────────┘        │   │
│  └─────────────────────────────────────────────────┘   │
│                         │                               │
│  ┌──────────────────────▼──────────────────────────┐   │
│  │          @nexuslink/core（直接调用）              │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**关键设计决策：Skills 直接调用 Core，不经过 CLI。**

CLI 是 Core 的命令行封装，Skills 是 Core 的 Agent 封装。两者是 Core 的平行消费者，而非串行依赖。这避免了 Skills 调用 CLI 时的进程开销和字符串解析损耗。

```
✅ 正确架构：
  Skills → Core（直接函数调用）
  CLI    → Core（直接函数调用）

❌ 错误架构：
  Skills → CLI → Core（多余的进程间通信）
```

### 5.5 平台适配器接口

```typescript
// 平台适配器统一接口
interface PlatformAdapter {
  // 平台名称
  readonly platform: string;

  // 将 Skill 描述转换为平台特定格式
  registerSkill(skill: SkillDescriptor): Promise<void>;

  // 从平台接收调用请求，转换为统一格式
  parseInvocation(raw: any): SkillInvocation;

  // 将执行结果转换为平台特定格式
  formatResult(result: SkillResult): any;
}

// OpenClaw 适配器
class OpenClawAdapter implements PlatformAdapter {
  readonly platform = 'openclaw';

  async registerSkill(skill: SkillDescriptor) {
    // 转换为 OpenClaw Scales 格式
    // 注册到 OpenClaw 技能注册表
  }

  parseInvocation(raw: OpenClawAction): SkillInvocation {
    // 从 OpenClaw Action Call 提取参数
    return { skillId: raw.action, params: raw.parameters, context: raw.agentContext };
  }

  formatResult(result: SkillResult): OpenClawResponse {
    // 转换为 OpenClaw 响应格式
    return { status: result.success ? 'completed' : 'failed', data: result.data };
  }
}

// Claude Code 适配器
class ClaudeCodeAdapter implements PlatformAdapter {
  readonly platform = 'claude-code';

  async registerSkill(skill: SkillDescriptor) {
    // 转换为 Claude Code Tool 格式
    // 生成 JSON Schema 参数定义
  }

  parseInvocation(raw: ClaudeToolCall): SkillInvocation {
    return { skillId: raw.name, params: raw.input, context: {} };
  }

  formatResult(result: SkillResult): string {
    // Claude Code 期望文本结果
    return JSON.stringify(result.data, null, 2);
  }
}

// Codex 适配器
class CodexAdapter implements PlatformAdapter {
  readonly platform = 'codex';
  // ... 类似实现
}
```

---

## 6. 模块映射：白皮书 → Core → CLI → Skills

完整的从协议规范到工程实现的映射表：

```
┌──────────────────┬──────────────────┬──────────────────┬──────────────────┐
│   白皮书协议层     │   Core 模块       │   CLI 命令        │   Agent Skill    │
├──────────────────┼──────────────────┼──────────────────┼──────────────────┤
│                  │                  │                  │                  │
│ 第一层：身份      │ core-identity    │ nexus did *      │ did:*            │
│   W3C DID        │   register()     │   register       │   did:register   │
│   意图边界        │   resolve()      │   resolve        │   did:resolve    │
│   密钥管理        │   update()       │   update         │   did:update     │
│                  │   setIntentBound │   set-boundary   │   did:set-bound  │
│                  │                  │                  │                  │
│ 第一层：记忆      │ core-memory      │ nexus memory *   │ memory:*         │
│   SAL 存储       │   store()        │   store          │   memory:store   │
│   加密分片        │   retrieve()     │   retrieve       │   memory:retrieve│
│   心智漫游        │   syncDelta()    │   sync           │   memory:sync    │
│   后端切换        │   switchBackend()│   switch-backend │   (运维级，不暴露) │
│                  │                  │                  │                  │
│ 第二层：通信      │ core-acp         │ nexus acp *      │ acp:*            │
│   ACP 抽象       │   send()         │   send           │   acp:send       │
│   A2A 适配       │   listen()       │   listen         │   (Agent 内部)   │
│   意图路由        │   routeIntent()  │   (内部)         │   (自动)         │
│                  │                  │                  │                  │
│ 第二层：契约      │ core-acp         │ nexus contract * │ contract:*       │
│   ERC X402       │   propose()      │   propose        │   contract:prop  │
│   三类模板        │   sign()         │   sign           │   contract:sign  │
│                  │   execute()      │   execute        │   contract:exec  │
│                  │                  │                  │                  │
│ 第三层：治理      │ core-governance  │ nexus pose *     │ pose:*           │
│   PoSE 算法      │   queryPoSE()    │   query          │   pose:query     │
│   W3C VC 凭证    │   issueCredent() │ nexus credential │ credential:*     │
│   诺瓦克规则      │   evaluate()     │   (内部决策)     │   (自动)         │
│                  │                  │                  │                  │
│ 第三层：NSS      │ core-nss         │ nexus nss *      │ nss:*            │
│   技能标准        │   publish()      │   publish        │   nss:publish    │
│   技能发现        │   discover()     │   discover       │   nss:discover   │
│   技能调用        │   invoke()       │   invoke         │   nss:invoke     │
│   技能组合        │   compose()      │   compose        │   nss:compose    │
│                  │                  │                  │                  │
│ 第四层：结算      │ core-settlement  │ nexus pay *      │ pay:*            │
│   USDC 支付      │   send()         │   send           │   pay:send       │
│   余额查询        │   balance()      │   balance        │   pay:balance    │
│                  │                  │                  │                  │
│ 协作空间          │ core-governance  │ nexus space *    │ space:*          │
│   空间选择        │   joinSpace()    │   join           │   space:join     │
│                  │   listSpaces()   │   list           │   space:list     │
│                  │                  │                  │                  │
│ DAO              │ core-governance  │ nexus dao *      │ dao:*            │
│   群体选择        │   createDAO()    │   create         │   dao:create     │
│                  │   vote()         │   vote           │   dao:vote       │
└──────────────────┴──────────────────┴──────────────────┴──────────────────┘
```

**映射规则：**

1. 白皮书每个协议能力 → Core 中恰好一个方法
2. Core 每个面向用户的方法 → CLI 中恰好一个子命令
3. CLI 每个适合 Agent 使用的命令 → Skills 中恰好一个 Skill
4. 纯运维/内部命令（如 `switch-backend`、`listen`）不暴露为 Skill
5. 自动化决策逻辑（意图路由、诺瓦克规则）在 Agent 运行时自动执行，不暴露为显式 Skill

---

## 7. CLI 命令规范

### 7.1 命令设计规范

```bash
nexus <domain> <action> [arguments] [--flags]
```

**命名约定：**
- domain：名词（did, nss, pose, pay, memory, contract, space, dao, acp, config）
- action：动词（register, publish, query, send, list, verify）
- 全局 flags：`--network`, `--format`, `--verbose`, `--config`

### 7.2 核心命令详细规范

**`nexus did register` — 注册 Agent DID**

```bash
nexus did register \
  --type assistant \
  --skills "financial-analysis,community-management" \
  --languages "zh-CN,en" \
  --owner did:nexus:0xOwner456 \
  --network testnet

# 输出（table 格式）
┌──────────────────────────────────────────┐
│ DID Registration                         │
├──────────┬───────────────────────────────┤
│ DID      │ did:nexus:0xABC123...         │
│ Type     │ assistant                      │
│ Owner    │ did:nexus:0xOwner456...        │
│ Skills   │ financial-analysis, community  │
│ Network  │ testnet                        │
│ Tx Hash  │ 0x7f3a...                      │
└──────────┴───────────────────────────────┘
```

**`nexus nss publish` — 发布 NSS 技能**

```bash
nexus nss publish ./financial-analysis.nss.json \
  --network testnet

# 或通过 stdin
cat skill.json | nexus nss publish --stdin
```

**`nexus nss discover` — 按意图发现技能**

```bash
nexus nss discover "financial analysis" \
  --min-pose 70 \
  --max-price "1 USDC" \
  --limit 10

# 输出
┌────┬──────────────────────────┬───────┬───────────┬──────────┐
│ #  │ Skill ID                 │ PoSE  │ Price     │ Calls    │
├────┼──────────────────────────┼───────┼───────────┼──────────┤
│ 1  │ nss://financial-v2       │ 95    │ 0.5 USDC  │ 1,247    │
│ 2  │ nss://fin-report-v1      │ 82    │ 0.3 USDC  │ 856      │
│ 3  │ nss://budget-analyzer    │ 78    │ 0.8 USDC  │ 423      │
└────┴──────────────────────────┴───────┴───────────┴──────────┘
```

**`nexus pose query` — 查询 PoSE 信誉**

```bash
nexus pose query did:nexus:0xABC123

# 输出
┌──────────────────────────────────────────┐
│ PoSE Report: did:nexus:0xABC123          │
├──────────────┬───────────────────────────┤
│ Score        │ 87 (可信合作者)            │
│ Contribution │ 230 USDC (α=0.4)          │
│ Success Rate │ 93.6% (β=0.4)             │
│ Disputes     │ 2.1% (γ=0.2)             │
│ Total Tasks  │ 47                        │
│ Top Skills   │ financial-analysis (92%)   │
│ Member Since │ 2025-03-01                │
└──────────────┴───────────────────────────┘
```

### 7.3 CLI 配置文件

```yaml
# ~/.nexuslink/config.yaml
network: testnet
defaultDid: did:nexus:0xMyAgent
storage:
  backend: ipfs
  pinataApiKey: "pk_..."
  pinataSecret: "sk_..."
output:
  format: table
  color: true
wallet:
  keystore: ~/.nexuslink/keystore
  defaultAccount: 0x...
```

---

## 8. Skills 接口规范

### 8.1 Skill 生命周期

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  注册     │ →  │  发现     │ →  │  调用     │ →  │  结果     │
│ Register │    │ Discover │    │ Invoke   │    │ Return   │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
     │               │               │               │
     ▼               ▼               ▼               ▼
 平台启动时       Agent 意图       参数校验 →      结构化结果
 批量注册        匹配 Skill       Core 调用      + 后续建议
```

### 8.2 Skill 调用协议

```typescript
// Skill 调用请求
interface SkillInvocation {
  skillId: string;                    // e.g., "nexuslink:did:register"
  params: Record<string, any>;        // 结构化参数
  context?: {
    callerDid?: string;               // 调用方 Agent DID
    sessionId?: string;               // 会话 ID
    intentText?: string;              // 原始意图文本
  };
}

// Skill 执行结果
interface SkillResult {
  success: boolean;
  data: Record<string, any>;          // 结构化返回数据
  message: string;                    // 人类可读描述
  suggestions?: string[];             // 后续操作建议
  relatedSkills?: string[];           // 相关 Skill 推荐
}
```

### 8.3 Skill 注册示例（各平台）

**OpenClaw 注册：**

```typescript
import { NexusLinkSkills } from '@nexuslink/skills';
import { OpenClawAdapter } from '@nexuslink/skills/adapters/openclaw';

const skills = new NexusLinkSkills({
  core: nexusCoreInstance,
  adapter: new OpenClawAdapter({ apiKey: '...' })
});

// 批量注册所有 Skills 到 OpenClaw
await skills.registerAll();
```

**Claude Code 注册（作为 Tool）：**

```typescript
import { NexusLinkSkills } from '@nexuslink/skills';
import { ClaudeCodeAdapter } from '@nexuslink/skills/adapters/claude-code';

const skills = new NexusLinkSkills({
  core: nexusCoreInstance,
  adapter: new ClaudeCodeAdapter()
});

// 导出为 Claude Code Tool 定义
const toolDefinitions = skills.exportAsTools();
// → 生成符合 Claude Code Tool Schema 的 JSON
```

**Codex 注册：**

```typescript
import { NexusLinkSkills } from '@nexuslink/skills';
import { CodexAdapter } from '@nexuslink/skills/adapters/codex';

const skills = new NexusLinkSkills({
  core: nexusCoreInstance,
  adapter: new CodexAdapter()
});

await skills.registerAll();
```

---

## 9. 多平台适配策略

### 9.1 适配器模式

```
                    ┌─────────────────────┐
                    │  Skill Descriptor   │
                    │  (统一格式)          │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
    ┌─────────────────┐ ┌──────────────┐ ┌──────────────┐
    │ OpenClaw Adapter│ │Claude Adapter│ │Codex Adapter │
    │                 │ │              │ │              │
    │ → Scales 格式   │ │ → Tool 格式  │ │ → Plugin 格式│
    │ → Action Call   │ │ → Function   │ │ → API Call   │
    │ → WebAssembly   │ │   Calling    │ │              │
    └─────────────────┘ └──────────────┘ └──────────────┘
```

### 9.2 各平台特性对照

| 特性 | OpenClaw | Claude Code | Codex |
|------|----------|-------------|-------|
| Skill 格式 | Scales (WASM) | Tool (JSON Schema) | Plugin (API) |
| 调用方式 | Action Call | Function Calling | API Request |
| 参数传递 | 结构化 JSON | JSON Schema 约束 | REST/JSON |
| 结果格式 | 结构化响应 | 文本 + 结构化 | JSON |
| 上下文传递 | Agent Context | Conversation | Session |
| 发现机制 | 技能注册表 | Tool 列表 | Plugin Store |

### 9.3 新平台接入流程

当新的 Agent 平台出现时，只需实现一个 `PlatformAdapter`：

```typescript
// 1. 实现适配器接口
class NewPlatformAdapter implements PlatformAdapter {
  readonly platform = 'new-platform';
  async registerSkill(skill: SkillDescriptor) { /* ... */ }
  parseInvocation(raw: any): SkillInvocation { /* ... */ }
  formatResult(result: SkillResult): any { /* ... */ }
}

// 2. 注册到 Skills 层
const skills = new NexusLinkSkills({
  core: nexusCoreInstance,
  adapter: new NewPlatformAdapter()
});

// 3. 所有 NexusLink Skills 自动可用
await skills.registerAll();
```

新平台接入成本：**一个适配器文件**，约 100-200 行代码。

---

## 10. 当前实现状态与后续路线

### 10.1 已落地范围

| 阶段 | 状态 | 已落地范围 |
|------|------|-----------|
| Phase 1：Core + CLI 基础 | 已完成 | Identity、Memory、ACP、NSS、Governance、Settlement、SAL、Config 基础模块；CLI 主命令；OpenClaw/Claude Code/Codex 适配器基础 |
| Phase 2：治理、编排、结算扩展 | 已完成 | 0G/SAL 后端、技能编排、DAO、协作空间、nanopayments、e-CNY 网关接口、marketplace HTTP API、32 个注册技能 |
| Phase 3：生态扩展 | 待业务需求驱动 | 第三方 Adapter 生态、Skill 组合市场、高级 DAO 治理、SAL 智能路由、跨链互操作 |

### 10.2 当前 package 边界

| 交付物 | 当前职责 |
|--------|----------|
| `@nexuslink/core-config` | 全局配置、网络、RPC、默认 DID、存储配置 |
| `@nexuslink/core-identity` | DID 注册、解析、更新、停用、主人绑定、意图边界 |
| `@nexuslink/core-sal` | `local`、IPFS/Pinata、0G 存储后端抽象 |
| `@nexuslink/core-memory` | AES-256-GCM 加密记忆、索引、检索、删除、同步 |
| `@nexuslink/core-acp` | ACP 消息、协作契约、技能组合编排 |
| `@nexuslink/core-nss` | NSS 描述符发布、发现、调用、校验 |
| `@nexuslink/core-governance` | PoSE、VC、DAO、协作空间 |
| `@nexuslink/core-settlement` | USDC、本地 ledger、nanopayments、e-CNY 网关接口 |
| `@nexuslink/marketplace` | 技能市场搜索、评分、分析 HTTP API |
| `@nexuslink/skills` | 32 个 Skill 描述、执行器、OpenClaw/Claude Code/Codex 适配器 |
| `@nexuslink/cli` | 开发者命令行入口，直接调用 Core 并输出 table/json/yaml/quiet |
| `@nexuslink/contracts` | DIDRegistry、NSSRegistry、Settlement 合约与 Hardhat 测试/部署脚本 |

### 10.3 当前边界与后续优化

| 领域 | 当前边界 | 后续优化 |
|------|----------|----------|
| e-CNY | 当前是网关接口和本地模拟账本 | 接入真实 CBDC/合规支付网关 |
| ACP 网络 | 当前以本地/HTTP 抽象和技能编排为主 | 引入 libp2p 或更完整的 A2A 网络传输 |
| Marketplace | 当前是 HTTP API 与链上注册表能力 | 视需求增加前端 UI、搜索索引持久化和链上验证展示 |
| Hardhat | 当前使用 Hardhat 2.x，Node 25 会出现兼容警告 | 推荐 Node 20/22；后续评估 Hardhat 3 迁移 |
| SAL 路由 | 当前由配置显式选择后端 | 后续增加基于成本、延迟、数据类型的智能路由 |

---

## 11. 验证与运行基线

### 11.1 工具链基线

| 项目 | 当前要求 |
|------|----------|
| Node.js | `>=20 <23`，建议 Node 20/22 LTS |
| pnpm | `>=10`，当前 packageManager 为 `pnpm@10.30.2` |
| TypeScript | `^5.9.3` |
| Turbo | `^2.9.9` |
| Vitest | `^4.1.5` + `@vitest/coverage-v8` |
| Hardhat | `^2.28.6`，Solidity `0.8.24` |

### 11.2 质量门禁

| 命令 | 最近验证结果 |
|------|--------------|
| `turbo run lint --force` | 21/21 tasks successful |
| `turbo run build --force` | 12/12 packages successful |
| `turbo run test --force` | 24/24 tasks successful |
| `pnpm --filter @nexuslink/cli test` | 7/7 passed |
| `vitest run` | 14 个 TS test files，112 个 TS tests passed |
| `pnpm test:simulation` | 1 个端到端架构模拟场景通过 |
| `pnpm audit --audit-level moderate` | passed |

当前源码中共有 119 个 `it()` 测试用例，其中 TS/Vitest 覆盖 112 个，合约/Hardhat 覆盖 7 个。最近一次覆盖率统计为 Statements 78.60%、Lines 82.71%。针对 `packages`、`src`、`contracts` 源码范围的常规扫描未发现 `TODO`、`FIXME`、`NOT_IMPLEMENTED`、`placeholder`、`stub`、`skip`、`only` 等未完成标记。

### 11.3 安全与依赖状态

- Memory 加密使用 AES-256-GCM；密文带 `NXM1G:` 版本前缀，旧 XOR 格式仅用于历史数据读取兼容。
- 随机标识和本地交易哈希使用 Node crypto，不使用 `Math.random()` 生成安全相关 ID。
- 依赖升级和 `pnpm.overrides` 已清理 high/moderate 级别 audit 风险。
- `pnpm audit` 仍可能报告 Hardhat 2.x 传递依赖中的 low 级别风险，当前不阻塞 moderate 级质量门禁，后续通过 Hardhat 3 迁移评估处理。

### 11.4 模拟测试发现并修复的问题

| 问题 | 影响 | 处理结果 |
|------|------|----------|
| Claude Code 工具名导出为短名后无法解析回完整 Skill ID | Claude 调用 `nss_invoke` 时执行器找不到 `nexuslink:nss:invoke` | Claude adapter 增加短名/完整 ID 双向映射 |
| `ACPModule.execute()` 只返回 `{ success: true }` | 调用方无法直接拿到执行后的合约状态 | 改为返回更新后的 `ContractProposal` |
| CLI `acp compose` 使用进程内 composer | `register` 后新进程 `list/execute` 看不到组合 | 使用 `~/.nexuslink/acp-compositions.json` 持久化 |
| Nanopayment channel 只存在内存中 | CLI `nano create` 后新进程 `nano sign/info/list` 找不到 channel | 将 channel 与 transfer 写入本地 settlement ledger |
| CLI 包测试只构建自身 | 子进程可能使用旧的依赖包 `dist` | CLI test 脚本改为先构建 CLI 及依赖包 |
| `pay nano sign --format json` 混入 success 文本 | JSON 消费方无法稳定解析输出 | 结构化模式下只输出 JSON |

---

## 12. 架构合理性论证

### 12.1 为什么是 Core → CLI → Skills 三层，而不是两层？

**如果只有 Core + Skills（没有 CLI）：**
- 开发者调试协议功能需要写代码，无法快速验证
- CI/CD 集成需要自己封装脚本
- 运维操作（切换网络、迁移存储）没有便捷工具

**如果只有 Core + CLI（没有 Skills）：**
- Agent 平台需要自己解析 CLI 输出，脆弱且低效
- 每个 Agent 平台都要自己做意图匹配和参数映射
- 无法利用 Agent 平台的原生能力（上下文传递、会话管理）

**三层架构的价值：**

```
Core  = 唯一的业务逻辑实现（DRY 原则）
CLI   = 面向人类的接口（开发者体验）
Skills = 面向 Agent 的接口（Agent 体验）
```

### 12.2 为什么 Skills 直接调用 Core 而不是调用 CLI？

| 方案 | 延迟 | 可靠性 | 类型安全 |
|------|------|--------|---------|
| Skills → Core（函数调用） | ~1ms | 高（无序列化） | 完整 TypeScript 类型 |
| Skills → CLI → Core（进程调用） | ~50ms | 低（字符串解析） | 无类型保证 |

Skills 和 CLI 是 Core 的两个平行消费者，不存在依赖关系。这也意味着 CLI 可以独立发布和升级，不影响 Skills 层。

### 12.3 为什么用适配器模式而不是为每个平台写一套 Skills？

```
没有适配器：3 个平台 × 32 个 Skills = 96 套实现
有适配器：  32 个 Skill 定义 + 3 个适配器 = 35 套实现
```

这正是白皮书中 ACP 解决 M×N 问题的工程化体现——Skills 层自身也遵循 M+N 原则。

### 12.4 行业对标

| 项目 | Core | CLI | Agent/Plugin 层 |
|------|------|-----|-----------------|
| NexusLink | @nexuslink/core | nexus CLI | @nexuslink/skills |
| Git | libgit2 | git CLI | VS Code Extension / GitHub CLI |
| Terraform | terraform-core | terraform CLI | Provider Plugins |
| Docker | containerd | docker CLI | Docker Desktop / Compose |
| Stripe | stripe-node | stripe CLI | Stripe Apps |

NexusLink 的 Core → CLI → Skills 分层与这些成熟项目的架构模式完全一致。

### 12.5 风险与缓解

| 风险 | 缓解措施 |
|------|---------|
| Core API 变更导致 CLI 和 Skills 同时受影响 | 语义化版本控制 + Core 接口稳定性承诺，公共 API 变更必须同步 CLI、Skills 与测试 |
| 适配器维护成本随平台增多而增长 | 适配器接口极简（3 个方法），社区可贡献第三方适配器 |
| Skills 意图匹配不准确 | triggerPatterns 支持多语言多表述，结合 Agent 平台自身的意图理解能力 |
| CLI 和 Skills 功能不同步 | 自动化测试确保每个 Core 方法都有对应的 CLI 命令和 Skill |

---

> **总结：** Core → CLI → Skills 的三层架构是 NexusLink 协议从规范到产品的工程化路径。Core 保证业务逻辑的单一实现源，CLI 服务人类开发者，Skills 服务 Agent 平台。三层通过清晰的接口边界解耦，通过适配器模式实现平台无关性，与 Git、Terraform、Docker 等成熟项目的架构模式一脉相承。
