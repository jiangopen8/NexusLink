# 优惠/机会情报站 MVP 架构与商业化方案

生成日期：2026-05-06

## 一句话定位

做一个“合法、可订阅、可分发”的优惠/机会情报站：自动发现公开渠道中的优惠、限免、补贴、抽奖、活动、返佣机会，用 AI 去重、评分、摘要，再通过网站、邮件、Telegram/Discord、Twitter/X 等渠道分发，靠会员订阅、联盟返佣、赞助位和 B2B 情报报告变现。

核心原则：不做秒杀抢购、不绕验证码、不多账号、不突破平台风控、不代替用户违规参加抽奖。只做信息发现、整理、提醒、合规分发和成交转化。

## 目标用户

### 第一批用户

- 独立开发者、AI 工具重度用户：关心 SaaS、AI 工具、云服务、开发者工具优惠。
- 数码/软件消费人群：关心限免、优惠券、返现、补货、官方活动。
- 小型团队和创业者：关心云服务 credits、创业扶持计划、工具折扣。

### 不建议 MVP 初期覆盖的人群

- 纯羊毛党：转化低，投诉和合规风险高。
- 票务、演唱会、限量鞋服、显卡等高对抗品类：容易踩到平台规则和反机器人风险。
- 需要大量个人身份信息才能参与的抽奖或补贴：隐私和诈骗风险较高。

## MVP 选题建议

优先选择“AI/SaaS/开发者工具优惠情报站”。

原因：

- 信息源公开，适合自动采集。
- 用户付费意愿相对更高。
- 联盟返佣和赞助位更自然。
- 不需要做对抗型抢购。
- 和你现有 Codex + skills 集合高度匹配。

可扩展的子栏目：

- 今日 AI/SaaS 优惠
- 免费 credits 和创业扶持
- 限时 lifetime deal
- 开发者工具折扣
- 正规 no-purchase sweepstakes
- 数码/软件限免
- 黑五、Cyber Monday、Prime Day 等专题页

## 合规边界

### 明确不做

- 不自动下单抢购。
- 不绕过登录、验证码、排队页、设备指纹、购买限制。
- 不做多账号注册、批量参加抽奖、虚假身份提交。
- 不抓取需要登录后才可访问且条款禁止自动化的内容。
- 不发布未经验证的“必中”“保赚”“内部券”类诱导文案。

### 必须做

- 每条机会保留原始来源链接。
- 标记是否含联盟链接或赞助关系。
- 对抽奖类机会标注地区、截止日期、是否 no purchase necessary、是否需要购买。
- 对高风险机会打“需人工确认”标签。
- 商业邮件保留退订入口和发件方信息。
- 对用户提交的邮箱、偏好、点击行为做最小化存储。

### 参考规则

- FTC Endorsement Guides 要求有经济关系时做清楚披露，尤其是联盟链接、赞助、返佣内容。
- FTC CAN-SPAM 指南要求商业邮件不能误导，需提供退订方式和有效地址。
- FTC 对真实 sweepstakes 的提醒：真实奖品通常免费，付费领取奖品或付费提高中奖概率是高风险信号。
- FTC BOTS Act 涉及绕过票务购买限制和访问控制的机器人风险，票务类自动抢购不应作为本项目方向。

## MVP 产品形态

### 第一阶段界面

- 一个公开网站：展示每日机会流。
- 一个邮件 newsletter：每日或每周发送精选机会。
- 一个 Telegram/Discord/Slack 频道：推送高分机会。
- 一个管理后台：审核、编辑、置顶、标记过期。

### 页面结构

- 首页：今日精选、分类筛选、搜索。
- 机会详情页：摘要、原始来源、领取方式、风险提示、过期时间、标签。
- 分类页：AI 工具、SaaS、开发者、数码、抽奖、限免。
- 订阅页：免费版、Pro 版、团队版。
- 透明披露页：联盟链接、赞助内容、数据来源、免责声明。

## 系统架构

```text
公开信息源
  -> 采集层
  -> 清洗/解析层
  -> 去重/归一化层
  -> AI 摘要与评分层
  -> 人工审核队列
  -> 内容数据库
  -> 分发层
  -> 分析与变现层
```

