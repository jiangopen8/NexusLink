param(
  [string]$OutputPath = "NexusLink技术介绍与应用场景价值PPT.pptx"
)

$ErrorActionPreference = "Stop"

function RgbInt([string]$Hex) {
  $h = $Hex.TrimStart("#")
  $r = [Convert]::ToInt32($h.Substring(0, 2), 16)
  $g = [Convert]::ToInt32($h.Substring(2, 2), 16)
  $b = [Convert]::ToInt32($h.Substring(4, 2), 16)
  return $r + ($g * 256) + ($b * 65536)
}

$C = @{
  Ink       = RgbInt "#17212B"
  Muted     = RgbInt "#5B6773"
  Blue      = RgbInt "#246BFE"
  Teal      = RgbInt "#00A6A6"
  Green     = RgbInt "#2E9D62"
  Amber     = RgbInt "#D89000"
  Red       = RgbInt "#D64B4B"
  Purple    = RgbInt "#6B5AED"
  Surface   = RgbInt "#F6F8FB"
  Line      = RgbInt "#D8E0EA"
  White     = RgbInt "#FFFFFF"
  Dark      = RgbInt "#0E1720"
}

$Font = "Microsoft YaHei"
$TitleFont = "Microsoft YaHei UI"

$slides = @(
  @{
    type="cover"; title="NexusLink"; subtitle="AI 原生社交与价值结算协议"; body=@(
      "让 Agent 之间的每一次协作都有身份、有信用、有规则、有结算",
      "技术介绍 x 应用场景 x 项目价值"
    )
  },
  @{
    type="summary"; title="一页结论：NexusLink 是 Agent 协作时代的协议基础设施"; body=@(
      @{k="身份可信"; v="DID 让 Agent 可识别、可授权、可追溯"; color=$C.Blue},
      @{k="能力可交易"; v="NSS 技能市场让能力标准化发布、发现、调用"; color=$C.Teal},
      @{k="协作可治理"; v="PoSE、DAO、协作空间把陌生 Agent 变成可信网络"; color=$C.Purple},
      @{k="价值可结算"; v="USDC、e-CNY 接口、Nanopayment 让贡献实时回报"; color=$C.Green}
    )
  },
  @{
    type="problem"; title="行业问题：Agent 数量增长，但协作基础设施缺位"; body=@(
      @{k="身份缺失"; v="不知道对方 Agent 是谁、由谁控制、能做什么"},
      @{k="能力孤岛"; v="技能散落在平台和工具里，无法低成本复用"},
      @{k="信誉断裂"; v="每次合作都像第一次交易，信任成本高"},
      @{k="结算困难"; v="高频小额调用难以形成可持续商业闭环"}
    )
  },
  @{
    type="position"; title="项目定位：AI Agent 的社交操作系统 + 价值结算层"; body=@(
      @{k="面向开发者"; v="Core SDK、CLI、Skills、Marketplace，直接接入协议能力"},
      @{k="面向 Agent 平台"; v="统一 Skill 描述，适配 OpenClaw、Claude Code、Codex"},
      @{k="面向企业"; v="多 Agent 协作、权限边界、治理投票、结算与审计"},
      @{k="面向生态"; v="让优质 Agent 和优质技能可以被发现、被调用、被付费"}
    )
  },
  @{
    type="architecture"; title="技术架构：四层协议能力，三层工程交付"; layers=@(
      @{k="价值结算层"; v="USDC / e-CNY 接口 / Nanopayment / Settlement 合约"; color=$C.Green},
      @{k="合作治理层"; v="PoSE 信誉 / W3C VC / DAO / 协作空间"; color=$C.Purple},
      @{k="通信与交互层"; v="ACP / 协作契约 / NSS 技能编排"; color=$C.Teal},
      @{k="身份与记忆层"; v="W3C DID / AES-256-GCM / SAL 存储抽象"; color=$C.Blue}
    ); footer="工程交付：Core SDK + CLI + Agent Skills + Marketplace API + Contracts"
  },
  @{
    type="stats"; title="当前项目资产：已经形成可运行的协议工程底座"; body=@(
      @{k="11"; v="workspace packages"},
      @{k="32"; v="Agent Skills"},
      @{k="30+"; v="CLI 命令"},
      @{k="8"; v="Marketplace API 端点"},
      @{k="3"; v="链上合约注册表"},
      @{k="118+"; v="自动化测试"}
    ); note="DIDRegistry、NSSRegistry、Settlement 合约已具备；生产环境仍需接入真实链上地址和密钥管理。"
  },
  @{
    type="value"; title="身份与记忆：可信协作的地基"; accent=$C.Blue; slogan="没有身份，就没有可信协作；没有记忆，就没有长期关系。"; body=@(
      @{k="DID"; v="回答：这个 Agent 是谁"},
      @{k="Owner DID"; v="回答：它由谁授权、代表谁行动"},
      @{k="Intent Boundary"; v="限定自主决策范围，超界需要确认"},
      @{k="加密记忆 + SAL"; v="跨平台延续上下文，不被单一存储后端锁定"}
    )
  },
  @{
    type="value"; title="技能与编排：把能力从孤岛工具变成可交易资产"; accent=$C.Teal; slogan="能力标准化以后，Agent 才能像调用 API 一样调用彼此。"; body=@(
      @{k="技能发布"; v="统一描述输入、输出、价格、标签和能力声明"},
      @{k="技能发现"; v="按意图、价格、标签、PoSE 分数筛选"},
      @{k="技能调用"; v="通过 CLI、HTTP API、Agent Skills 被触发"},
      @{k="技能组合"; v="ACP Composer 用 DAG 和拓扑排序保证依赖顺序"}
    )
  },
  @{
    type="value"; title="治理与信誉：把合作记录变成可计算信誉"; accent=$C.Purple; slogan="声誉不是平台评论，而是可验证、可迁移、可治理的协作资产。"; body=@(
      @{k="W3C VC"; v="记录任务质量、评价和结算金额"},
      @{k="PoSE"; v="综合贡献度、执行成功率和历史表现"},
      @{k="DAO"; v="PoSE 加权投票，让贡献者拥有更大治理权"},
      @{k="协作空间"; v="用准入门槛聚合高质量 Agent"}
    )
  },
  @{
    type="value"; title="价值结算：让协作进入商业闭环"; accent=$C.Green; slogan="每一次贡献都有价格，每一次调用都有回报，生态才会持续增长。"; body=@(
      @{k="USDC"; v="适合全球 Agent 经济的稳定币结算"},
      @{k="e-CNY 接口"; v="为国内合规支付预留路径"},
      @{k="Nanopayment"; v="支持高频、低额、低摩擦结算"},
      @{k="合约注册表"; v="身份、技能和支付具备链上可验证入口"}
    )
  },
  @{
    type="flow"; title="端到端协作流程：从需求到贡献凭证再到结算"; body=@(
      "Alice Agent 注册 DID 并声明任务需求",
      "Bob Agent 通过 NSS 发布市场研究技能",
      "Alice 在 Marketplace 中发现高 PoSE 技能",
      "双方通过 ACP 创建并签署协作契约",
      "Bob 执行技能并生成贡献凭证",
      "PoSE 更新，Space / DAO 记录合作表现",
      "Settlement 完成 USDC 或 Nanopayment 结算"
    )
  },
  @{
    type="scenarioMap"; title="场景价值总图：服务所有可信协作 + 价值结算场景"; body=@(
      @{k="信任基础设施"; v="AI 社交、跨平台资源对接、专家咨询"; color=$C.Blue},
      @{k="价值直达"; v="创作者分成、自由职业、数据标注、广告效果结算"; color=$C.Green},
      @{k="协作效率"; v="活动策划、客服联动、供应链、多部门治理"; color=$C.Teal},
      @{k="知识永续"; v="专家 Agent、教育资源、数字遗产、个人品牌分身"; color=$C.Purple}
    )
  },
  @{
    type="scenario"; title="场景一：Agent 技能交易市场"; pain="AI 能力分散，用户难判断质量，开发者缺少标准化变现渠道。"; solution=@(
      "开发者按 NSS 发布标准化技能",
      "用户 Agent 按任务意图检索技能",
      "PoSE 和 Review 帮助筛选优质能力",
      "调用通过微支付结算，开发者持续获得收入"
    ); value="技能即资产，调用即收入，优质能力通过信誉自然浮现。"; color=$C.Teal
  },
  @{
    type="scenario"; title="场景二：企业多 Agent 协作"; pain="客服、运营、财务、供应链 Agent 各自为战，责任边界和交付质量难审计。"; solution=@(
      "DID 标识部门 Agent 和权限边界",
      "协作空间聚合跨部门任务",
      "ACP 契约同步任务状态和责任边界",
      "VC 和 PoSE 记录交付质量"
    ); value="跨部门协调从人工会议变成 Agent 自动联动，协作过程可审计。"; color=$C.Blue
  },
  @{
    type="scenario"; title="场景三：创作者与知识经济"; pain="内容协作贡献难确认，AI 工具参与创作后分成规则模糊。"; solution=@(
      "创作者、AI 工具、发行方都拥有 DID",
      "协作契约提前约定贡献比例和分成规则",
      "每个环节生成贡献凭证",
      "收益按合约自动分配"
    ); value="版权归属可追溯，贡献可以量化，收益不再依赖口头约定。"; color=$C.Purple
  },
  @{
    type="scenario"; title="场景四：社区、城市与供应链"; pain="多主体协作中信息割裂、责任不清、结算滞后。"; solution=@(
      "社区、供应商、物业、物流等 Agent 建立协作空间",
      "需求自动路由到对应 Agent",
      "多 Agent 任务用 DAO 或协作契约协调",
      "贡献和履约表现沉淀为 PoSE"
    ); value="让分散主体拥有共同的信任账本和协作规则。"; color=$C.Green
  },
  @{
    type="flywheel"; title="商业价值飞轮：身份、技能、信誉和结算互相增强"; body=@(
      "更多 Agent 注册 DID",
      "更多技能通过 NSS 发布",
      "更多调用产生贡献凭证",
      "PoSE 让优质 Agent 获得更多机会",
      "结算让开发者和服务方获得收入",
      "收入吸引更多开发者和企业加入"
    )
  },
  @{
    type="maturity"; title="当前成熟度与边界：可演示、可内测、待真实环境集成"; ready=@(
      "Core SDK、CLI、Skills、Marketplace、Contracts 工程骨架",
      "DID、NSS、Memory、ACP、Governance、Settlement 核心实现",
      "自动化测试与端到端模拟链路",
      "32 个统一 Skill 描述和多平台适配器"
    ); todo=@(
      "生产链上地址和钱包密钥管理",
      "e-CNY 合规支付网关",
      "Marketplace 持久化数据库和 Web UI",
      "多链与更完整的 P2P ACP 网络"
    )
  },
  @{
    type="roadmap"; title="建议落地路径：先跑通闭环，再做场景化 MVP"; body=@(
      @{k="阶段一：内测协议闭环"; v="用本地账本和测试网跑通 DID、技能发布、调用、结算"},
      @{k="阶段二：场景化 MVP"; v="优先做 Agent 技能市场或企业多 Agent 协作台"},
      @{k="阶段三：生态扩展"; v="开放第三方 Skills，引入更多平台适配器，推动 PoSE / VC 跨平台流通"}
    )
  },
  @{
    type="closing"; title="NexusLink 的核心价值"; body=@(
      "身份可验证",
      "能力可交易",
      "协作可治理",
      "贡献可结算"
    ); footer="这不是一个功能点，而是一套 AI Agent 经济的基础设施。"
  },
  @{
    type="codeRun"; title="代码使用方法：环境准备与运行"; body=@(
      @{k="环境要求"; v="Node.js 20-22；pnpm 10+；PowerShell / Bash 均可执行核心命令"; color=$C.Blue},
      @{k="安装依赖"; v="pnpm install"; color=$C.Teal},
      @{k="构建与测试"; v="pnpm build`npnpm test`npnpm test:simulation"; color=$C.Purple},
      @{k="启动前端"; v="pnpm --filter @nexuslink/webapp dev"; color=$C.Green},
      @{k="启动市场 API"; v="pnpm --filter @nexuslink/marketplace build`nPowerShell: `$env:PORT=3000; pnpm --filter @nexuslink/marketplace start`nBash: PORT=3000 pnpm --filter @nexuslink/marketplace start"; color=$C.Amber}
    ); footer="代码结构：packages/* 提供 Core SDK、Skills、Marketplace、CLI；contracts 提供链上注册表；webapp 提供可视化入口。"
  },
  @{
    type="codeUse"; title="代码使用方法：CLI、API 与 SDK 调用"; cli=@(
      "pnpm --filter @nexuslink/cli build",
      "nexus did register --type assistant",
      "nexus did resolve <did>",
      "nexus nss publish <file>",
      "nexus nss discover `"payment`"",
      "nexus nss invoke <skillId>",
      "nexus dao propose `"升级费用模型`"",
      "nexus space create `"AI Lab`"",
      "nexus pay send <to> <amount> --currency USDC",
      "nexus pay nano create <receiver> <deposit>"
    ); api=@(
      "GET http://localhost:3000/skills?q=payment",
      "GET http://localhost:3000/stats",
      "GET http://localhost:3000/featured"
    ); sdk=@(
      "import { IdentityModule } from '@nexuslink/core-identity';",
      "import { SkillComposer } from '@nexuslink/core-acp';",
      "import { SettlementModule } from '@nexuslink/core-settlement';",
      "在业务系统中组合 DID、NSS、ACP、Governance、Settlement。"
    )
  },
  @{
    type="skillExamples"; title="常用 Skills 调用示例：从身份到技能、记忆、结算"; groups=@(
      @{k="身份与边界"; skills=@("nexuslink:did:register", "nexuslink:did:resolve", "nexuslink:did:set-boundary"); v="先确认 Agent 是谁、代表谁、能在什么范围内自主行动。"; color=$C.Blue},
      @{k="技能市场"; skills=@("nexuslink:nss:publish", "nexuslink:nss:discover", "nexuslink:nss:invoke"); v="把能力发布成标准 Skill，再按意图搜索和调用。"; color=$C.Teal},
      @{k="记忆与信誉"; skills=@("nexuslink:memory:store", "nexuslink:pose:query", "nexuslink:credential:issue"); v="把协作上下文、执行结果和贡献凭证沉淀为长期资产。"; color=$C.Purple},
      @{k="协作与结算"; skills=@("nexuslink:space:create", "nexuslink:acp:compose", "nexuslink:pay:nano:create"); v="用协作空间、技能编排和微支付形成任务闭环。"; color=$C.Green}
    ); code=@(
      "import { SkillExecutor } from '@nexuslink/skills';",
      "const executor = new SkillExecutor();",
      "",
      "await executor.execute({",
      "  skillId: 'nexuslink:did:register',",
      "  params: { agentType: 'assistant', skills: ['analysis'] }",
      "});",
      "",
      "await executor.execute({",
      "  skillId: 'nexuslink:nss:discover',",
      "  params: { intent: 'payment', minPose: 70 }",
      "});",
      "",
      "await executor.execute({",
      "  skillId: 'nexuslink:acp:compose',",
      "  params: { name: 'Research Flow', steps: [",
      "    { skillId: 'nexuslink:did:register' },",
      "    { skillId: 'nexuslink:nss:invoke', dependsOn: ['nexuslink:did:register'] }",
      "  ] }",
      "});"
    ); footer="调用口径：Agent 平台优先直接调用 SkillExecutor / adapter；CLI 更适合本地演示、调试和运营脚本。"
  },
  @{
    type="cliExamples"; title="常用 CLI 场景命令：本地演示闭环"; blocks=@(
      @{k="身份注册与权限边界"; commands=@(
        "pnpm --filter @nexuslink/cli build",
        "nexus did register --type assistant --skills analysis,payment",
        "nexus did resolve <did>",
        "nexus did set-boundary <did> --domains payments,nss --max-value 10 --self-signed"
      ); color=$C.Blue},
      @{k="技能发布、发现与调用"; commands=@(
        "nexus nss validate ./skill.json",
        "nexus nss publish ./skill.json",
        "nexus nss discover `"market research`" --limit 5",
        "nexus nss invoke nss://analysis --input '{`"prompt`":`"run`"}'"
      ); color=$C.Teal},
      @{k="协作空间与 DAO 治理"; commands=@(
        "nexus space create `"AI Lab`" --visibility public --min-pose 60 --tags research,agent",
        "nexus space join <spaceId> --pose-score 82",
        "nexus dao propose `"降低市场手续费`" --description `"下调 20%`" --duration-hours 48",
        "nexus dao vote <proposalId> for --pose-score 82"
      ); color=$C.Purple},
      @{k="结算与微支付通道"; commands=@(
        "nexus pay balance",
        "nexus pay send did:nexus:bob 1.00 --currency USDC",
        "nexus pay nano create did:nexus:bob 5.00 --duration 24",
        "nexus pay nano sign <channelId> 0.10 1"
      ); color=$C.Green}
    ); footer="演示顺序：先 build / test，再注册 DID，发布 skill，创建协作空间，最后用 pay 或 nanopayment 展示价值结算。"
  },
  @{
    type="nowakCooperation"; title="马丁·诺瓦克合作机制：现有 Skills 的映射"; note="当前仓库未发现专门命名为 Martin Nowak / Nowak 的 Skill；可用现有 Identity、Governance、Collaboration、Settlement Skills 组合实现五类合作机制。"; rules=@(
      @{k="亲缘选择"; logic="Agent 场景可类比为同一 ownerDid、组织 DID 或共同授权边界。"; skills="did:register / did:update / did:set-boundary"; color=$C.Blue},
      @{k="直接互惠"; logic="反复合作中记录历史交付，用契约和微支付降低背叛收益。"; skills="contract:propose / contract:sign / pay:nano:create"; color=$C.Green},
      @{k="间接互惠"; logic="信誉、凭证和评价影响未来被发现、被选择、被付费的概率。"; skills="pose:query / analytics:pose / credential:issue"; color=$C.Purple},
      @{k="网络互惠"; logic="让高质量 Agent 聚集在协作空间，形成局部高信任网络。"; skills="space:create / space:join / acp:compose"; color=$C.Teal},
      @{k="群体选择"; logic="DAO 和协作空间规则让高协作群体获得更多资源与治理权。"; skills="dao:propose / dao:vote / space:create"; color=$C.Amber}
    ); footer="落地含义：NexusLink 不只记录一次交易，而是把可重复合作、声誉传播、网络准入和群体治理做成可调用的协议能力。"
  }
)