### 1. 信息源层

MVP 先接 30 到 80 个来源，避免一开始做全网爬。

来源类型：

- 官方博客、公告页、pricing 页面。
- AppSumo、Product Hunt、Hacker News、Reddit 相关板块。
- SaaS 官网优惠页、startup program 页面。
- 品牌活动页、no-purchase sweepstakes 页面。
- Deal 网站、coupon 网站、newsletter。
- Twitter/X、LinkedIn、Telegram、Discord 公开频道。
- Google Search 查询结果，例如 `site:example.com promo code`、`AI tool discount`。

信息源字段：

| 字段 | 说明 |
|---|---|
| source_id | 来源 ID |
| source_name | 来源名称 |
| source_type | 官网、RSS、搜索、社媒、newsletter、社区 |
| url | 来源 URL |
| crawl_frequency | 采集频率 |
| trust_level | 来源可信度 |
| allowed_mode | RSS/API/公开页面/人工录入 |
| notes | 风险和备注 |

### 2. 采集层

优先顺序：

1. RSS、官方 API、newsletter 转发邮箱。
2. 静态公开页面抓取。
3. 搜索引擎结果监控。
4. 社媒公开信息监控。
5. 手工提交和用户爆料。

可用 skills：

| 需求 | 可用 skills |
|---|---|
| 网页采集 | `firecrawl-automation`, `apify-automation`, `browseai-automation`, `scrapingbee-automation`, `scrapfly-automation` |
| 搜索发现 | `serpapi-automation`, `tavily-automation`, `exa-automation`, `yousearch-automation` |
| 社媒/公开数据 | `phantombuster-automation`, `typefully-automation`, `ayrshare-automation` |
| 邮件来源 | `agent-mail-automation`, `gmail` via `connect` |
| 表格同步 | `googlesheets`, `excel-automation`, `airtable` via `connect` |

采集策略：

- 每个来源单独设置频率，不做高频冲击。
- 每次采集记录 HTTP 状态、内容 hash、标题 hash。
- 只抓必要字段和正文摘要，不长期保存无关页面全文。
- 对登录、验证码、限速、robots 限制明显的站点降级为人工来源。

### 3. 清洗与解析层

输入：HTML、RSS、搜索结果、邮件、社媒帖子。

输出统一为 `raw_opportunities`。

核心处理：

- 提取标题、正文、链接、图片、发布时间。
- 识别金额、折扣、优惠码、截止时间。
- 识别地域限制、资格要求、是否新用户限定。
- 抽奖类识别奖品、价值、参与方式、是否免费参与。
- 删除导航、广告、重复模板文本。

### 4. 去重与归一化层

同一个机会可能出现在官网、Twitter/X、Reddit、newsletter 多个来源。

去重规则：

- URL canonical 去重。
- 标题相似度去重。
- 品牌 + 优惠码 + 截止时间组合去重。
- AI 语义相似度辅助去重。

合并规则：

- 官方来源优先级最高。
- 多个来源互相验证时提高可信度。
- 过期时间冲突时进入人工审核。

### 5. AI 摘要与评分层

AI 负责把原始机会变成可读、可排序、可推送的情报条目。

生成字段：

| 字段 | 说明 |
|---|---|
| title | 面向用户的标题 |
| summary | 1 到 3 句摘要 |
| category | 分类 |
| value_score | 价值评分 0 到 100 |
| urgency_score | 紧急程度 0 到 100 |
| trust_score | 可信度 0 到 100 |
| risk_level | low/medium/high |
| action_steps | 用户如何领取 |
| disclosure_needed | 是否需要返佣/赞助披露 |
| human_review_required | 是否必须人工审核 |

评分示例：

```text
final_score =
  value_score * 0.35 +
  trust_score * 0.25 +
  urgency_score * 0.20 +
  category_fit * 0.10 +
  source_reputation * 0.10 -
  risk_penalty
```

高风险规则：

- 要求支付才能领奖：高风险。
- 要求 SSN、银行卡、敏感身份信息：高风险。
- 来源不是官方且承诺“必中”“内部名额”：高风险。
- 优惠码无法验证：中风险。
- 截止时间不明确：中风险。

### 6. 人工审核层

MVP 不建议全自动发布。所有 `final_score >= 70` 的机会进入待发布队列，人工点选发布。

审核动作：

- 发布
- 编辑后发布
- 标记过期
- 标记诈骗/风险
- 合并重复
- 加入赞助/联盟披露

后台最小字段：

- 标题
- 摘要
- 来源链接
- 评分
- 截止日期
- 标签
- 风险原因
- 发布渠道勾选

### 7. 内容数据库

推荐 MVP 数据表：

#### sources

| 字段 | 类型 | 说明 |
|---|---|---|
| id | uuid | 来源 ID |
| name | text | 来源名 |
| url | text | 来源地址 |
| type | text | RSS/API/HTML/Search/Social/Email/Manual |
| trust_level | int | 1 到 5 |
| crawl_frequency | text | hourly/daily/weekly |
| status | text | active/paused/error |

#### raw_items

| 字段 | 类型 | 说明 |
|---|---|---|
| id | uuid | 原始条目 ID |
| source_id | uuid | 来源 |
| raw_url | text | 原始链接 |
| raw_title | text | 原始标题 |
| raw_content | text | 清洗后的正文 |
| content_hash | text | 去重 hash |
| fetched_at | timestamp | 抓取时间 |

#### opportunities

| 字段 | 类型 | 说明 |
|---|---|---|
| id | uuid | 机会 ID |
| title | text | 标题 |
| summary | text | 摘要 |
| category | text | 分类 |
| original_url | text | 原始链接 |
| merchant | text | 品牌/商家 |
| offer_type | text | coupon/freebie/sweepstakes/credit/event/deal |
| value_estimate | text | 价值估计 |
| expires_at | timestamp | 截止时间 |
| final_score | int | 综合评分 |
| risk_level | text | 风险等级 |
| status | text | draft/review/published/expired/rejected |
| affiliate_url | text | 联盟链接，可空 |
| disclosure | text | 披露文案 |

#### subscribers

| 字段 | 类型 | 说明 |
|---|---|---|
| id | uuid | 用户 ID |
| email | text | 邮箱 |
| tier | text | free/pro/team |
| preferences | json | 分类偏好 |
| frequency | text | daily/weekly/realtime |
| created_at | timestamp | 注册时间 |

#### events

| 字段 | 类型 | 说明 |
|---|---|---|
| id | uuid | 事件 ID |
| user_id | uuid | 用户，可空 |
| opportunity_id | uuid | 机会 |
| event_type | text | view/click/save/share/subscribe |
| channel | text | web/email/telegram/twitter |
| created_at | timestamp | 时间 |

## 推荐技术栈

### 极简 MVP

- 前端：Next.js 或 Astro
- 数据库：Supabase Postgres
- 后台：Supabase Studio + 简单 Admin 页面
- 定时任务：GitHub Actions、Vercel Cron 或 Supabase Edge Functions
- 邮件：MailerLite、Resend、Customer.io
- 推送：Telegram Bot、Discord Webhook、Slack Webhook
- 支付：Stripe、Gumroad、Lemon Squeezy
- 分析：Plausible、Umami、PostHog

### 为什么这样选

- 成本低。
- 部署快。
- Codex 容易维护。
- 后续能从半自动过渡到自动化。
- 数据结构清晰，容易做推荐、订阅和商业化。

## Skills 使用映射

### 发现与采集

- `firecrawl-automation`：抓取官方页面和活动页。
- `apify-automation`：跑公开网页采集 Actor。
- `serpapi-automation`：监控搜索结果。
- `tavily-automation`：做主题搜索和研究。
- `phantombuster-automation`：公开社媒/线索类数据采集。

### 内容处理

- `openai-automation`：摘要、分类、风险判断、标题重写。
- `content-research-writer`：把机会改写成短文、newsletter、社媒帖子。
- `image-enhancer`：处理配图或截图。

### 发布分发

- `typefully-automation`：Twitter/X 线程或短帖发布。
- `ayrshare-automation`：多平台社媒分发。
- `mailer`/`mailerlite-automation`/`customerio-automation`：邮件推送。
- `slackbot-automation`/`discordbot-automation`：社群推送。