function Add-Box($slide, [double]$x, [double]$y, [double]$w, [double]$h, [int]$fill, [int]$line, [double]$radius = 0) {
  $shapeType = 1
  if ($radius -gt 0) { $shapeType = 5 }
  $s = $slide.Shapes.AddShape($shapeType, $x, $y, $w, $h)
  $s.Fill.ForeColor.RGB = $fill
  $s.Line.ForeColor.RGB = $line
  $s.Line.Weight = 1
  return $s
}

function Add-Text($slide, [string]$text, [double]$x, [double]$y, [double]$w, [double]$h, [double]$size, [int]$color, [bool]$bold = $false, [int]$align = 1) {
  $s = $slide.Shapes.AddTextbox(1, $x, $y, $w, $h)
  $s.TextFrame.MarginLeft = 0
  $s.TextFrame.MarginRight = 0
  $s.TextFrame.MarginTop = 0
  $s.TextFrame.MarginBottom = 0
  $tr = $s.TextFrame.TextRange
  $tr.Text = $text
  $tr.Font.Name = $Font
  if ($size -ge 24) { $tr.Font.Name = $TitleFont }
  $tr.Font.Size = $size
  $tr.Font.Color.RGB = $color
  $tr.Font.Bold = $(if ($bold) { -1 } else { 0 })
  $tr.ParagraphFormat.Alignment = $align
  return $s
}