### 数据与运营

- `googlesheets` via `connect`：早期人工审核表格。
- `notion` via `connect`：内部内容库。
- `google-analytics` 或 `microsoft-clarity-automation`：行为分析。
- `gumroad-automation`/`lemon-squeezy-automation`/`stripe` via `connect`：会员和数字产品售卖。

## 发布渠道设计

### 免费渠道

- 网站公开列表：延迟 12 到 24 小时展示。
- Twitter/X：每天 3 到 5 条精选。
- Telegram/Discord：每天 5 到 10 条。
- 免费 newsletter：每周精选。

### 付费渠道

- 实时提醒：高分机会即时推送。
- Pro newsletter：每日完整列表。
- 私密 Telegram/Discord：更早、更细分类、更高信噪比。
- 团队版：按分类、关键词、预算、地区做定制提醒。

## 商业化模型

### 1. 联盟返佣

适合：

- SaaS 工具
- 云服务 credits
- 软件订阅
- 数码电商
- 教育课程

做法：

- 原始链接保留。
- 有返佣的链接使用联盟链接。
- 明确标记“可能获得佣金”。
- 不因返佣改变排序，或明确说明排序逻辑。

优点：启动快，用户无感。

风险：需要披露，不能为了佣金推荐低质量机会。

### 2. 订阅会员

建议定价：

| 版本 | 价格 | 内容 |
|---|---:|---|
| Free | $0 | 每周精选、延迟展示、部分分类 |
| Pro | $9 到 $19/月 | 每日完整列表、实时提醒、收藏、关键词订阅 |
| Team | $49 到 $199/月 | 多成员、Slack/Discord 推送、定制来源、导出 |

MVP 先验证 `Pro $9/月` 是否有人愿意付费。

### 3. 赞助位

形式：

- newsletter 顶部赞助。
- 分类页赞助。
- 每周专题赞助。
- 品牌活动专栏。

要求：

- 明确标注 sponsored。
- 不伪装成独立推荐。
- 赞助内容仍走基础风险审核。

### 4. B2B 情报报告

卖给：

- SaaS 公司
- 联盟营销团队
- 增长团队
- VC/孵化器
- 创业社群

报告示例：

- 本周 AI 工具优惠趋势
- 竞品促销监控
- 开发者工具 credits 数据库
- 黑五 SaaS 折扣报告
- 某垂直行业活动和赠品日历

定价：

- 单份报告：$29 到 $99
- 月度报告：$199 到 $999/月
- 定制监控：$500 到 $3000/月

### 5. API 或数据授权

后期再做，不建议 MVP 一开始做。

可卖给：

- Deal app
- Newsletter 作者
- 社群运营者
- 消费者工具插件

## 关键指标

### 内容指标

- 每日新增机会数
- 通过审核比例
- 过期/失效比例
- 重复率
- 高风险拦截数

### 用户指标

- 邮件订阅转化率
- 打开率
- 点击率
- 退订率
- 免费转付费率
- 每用户每周点击次数

### 商业指标

- 联盟点击收入
- 每千封邮件收入
- 付费订阅 MRR
- 赞助位售出率
- CAC 和 LTV

## 7 天 MVP 落地计划

### Day 1：确定细分领域和 50 个来源

- 选择 `AI/SaaS/开发者工具优惠` 作为第一期。
- 建一个 sources 表。
- 手工录入 50 个来源。
- 给每个来源标记可信度和采集方式。

### Day 2：搭建采集和清洗流程

- 用 Firecrawl/Apify/SerpAPI 跑前 10 个来源。
- 产出 raw_items。
- 建立内容 hash 和 URL 去重。
- 对无法稳定采集的来源改为人工录入。

### Day 3：AI 摘要、分类和评分

- 写一套固定 prompt。
- 产出 title、summary、category、risk_level、final_score。
- 建立高风险拦截规则。
- 抽样检查 50 条结果。

### Day 4：人工审核后台

- 用 Supabase Studio 或简单 Admin 页面做审核。
- 支持发布、拒绝、标记过期、编辑摘要。
- 发布后的内容进入 opportunities 表。

### Day 5：网站和详情页

- 做首页机会流。
- 做分类筛选和搜索。
- 做机会详情页。
- 加入联盟/赞助披露组件。

### Day 6：分发和订阅

- 接邮件订阅。
- 接 Telegram/Discord 推送。
- 接 Twitter/X 发布草稿。
- 免费版每天推送 5 条精选。

### Day 7：变现验证

- 上线 Pro 候补名单或 $9/月早鸟。
- 放 2 到 3 个联盟链接。
- 联系 20 个 SaaS 品牌询问赞助位。
- 发布第一期周报。

## 14 天增强计划

- 加关键词订阅。
- 加实时提醒。
- 加收藏和已领取标记。
- 加来源健康监控。
- 加失效链接检测。
- 加赞助内容后台。
- 加推荐得分解释。
- 加“仅官方来源”筛选。
- 加团队 Slack/Discord webhook。

## MVP 目录结构建议

```text
opportunity-intel/
  app/
    page.tsx
    opportunities/[id]/page.tsx
    categories/[slug]/page.tsx
    admin/page.tsx
  components/
    OpportunityCard.tsx
    DisclosureBadge.tsx
    RiskBadge.tsx
    ScoreBadge.tsx
  lib/
    db.ts
    scoring.ts
    normalize.ts
    dedupe.ts
    compliance.ts
  jobs/
    crawlSources.ts
    scoreRawItems.ts
    expireOldOffers.ts
    publishDigest.ts
  prompts/
    classifyOpportunity.md
    summarizeOpportunity.md
    riskReview.md
  docs/
    sources.md
    compliance.md
```

## 关键 Prompt 设计

### 分类摘要 Prompt

目标：把原始页面转成结构化机会。

输出 JSON：

```json
{
  "title": "",
  "summary": "",
  "merchant": "",
  "offer_type": "",
  "category": "",
  "value_estimate": "",
  "expires_at": "",
  "eligibility": "",
  "action_steps": [],
  "trust_score": 0,
  "risk_level": "low",
  "risk_reasons": [],
  "human_review_required": true
}
```

### 风险审核 Prompt

重点判断：

- 是否要求付费领奖。
- 是否要求敏感身份信息。
- 是否来源可疑。
- 是否承诺稳赚或必中。
- 是否需要绕过平台规则。
- 是否需要购买才能参与抽奖。

## 风险控制

### 内容风险

- 过期优惠：每日定时检查。
- 虚假优惠：来源可信度和用户举报。
- 联盟偏见：排序逻辑透明。
- 抽奖诈骗：高风险规则拦截。

### 技术风险

- 来源页面结构变化：采集失败告警。
- 大量重复内容：hash + 语义去重。
- 邮件进垃圾箱：控制频率，保留退订。
- 推送太吵：用户选择分类和频率。

### 商业风险

- 免费用户不转化：增加实时提醒和关键词订阅。
- 联盟收入低：转向 B2B 报告和赞助位。
- 内容同质化：做“可信度评分”和“人工审核”差异化。

## 第一版验收标准

上线 7 天内达到：

- 录入 50 个来源。
- 每天产出 20 条候选机会。
- 每天发布 5 到 10 条高质量机会。
- 邮件订阅用户 100 人。
- 平均打开率大于 35%。
- 点击率大于 8%。
- 至少 1 个付费用户或 1 个赞助/联盟转化。

## 可以立刻开始的最小动作

1. 建立 `sources.csv`，先收集 50 个 AI/SaaS 优惠来源。
2. 用 Codex 写采集脚本或调用 Firecrawl/SerpAPI skills。
3. 把结果写入 Google Sheets 或 Supabase。
4. 用 OpenAI 生成摘要、评分、风险标签。
5. 人工审核后发到 Twitter/X、Telegram 和 newsletter。
6. 加上联盟披露和 Pro 订阅入口。

## 资料来源

- FTC Endorsement Guides: https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides
- FTC CAN-SPAM compliance guide: https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business
- FTC prize, sweepstakes and lottery scams: https://consumer.ftc.gov/articles/fake-prize-sweepstakes-and-lottery-scams
- FTC BOTS Act ticketing guidance: https://www.ftc.gov/business-guidance/blog/2017/04/bots-act-thats-ticket