function Add-Title($slide, [string]$title) {
  Add-Text $slide $title 46 28 1180 46 24 $C.Ink $true 1 | Out-Null
  $line = $slide.Shapes.AddShape(1, 46, 82, 1180, 1.2)
  $line.Fill.ForeColor.RGB = $C.Line
  $line.Line.ForeColor.RGB = $C.Line
}

function Add-Card($slide, [string]$k, [string]$v, [double]$x, [double]$y, [double]$w, [double]$h, [int]$accent) {
  Add-Box $slide $x $y $w $h $C.White $C.Line 1 | Out-Null
  Add-Box $slide $x $y 7 $h $accent $accent 0 | Out-Null
  Add-Text $slide $k ($x + 24) ($y + 18) ($w - 42) 28 18 $accent $true 1 | Out-Null
  Add-Text $slide $v ($x + 24) ($y + 54) ($w - 42) ($h - 70) 13.5 $C.Muted $false 1 | Out-Null
}

function Add-Bullets($slide, [array]$items, [double]$x, [double]$y, [double]$w, [double]$lineH, [int]$accent) {
  for ($i = 0; $i -lt $items.Count; $i++) {
    $cy = $y + ($i * $lineH)
    $dot = $slide.Shapes.AddShape(9, $x, $cy + 5, 10, 10)
    $dot.Fill.ForeColor.RGB = $accent
    $dot.Line.ForeColor.RGB = $accent
    Add-Text $slide ([string]$items[$i]) ($x + 24) $cy ($w - 24) ($lineH - 4) 14.5 $C.Ink $false 1 | Out-Null
  }
}

function Add-CodeBlock($slide, [array]$items, [double]$x, [double]$y, [double]$w, [double]$h, [double]$size = 11.5) {
  Add-Box $slide $x $y $w $h (RgbInt "#101820") (RgbInt "#283746") 1 | Out-Null
  $text = ($items | ForEach-Object { [string]$_ }) -join "`n"
  $s = $slide.Shapes.AddTextbox(1, ($x + 18), ($y + 16), ($w - 36), ($h - 28))
  $s.TextFrame.MarginLeft = 0
  $s.TextFrame.MarginRight = 0
  $s.TextFrame.MarginTop = 0
  $s.TextFrame.MarginBottom = 0
  $tr = $s.TextFrame.TextRange
  $tr.Text = $text
  $tr.Font.Name = "Consolas"
  $tr.Font.Size = $size
  $tr.Font.Color.RGB = RgbInt "#EAF2F8"
  $tr.ParagraphFormat.Alignment = 1
  return $s
}

$absOutput = if ([System.IO.Path]::IsPathRooted($OutputPath)) { $OutputPath } else { Join-Path (Get-Location) $OutputPath }

$ppt = New-Object -ComObject PowerPoint.Application
$ppt.DisplayAlerts = 1
$presentation = $ppt.Presentations.Add()
$presentation.PageSetup.SlideWidth = 1280
$presentation.PageSetup.SlideHeight = 720
while ($presentation.Slides.Count -gt 0) {
  $presentation.Slides.Item(1).Delete()
}

foreach ($data in $slides) {
  $slide = $presentation.Slides.Add($presentation.Slides.Count + 1, 12)
  Add-Box $slide 0 0 1280 720 $C.Surface $C.Surface 0 | Out-Null

  switch ($data.type) {
    "cover" {
      Add-Box $slide 0 0 1280 720 $C.Dark $C.Dark 0 | Out-Null
      Add-Box $slide 0 0 1280 13 $C.Blue $C.Blue 0 | Out-Null
      Add-Text $slide $data.title 70 160 900 90 58 $C.White $true 1 | Out-Null
      Add-Text $slide $data.subtitle 74 252 900 42 26 (RgbInt "#D7E5FF") $false 1 | Out-Null
      Add-Text $slide $data.body[0] 76 342 940 46 20 $C.White $false 1 | Out-Null
      Add-Box $slide 78 426 280 3 $C.Teal $C.Teal 0 | Out-Null
      Add-Text $slide $data.body[1] 76 464 780 34 16 (RgbInt "#B6C3D1") $false 1 | Out-Null
      Add-Box $slide 924 158 250 250 (RgbInt "#162437") (RgbInt "#31445A") 1 | Out-Null
      Add-Text $slide "DID`nNSS`nPoSE`nSettlement" 966 198 170 160 24 $C.White $true 2 | Out-Null
    }
    "summary" {
      Add-Title $slide $data.title
      $positions = @(@(70,145), @(670,145), @(70,395), @(670,395))
      for ($i = 0; $i -lt 4; $i++) {
        $p = $positions[$i]
        Add-Card $slide $data.body[$i].k $data.body[$i].v $p[0] $p[1] 540 170 $data.body[$i].color
      }
      Add-Text $slide "项目价值反复归纳：身份可信 + 能力可交易 + 协作可治理 + 价值可结算" 92 633 1090 34 18 $C.Ink $true 2 | Out-Null
    }
    "problem" {
      Add-Title $slide $data.title
      $x = 82; $y = 142
      foreach ($item in $data.body) {
        Add-Card $slide $item.k $item.v $x $y 520 104 $C.Red
        if ($x -lt 500) { $x = 678 } else { $x = 82; $y += 144 }
      }
      Add-Text $slide "结论：Agent 越多，越需要中立协议把身份、技能、信誉和结算统一起来。" 90 620 1080 36 18 $C.Ink $true 2 | Out-Null
    }
    "position" {
      Add-Title $slide $data.title
      $colors = @($C.Blue, $C.Teal, $C.Purple, $C.Green)
      for ($i = 0; $i -lt 4; $i++) {
        Add-Card $slide $data.body[$i].k $data.body[$i].v 96 (142 + $i * 116) 1088 86 $colors[$i]
      }
    }
    "architecture" {
      Add-Title $slide $data.title
      for ($i = 0; $i -lt $data.layers.Count; $i++) {
        $layer = $data.layers[$i]
        $y = 132 + ($i * 98)
        Add-Box $slide 130 $y 1020 72 $C.White $C.Line 1 | Out-Null
        Add-Box $slide 130 $y 180 72 $layer.color $layer.color 0 | Out-Null
        Add-Text $slide $layer.k 154 ($y + 20) 138 25 16 $C.White $true 2 | Out-Null
        Add-Text $slide $layer.v 340 ($y + 22) 760 25 16 $C.Ink $false 1 | Out-Null
      }
      Add-Text $slide $data.footer 130 562 1020 34 18 $C.Ink $true 2 | Out-Null
    }
    "stats" {
      Add-Title $slide $data.title
      $positions = @(@(80,145), @(425,145), @(770,145), @(80,365), @(425,365), @(770,365))
      foreach ($i in 0..5) {
        $p = $positions[$i]
        Add-Box $slide $p[0] $p[1] 305 148 $C.White $C.Line 1 | Out-Null
        Add-Text $slide $data.body[$i].k ($p[0] + 30) ($p[1] + 26) 245 54 38 $C.Blue $true 2 | Out-Null
        Add-Text $slide $data.body[$i].v ($p[0] + 30) ($p[1] + 92) 245 34 15 $C.Muted $false 2 | Out-Null
      }
      Add-Text $slide $data.note 90 625 1100 34 14.5 $C.Muted $false 2 | Out-Null
    }
    "value" {
      Add-Title $slide $data.title
      Add-Box $slide 70 122 1140 72 $C.White $C.Line 1 | Out-Null
      Add-Text $slide $data.slogan 94 145 1090 30 19 $data.accent $true 2 | Out-Null
      $positions = @(@(96,246), @(670,246), @(96,438), @(670,438))
      for ($i = 0; $i -lt 4; $i++) {
        $p = $positions[$i]
        Add-Card $slide $data.body[$i].k $data.body[$i].v $p[0] $p[1] 514 126 $data.accent
      }
    }
    "flow" {
      Add-Title $slide $data.title
      $startX = 84; $y = 156; $w = 150; $gap = 20
      for ($i = 0; $i -lt $data.body.Count; $i++) {
        $x = $startX + ($i % 4) * ($w + $gap)
        $yy = $y + [Math]::Floor($i / 4) * 190
        Add-Box $slide $x $yy $w 122 $C.White $C.Line 1 | Out-Null
        Add-Text $slide ([string]($i + 1)) ($x + 16) ($yy + 14) 34 28 22 $C.Teal $true 2 | Out-Null
        Add-Text $slide $data.body[$i] ($x + 16) ($yy + 50) ($w - 30) 58 12.5 $C.Ink $false 2 | Out-Null
        if (($i % 4) -ne 3 -and $i -lt ($data.body.Count - 1)) {
          Add-Text $slide "→" ($x + $w + 2) ($yy + 45) 26 26 20 $C.Muted $true 2 | Out-Null
        }
      }
      Add-Text $slide "这条闭环把需求、执行、凭证、信誉、结算连接成一个可审计的 Agent 协作流程。" 92 618 1090 34 18 $C.Ink $true 2 | Out-Null
    }
    "scenarioMap" {
      Add-Title $slide $data.title
      $positions = @(@(90,150), @(665,150), @(90,390), @(665,390))
      for ($i = 0; $i -lt 4; $i++) {
        $p = $positions[$i]
        Add-Card $slide $data.body[$i].k $data.body[$i].v $p[0] $p[1] 520 150 $data.body[$i].color
      }
      Add-Text $slide "共同底层：可信身份 + 标准技能 + 可计算信誉 + 自动结算" 118 635 1040 34 18 $C.Ink $true 2 | Out-Null
    }
    "scenario" {
      Add-Title $slide $data.title
      Add-Box $slide 76 136 512 420 $C.White $C.Line 1 | Out-Null
      Add-Text $slide "痛点" 108 168 120 28 18 $C.Red $true 1 | Out-Null
      Add-Text $slide $data.pain 108 212 420 95 16 $C.Ink $false 1 | Out-Null
      Add-Text $slide "NexusLink 解法" 108 342 220 28 18 $data.color $true 1 | Out-Null
      Add-Bullets $slide $data.solution 108 386 420 38 $data.color
      Add-Box $slide 650 170 500 310 $C.White $C.Line 1 | Out-Null
      Add-Text $slide "项目价值" 692 220 180 28 20 $data.color $true 1 | Out-Null
      Add-Text $slide $data.value 692 280 378 112 26 $C.Ink $true 2 | Out-Null
      Add-Text $slide "价值重复：同一套协议可复制到不同领域，只替换业务技能和协作规则。" 112 610 1050 34 17 $C.Muted $false 2 | Out-Null
    }
    "flywheel" {
      Add-Title $slide $data.title
      $cx = 640; $cy = 370; $r = 190
      for ($i = 0; $i -lt $data.body.Count; $i++) {
        $angle = (-90 + $i * 60) * [Math]::PI / 180
        $x = $cx + [Math]::Cos($angle) * $r - 120
        $y = $cy + [Math]::Sin($angle) * $r - 38
        Add-Box $slide $x $y 240 76 $C.White $C.Line 1 | Out-Null
        Add-Text $slide $data.body[$i] ($x + 14) ($y + 20) 212 32 13.5 $C.Ink $true 2 | Out-Null
      }
      Add-Box $slide 520 286 240 118 $C.Blue $C.Blue 1 | Out-Null
      Add-Text $slide "协议飞轮" 555 314 170 34 24 $C.White $true 2 | Out-Null
      Add-Text $slide "身份 x 技能 x 信誉 x 结算" 540 358 200 24 13.5 (RgbInt "#DCE9FF") $false 2 | Out-Null
    }
    "maturity" {
      Add-Title $slide $data.title
      Add-Box $slide 80 136 535 430 $C.White $C.Line 1 | Out-Null
      Add-Text $slide "已具备" 116 170 160 30 20 $C.Green $true 1 | Out-Null
      Add-Bullets $slide $data.ready 116 224 440 48 $C.Green
      Add-Box $slide 665 136 535 430 $C.White $C.Line 1 | Out-Null
      Add-Text $slide "需要集成" 700 170 180 30 20 $C.Amber $true 1 | Out-Null
      Add-Bullets $slide $data.todo 700 224 440 48 $C.Amber
      Add-Text $slide "表达口径：当前项目适合内测和样板场景验证；生产上线需要补齐真实链上、支付、数据库和安全审计。" 108 626 1060 36 16 $C.Muted $false 2 | Out-Null
    }
    "roadmap" {
      Add-Title $slide $data.title
      $colors = @($C.Blue, $C.Teal, $C.Green)
      for ($i = 0; $i -lt 3; $i++) {
        $y = 154 + $i * 142
        Add-Card $slide $data.body[$i].k $data.body[$i].v 120 $y 1040 100 $colors[$i]
      }
      Add-Text $slide "建议优先样板：Agent 技能市场、企业多 Agent 协作台、创作者协作分成。" 130 622 1020 34 17 $C.Ink $true 2 | Out-Null
    }
    "closing" {
      Add-Box $slide 0 0 1280 720 $C.Dark $C.Dark 0 | Out-Null
      Add-Text $slide $data.title 92 88 1080 58 36 $C.White $true 2 | Out-Null
      $positions = @(@(115,225), @(405,225), @(695,225), @(985,225))
      $colors = @($C.Blue, $C.Teal, $C.Purple, $C.Green)
      for ($i = 0; $i -lt 4; $i++) {
        $p = $positions[$i]
        Add-Box $slide $p[0] $p[1] 180 180 (RgbInt "#172437") (RgbInt "#33485F") 1 | Out-Null
        Add-Box $slide $p[0] $p[1] 180 10 $colors[$i] $colors[$i] 0 | Out-Null
        Add-Text $slide $data.body[$i] ($p[0] + 18) ($p[1] + 72) 144 40 23 $C.White $true 2 | Out-Null
      }
      Add-Text $slide $data.footer 168 515 944 40 22 (RgbInt "#D8E2EC") $false 2 | Out-Null
    }
    "codeRun" {
      Add-Title $slide $data.title
      Add-Text $slide "从仓库拉取到本地演示，建议按下面顺序运行；所有包通过 pnpm workspace 统一管理。" 76 104 1120 30 16 $C.Muted $false 1 | Out-Null
      $positions = @(@(70,150,350,132), @(465,150,350,132), @(860,150,350,132), @(70,326,350,170), @(465,326,745,170))
      for ($i = 0; $i -lt $data.body.Count; $i++) {
        $p = $positions[$i]
        $item = $data.body[$i]
        Add-Box $slide $p[0] $p[1] $p[2] $p[3] $C.White $C.Line 1 | Out-Null
        Add-Box $slide $p[0] $p[1] 8 $p[3] $item.color $item.color 0 | Out-Null
        Add-Text $slide ([string]($i + 1)) ($p[0] + 22) ($p[1] + 20) 34 32 22 $item.color $true 2 | Out-Null
        Add-Text $slide $item.k ($p[0] + 68) ($p[1] + 24) ($p[2] - 94) 28 17 $item.color $true 1 | Out-Null
        $valueSize = $(if ($i -eq 4) { 10.8 } else { 12.5 })
        Add-CodeBlock $slide @($item.v -split "`n") ($p[0] + 28) ($p[1] + 64) ($p[2] - 56) ($p[3] - 84) $valueSize | Out-Null
      }
      Add-Box $slide 70 548 1140 72 $C.White $C.Line 1 | Out-Null
      Add-Text $slide "代码结构" 104 570 120 24 16 $C.Blue $true 1 | Out-Null
      Add-Text $slide $data.footer 224 570 930 32 14.5 $C.Ink $false 1 | Out-Null
    }
    "codeUse" {
      Add-Title $slide $data.title
      Add-Text $slide "同一套协议能力可以通过命令行、HTTP API 或 TypeScript SDK 调用，便于演示、集成和自动化。" 76 104 1120 30 16 $C.Muted $false 1 | Out-Null

      Add-Box $slide 58 148 520 454 $C.White $C.Line 1 | Out-Null
      Add-Box $slide 58 148 520 8 $C.Blue $C.Blue 0 | Out-Null
      Add-Text $slide "CLI 常用命令" 86 176 220 28 19 $C.Blue $true 1 | Out-Null
      Add-CodeBlock $slide $data.cli 86 222 464 332 10.2 | Out-Null

      Add-Box $slide 618 148 284 454 $C.White $C.Line 1 | Out-Null
      Add-Box $slide 618 148 284 8 $C.Teal $C.Teal 0 | Out-Null
      Add-Text $slide "Marketplace API" 642 176 220 28 19 $C.Teal $true 1 | Out-Null
      Add-CodeBlock $slide $data.api 642 222 236 126 10.4 | Out-Null
      Add-Text $slide "端口默认 3000，可通过 PORT 环境变量覆盖。API 用于技能搜索、统计和精选技能展示。" 642 378 220 92 13.5 $C.Muted $false 1 | Out-Null

      Add-Box $slide 938 148 284 454 $C.White $C.Line 1 | Out-Null
      Add-Box $slide 938 148 284 8 $C.Purple $C.Purple 0 | Out-Null
      Add-Text $slide "TypeScript SDK" 962 176 220 28 19 $C.Purple $true 1 | Out-Null
      Add-CodeBlock $slide $data.sdk 962 222 236 168 9.3 | Out-Null
      Add-Text $slide "适合嵌入业务系统、Agent 平台或自动化流程，把身份、技能、编排、治理和结算串成闭环。" 962 416 220 78 13.5 $C.Muted $false 1 | Out-Null

      Add-Text $slide "演示建议：先跑 pnpm test 验证底座，再用 CLI 注册 DID / 发布技能，最后启动 Marketplace API 做技能发现。" 92 638 1096 30 16 $C.Ink $true 2 | Out-Null
    }
    "skillExamples" {
      Add-Title $slide $data.title
      Add-Text $slide "这些是当前 @nexuslink/skills 包里已经注册的常用能力，可被 Codex / Claude Code / OpenClaw 适配器或业务系统直接调用。" 76 104 1120 30 15.5 $C.Muted $false 1 | Out-Null

      $positions = @(@(62,148), @(62,278), @(62,408), @(62,538))
      for ($i = 0; $i -lt $data.groups.Count; $i++) {
        $item = $data.groups[$i]
        $p = $positions[$i]
        Add-Box $slide $p[0] $p[1] 500 104 $C.White $C.Line 1 | Out-Null
        Add-Box $slide $p[0] $p[1] 8 104 $item.color $item.color 0 | Out-Null
        Add-Text $slide $item.k ($p[0] + 24) ($p[1] + 14) 160 24 16.5 $item.color $true 1 | Out-Null
        Add-Text $slide (($item.skills | ForEach-Object { [string]$_ }) -join "`n") ($p[0] + 204) ($p[1] + 14) 320 44 10.5 $C.Ink $false 1 | Out-Null
        Add-Text $slide $item.v ($p[0] + 24) ($p[1] + 62) 430 28 12.5 $C.Muted $false 1 | Out-Null
      }

      Add-Box $slide 612 148 606 494 $C.White $C.Line 1 | Out-Null
      Add-Box $slide 612 148 606 8 $C.Teal $C.Teal 0 | Out-Null
      Add-Text $slide "SkillExecutor 调用示例" 642 176 300 28 19 $C.Teal $true 1 | Out-Null
      Add-CodeBlock $slide $data.code 642 218 546 354 10.1 | Out-Null
      Add-Text $slide $data.footer 642 596 530 34 14 $C.Muted $false 1 | Out-Null
    }
    "cliExamples" {
      Add-Title $slide $data.title
      Add-Text $slide "CLI 用于快速验证协议闭环，也适合接入 CI、运营脚本和本地演示流程。" 76 104 1120 30 15.5 $C.Muted $false 1 | Out-Null

      $positions = @(@(58,148), @(650,148), @(58,390), @(650,390))
      for ($i = 0; $i -lt $data.blocks.Count; $i++) {
        $block = $data.blocks[$i]
        $p = $positions[$i]
        Add-Box $slide $p[0] $p[1] 572 200 $C.White $C.Line 1 | Out-Null
        Add-Box $slide $p[0] $p[1] 572 8 $block.color $block.color 0 | Out-Null
        Add-Text $slide $block.k ($p[0] + 24) ($p[1] + 24) 320 26 17 $block.color $true 1 | Out-Null
        Add-CodeBlock $slide $block.commands ($p[0] + 24) ($p[1] + 62) 524 114 9.15 | Out-Null
      }

      Add-Text $slide $data.footer 96 638 1088 30 15.5 $C.Ink $true 2 | Out-Null
    }
    "nowakCooperation" {
      Add-Title $slide $data.title
      Add-Box $slide 70 106 1140 58 $C.White $C.Line 1 | Out-Null
      Add-Text $slide $data.note 96 123 1080 24 13.8 $C.Muted $false 1 | Out-Null

      $y = 188
      for ($i = 0; $i -lt $data.rules.Count; $i++) {
        $rule = $data.rules[$i]
        Add-Box $slide 78 $y 1124 74 $C.White $C.Line 1 | Out-Null
        Add-Box $slide 78 $y 8 74 $rule.color $rule.color 0 | Out-Null
        Add-Text $slide $rule.k 104 ($y + 16) 130 26 16.5 $rule.color $true 1 | Out-Null
        Add-Text $slide $rule.logic 250 ($y + 15) 560 26 13.5 $C.Ink $false 1 | Out-Null
        Add-Text $slide $rule.skills 838 ($y + 15) 330 28 12.2 $C.Muted $false 1 | Out-Null
        $y += 86
      }

      Add-Box $slide 78 638 1124 38 $C.Dark $C.Dark 1 | Out-Null
      Add-Text $slide $data.footer 104 648 1068 18 12.8 $C.White $false 2 | Out-Null
    }
  }
}

$presentation.SaveAs($absOutput)
$presentation.Close()
$ppt.Quit()

[System.Runtime.InteropServices.Marshal]::ReleaseComObject($presentation) | Out-Null
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($ppt) | Out-Null

Write-Host "Created: $absOutput"

