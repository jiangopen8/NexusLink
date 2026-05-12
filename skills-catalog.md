# 当前 Codex Skills 分类清单

生成时间：2026-05-06 21:18:54 +08:00

总数：883 个，其中用户安装 878 个，系统内置 5 个。

说明：分类由脚本根据 `SKILL.md` 的 `category`、目录名、技能名和 `description` 关键词自动生成；功能简介保留每个 skill 自带的 `description`，便于追溯原始说明。

根目录：

- 用户安装：`C:\Users\14283\.codex\skills`
- 系统内置：`C:\Users\14283\.codex\skills\.system`

## 附加导出

- CSV：`skills-catalog.csv`，适合用 Excel/WPS 筛选、排序、搜索。
- JSON：`skills-catalog.json`，适合脚本读取或二次处理。

## 快速使用

- 想找某个平台能力：优先搜索 `Skill` 或 `目录` 列。
- 想找某类工作流：先看“分类总览”，再进入对应分类表。
- `其他通用 SaaS/API` 表示原始简介过于通用，无法仅凭元数据可靠判断业务域。

按数量排序的分类：

- 其他通用 SaaS/API：232 个
- 文档、PDF、表单与签署：80 个
- 客服、沟通与会议：65 个
- 数据、搜索、采集与研究：60 个
- 营销、邮件与内容运营：60 个
- AI、模型与内容生成：57 个
- 销售、线索与 CRM：52 个
- 开发者工具、代码与 DevOps：48 个
- 财务、支付、电商与库存：42 个
- 文件、媒体与设计资产：41 个
- 人力资源、招聘与工时：35 个
- 安全、身份、网络与基础设施：32 个
- 地图、位置、活动与公共数据：29 个
- 生产力、协作与知识管理：20 个
- 系统、Skill 与插件开发：10 个
- 娱乐、社交、游戏与 Web3：7 个
- 教育与学习：6 个
- 健康、生活与服务行业：4 个
- IoT、硬件与设备：3 个

## 分类总览

| 分类 | 数量 | 功能范围 |
|---|---:|---|
| 系统、Skill 与插件开发 | 10 | Codex/OpenAI 文档、技能创建、插件创建、MCP/连接器构建等基础能力。 |
| AI、模型与内容生成 | 57 | 大模型、语音、图像、视频、OCR、生成式 AI 与 AI 工作流服务。 |
| 销售、线索与 CRM | 52 | 线索搜索、联系人/公司数据增强、CRM、销售流程与客户关系管理。 |
| 营销、邮件与内容运营 | 60 | SEO、广告、营销自动化、邮件营销、内容管理与增长运营。 |
| 客服、沟通与会议 | 65 | 客服工单、聊天、短信、电话、会议、日历和团队沟通。 |
| 文档、PDF、表单与签署 | 80 | PDF/文档生成处理、表单、证书、电子签名与合同工作流。 |
| 文件、媒体与设计资产 | 41 | 文件上传、图像/视频/音频处理、设计素材、截图和品牌资产。 |
| 开发者工具、代码与 DevOps | 48 | 代码库迁移、CI/CD、监控、错误追踪、数据库与开发者平台。 |
| 安全、身份、网络与基础设施 | 32 | 身份认证、密码/密钥、安全扫描、DNS/IP、网络、云和基础设施工具。 |
| 数据、搜索、采集与研究 | 60 | 网页采集、搜索、数据集、金融/新闻/学术数据和研究辅助。 |
| 财务、支付、电商与库存 | 42 | 会计、发票、支付、采购、费用、线上商店、订单和库存。 |
| 人力资源、招聘与工时 | 35 | 招聘 ATS、人事、薪资、排班、工时和服务运营。 |
| 生产力、协作与知识管理 | 20 | 笔记、文档协作、云盘、任务、会议纪要、表格和个人/团队效率工具。 |
| 地图、位置、活动与公共数据 | 29 | 地图、地址、地理编码、天气、活动票务、体育和公共数据 API。 |
| 教育与学习 | 6 | 学习管理系统、课程、课堂、测评和教育平台自动化。 |
| 健康、生活与服务行业 | 4 | 健康、健身、生活服务、环境和线下服务运营自动化。 |
| 娱乐、社交、游戏与 Web3 | 7 | 音乐、播客、游戏、社交平台、区块链和 NFT 服务。 |
| IoT、硬件与设备 | 3 | IoT、硬件设备、传感器和实体设备控制。 |
| 其他通用 SaaS/API | 232 | 未能明确归入以上业务域的通用 SaaS/API 自动化技能。 |

## 完整分类列表

### 系统、Skill 与插件开发（10）

Codex/OpenAI 文档、技能创建、插件创建、MCP/连接器构建等基础能力。

| Skill | 目录 | 来源 | 功能简介 |
|---|---|---|---|
| agent-deep-links | `agent-deep-links` | 用户安装 | Build, validate, and troubleshoot deep links for Codex, Cursor, VS Code, Visual Studio, and similar tools. Use when users ask for clickable links (especially in Slack) that open threads, files, folders, or app settings. |
| connect-apps | `connect-apps` | 用户安装 | Connect Claude to external apps via the Composio CLI. Use this skill when the user wants to send emails, create issues, post messages, or take actions across Gmail, Slack, GitHub, Notion, and 1000+ services from the terminal. |
| imagegen | `imagegen` | 系统内置 | Generate or edit raster images when the task benefits from AI-created bitmap visuals such as photos, illustrations, textures, sprites, mockups, or transparent-background cutouts. Use when Codex should create a brand-new image, transform an existing image, or derive visual variants from references, and the output should be a bitmap asset rather than repo-native code or vector. Do not use when the task is better handled by editing existing SVG/vector/code-native assets, extending an established icon or logo system, or building the visual directly in HTML/CSS/canvas. |
| mcp-builder | `mcp-builder` | 用户安装 | Guide for creating high-quality MCP (Model Context Protocol) servers that enable LLMs to interact with external services through well-designed tools. Use when building MCP servers to integrate external APIs or services, whether in Python (FastMCP) or Node/TypeScript (MCP SDK). |
| openai-docs | `openai-docs` | 系统内置 | Use when the user asks how to build with OpenAI products or APIs and needs up-to-date official documentation with citations, help choosing the latest model for a use case, or model upgrade and prompt-upgrade guidance; prioritize OpenAI docs MCP tools, use bundled references only as helper context, and restrict any fallback browsing to official OpenAI domains. |
| plugin-creator | `plugin-creator` | 系统内置 | Create and scaffold plugin directories for Codex with a required `.codex-plugin/plugin.json`, optional plugin folders/files, and baseline placeholders you can edit before publishing or testing. Use when Codex needs to create a new local plugin, add optional plugin structure, or generate or update repo-root `.agents/plugins/marketplace.json` entries for plugin ordering and availability metadata. |
| skill-creator | `skill-creator` | 系统内置 | Guide for creating effective skills. This skill should be used when users want to create a new skill (or update an existing skill) that extends Codex's capabilities with specialized knowledge, workflows, or tool integrations. |
| skill-installer | `skill-installer` | 系统内置 | Install Codex skills into $CODEX_HOME/skills from a curated list or a GitHub repo path. Use when a user asks to list installable skills, install a curated skill, or install a skill from another repo (including private repos). |
| skill-share | `skill-share` | 用户安装 | A skill that creates new Claude skills and automatically shares them on Slack using Rube for seamless team collaboration and skill discovery. |
| template-skill | `template-skill` | 用户安装 | Replace with description of the skill and when Claude should use it. |

### AI、模型与内容生成（57）

大模型、语音、图像、视频、OCR、生成式 AI 与 AI 工作流服务。

| Skill | 目录 | 来源 | 功能简介 |
|---|---|---|---|
| ai-ml-api-automation | `ai-ml-api-automation` | 用户安装 | Automate AI ML API tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| aivoov-automation | `aivoov-automation` | 用户安装 | Automate Aivoov tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| all-images-ai-automation | `all-images-ai-automation` | 用户安装 | Automate All Images AI tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| alttext-ai-automation | `alttext-ai-automation` | 用户安装 | Automate Alttext AI tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| anthropic_administrator-automation | `anthropic_administrator-automation` | 用户安装 | Automate Anthropic Admin tasks via Rube MCP (Composio): API keys, usage, workspaces, and organization management. Always search tools first for current schemas. |
| anthropic-administrator-automation | `anthropic-administrator-automation` | 用户安装 | Automate Anthropic Admin tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| astica-ai-automation | `astica-ai-automation` | 用户安装 | Automate Astica AI tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| bolna-automation | `bolna-automation` | 用户安装 | Automate Bolna tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| botpress-automation | `botpress-automation` | 用户安装 | Automate Botpress tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| botsonic-automation | `botsonic-automation` | 用户安装 | Automate Botsonic tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| brand-guidelines | `brand-guidelines` | 用户安装 | Applies OpenAI's brand colors and typography to any artifact that should match the Codex/OpenAI look-and-feel. Use it when brand colors or style guidelines, visual formatting, or company design standards apply. |
| chatbotkit-automation | `chatbotkit-automation` | 用户安装 | Automate Chatbotkit tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| chatfai-automation | `chatfai-automation` | 用户安装 | Automate Chatfai tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| claid-ai-automation | `claid-ai-automation` | 用户安装 | Automate Claid AI tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| codeinterpreter-automation | `codeinterpreter-automation` | 用户安装 | Automate Codeinterpreter tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| customgpt-automation | `customgpt-automation` | 用户安装 | Automate Customgpt tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| deepgram-automation | `deepgram-automation` | 用户安装 | Automate Deepgram tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| docsbot-ai-automation | `docsbot-ai-automation` | 用户安装 | Automate Docsbot AI tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| dreamstudio-automation | `dreamstudio-automation` | 用户安装 | Automate Dreamstudio tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| ElevenLabs Automation | `elevenlabs-automation` | 用户安装 | Automate ElevenLabs text-to-speech workflows -- generate speech from text, browse and inspect voices, check subscription limits, list models, stream audio, and retrieve history via the Composio MCP integration. |
| flowiseai-automation | `flowiseai-automation` | 用户安装 | Automate Flowiseai tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| gan-ai-automation | `gan-ai-automation` | 用户安装 | Automate Gan AI tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| gemini-automation | `gemini-automation` | 用户安装 | Automate Gemini tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| griptape-automation | `griptape-automation` | 用户安装 | Automate Griptape tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| GroqCloud Automation | `groqcloud-automation` | 用户安装 | Automate AI inference, chat completions, audio translation, and TTS voice management through GroqCloud's high-performance API via Composio |
| HeyGen Automation | `heygen-automation` | 用户安装 | Automate AI video generation, avatar browsing, template-based video creation, and video status tracking through HeyGen's platform via Composio |
| honeyhive-automation | `honeyhive-automation` | 用户安装 | Automate Honeyhive tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| humanloop-automation | `humanloop-automation` | 用户安装 | Automate Humanloop tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| hystruct-automation | `hystruct-automation` | 用户安装 | Automate Hystruct tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| image-enhancer | `image-enhancer` | 用户安装 | Improves the quality of images, especially screenshots, by enhancing resolution, sharpness, and clarity. Perfect for preparing images for presentations, documentation, or social media posts. |
| jigsawstack-automation | `jigsawstack-automation` | 用户安装 | Automate Jigsawstack tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| kaleido-automation | `kaleido-automation` | 用户安装 | Automate Kaleido tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| langbase-automation | `langbase-automation` | 用户安装 | Automate Langbase tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| langsmith-fetch | `langsmith-fetch` | 用户安装 | Debug LangChain and LangGraph agents by fetching execution traces from LangSmith Studio. Use when debugging agent behavior, investigating errors, analyzing tool calls, checking memory operations, or examining agent performance. Automatically fetches recent traces and analyzes execution patterns. Requires langsmith-fetch CLI installed. |
| lmnt-automation | `lmnt-automation` | 用户安装 | Automate Lmnt tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| metaphor-automation | `metaphor-automation` | 用户安装 | Automate Metaphor tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| Mistral AI Automation | `mistral-ai-automation` | 用户安装 | Automate Mistral AI operations -- manage files and libraries, upload documents for fine-tuning, batch processing, and OCR, track fine-tuning jobs, and build RAG pipelines via the Composio MCP integration. |
| mistral_ai-automation | `mistral_ai-automation` | 用户安装 | Automate Mistral AI tasks via Rube MCP (Composio): completions, embeddings, fine-tuning, and model management. Always search tools first for current schemas. |
| modelry-automation | `modelry-automation` | 用户安装 | Automate Modelry tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| nano-nets-automation | `nano-nets-automation` | 用户安装 | Automate Nano Nets tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| needle-automation | `needle-automation` | 用户安装 | Automate Needle tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| neuronwriter-automation | `neuronwriter-automation` | 用户安装 | Automate Neuronwriter tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| ocrspace-automation | `ocrspace-automation` | 用户安装 | Automate Ocrspace tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| ocr-web-service-automation | `ocr-web-service-automation` | 用户安装 | Automate OCR Web Service tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| OpenAI Automation | `openai-automation` | 用户安装 | Automate OpenAI API operations -- generate responses with multimodal and structured output support, create embeddings, generate images, and list models via the Composio MCP integration. |
| openperplex-automation | `openperplex-automation` | 用户安装 | Automate Openperplex tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| openrouter-automation | `openrouter-automation` | 用户安装 | Automate Openrouter tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| perplexityai-automation | `perplexityai-automation` | 用户安装 | Automate Perplexityai tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| Replicate Automation | `replicate-automation` | 用户安装 | Automate Replicate AI model operations -- run predictions, upload files, inspect model schemas, list versions, and manage prediction history via the Composio MCP integration. |
| retellai-automation | `retellai-automation` | 用户安装 | Automate Retellai tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| sendbird-ai-chabot-automation | `sendbird-ai-chabot-automation` | 用户安装 | Automate Sendbird AI Chabot tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| sitespeakai-automation | `sitespeakai-automation` | 用户安装 | Automate Sitespeakai tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| synthflow-ai-automation | `synthflow-ai-automation` | 用户安装 | Automate Synthflow AI tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| textcortex-automation | `textcortex-automation` | 用户安装 | Automate Textcortex tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| veo-automation | `veo-automation` | 用户安装 | Automate Veo tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| wolfram-alpha-api-automation | `wolfram-alpha-api-automation` | 用户安装 | Automate Wolfram Alpha API tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| writer-automation | `writer-automation` | 用户安装 | Automate Writer tasks via Rube MCP (Composio). Always search tools first for current schemas. |

### 销售、线索与 CRM（52）

线索搜索、联系人/公司数据增强、CRM、销售流程与客户关系管理。

| Skill | 目录 | 来源 | 功能简介 |
|---|---|---|---|
| affinity-automation | `affinity-automation` | 用户安装 | Automate Affinity tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| Apollo Automation | `apollo-automation` | 用户安装 | Automate Apollo.io lead generation -- search organizations, discover contacts, enrich prospect data, manage contact stages, and build targeted outreach lists -- using natural language through the Composio MCP integration. |
| Attio Automation | `attio-automation` | 用户安装 | Automate Attio CRM operations -- search records, query contacts and companies with advanced filters, manage notes, list attributes, and navigate your relationship data -- using natural language through the Composio MCP integration. |
| autobound-automation | `autobound-automation` | 用户安装 | Automate Autobound tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| better-proposals-automation | `better-proposals-automation` | 用户安装 | Automate Better Proposals tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| bigpicture-io-automation | `bigpicture-io-automation` | 用户安装 | Automate Bigpicture IO tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| callerapi-automation | `callerapi-automation` | 用户安装 | Automate Callerapi tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| Capsule CRM Automation | `capsule-crm-automation` | 用户安装 | Automate Capsule CRM operations -- manage contacts (parties), run structured filter queries, track tasks and projects, log entries, and handle organizations -- using natural language through the Composio MCP integration. |
| capsule_crm-automation | `capsule_crm-automation` | 用户安装 | Automate Capsule CRM tasks via Rube MCP (Composio): contacts, opportunities, cases, tasks, and pipeline management. Always search tools first for current schemas. |
| centralstationcrm-automation | `centralstationcrm-automation` | 用户安装 | Automate Centralstationcrm tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| clearout-automation | `clearout-automation` | 用户安装 | Automate Clearout tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| datagma-automation | `datagma-automation` | 用户安装 | Automate Datagma tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| dropcontact-automation | `dropcontact-automation` | 用户安装 | Automate Dropcontact tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| Dynamics 365 Automation | `dynamics365-automation` | 用户安装 | Dynamics 365 Automation: manage CRM contacts, accounts, leads, opportunities, sales orders, invoices, and cases via the Dynamics CRM Web API |
| emailable-automation | `emailable-automation` | 用户安装 | Automate Emailable tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| emaillistverify-automation | `emaillistverify-automation` | 用户安装 | Automate Emaillistverify tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| espocrm-automation | `espocrm-automation` | 用户安装 | Automate Espocrm tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| findymail-automation | `findymail-automation` | 用户安装 | Automate Findymail tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| folk-automation | `folk-automation` | 用户安装 | Automate Folk tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| fullenrich-automation | `fullenrich-automation` | 用户安装 | Automate Fullenrich tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| gender-api-automation | `gender-api-automation` | 用户安装 | Automate Gender API tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| genderapi-io-automation | `genderapi-io-automation` | 用户安装 | Automate Genderapi IO tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| genderize-automation | `genderize-automation` | 用户安装 | Automate Genderize tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| Gong Automation | `gong-automation` | 用户安装 | Automate Gong conversation intelligence -- retrieve call recordings, transcripts, detailed analytics, speaker stats, and workspace data -- using natural language through the Composio MCP integration. |
| highlevel-automation | `highlevel-automation` | 用户安装 | Automate Highlevel tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| Hunter Automation | `hunter-automation` | 用户安装 | Automate Hunter.io email intelligence -- search domains for email addresses, find specific contacts, verify email deliverability, manage leads, and monitor account usage -- using natural language through the Composio MCP integration. |
| icypeas-automation | `icypeas-automation` | 用户安装 | Automate Icypeas tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| identitycheck-automation | `identitycheck-automation` | 用户安装 | Automate Identitycheck tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| Instantly Automation | `instantly-automation` | 用户安装 | Automate Instantly cold email outreach -- manage campaigns, sending accounts, lead lists, bulk lead imports, and campaign analytics -- using natural language through the Composio MCP integration. |
| kickbox-automation | `kickbox-automation` | 用户安装 | Automate Kickbox tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| Kommo Automation | `kommo-automation` | 用户安装 | Automate Kommo CRM operations -- manage leads, pipelines, pipeline stages, tasks, and custom fields -- using natural language through the Composio MCP integration. |
| leadfeeder-automation | `leadfeeder-automation` | 用户安装 | Automate Leadfeeder tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| leadoku-automation | `leadoku-automation` | 用户安装 | Automate Leadoku tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| lead-research-assistant | `lead-research-assistant` | 用户安装 | Identifies high-quality leads for your product or service by analyzing your business, searching for target companies, and providing actionable contact strategies. Perfect for sales, business development, and marketing professionals. |
| Lemlist Automation | `lemlist-automation` | 用户安装 | Automate Lemlist multichannel outreach -- manage campaigns, enroll leads, add personalization variables, export campaign data, and handle unsubscribes via the Composio MCP integration. |
| listclean-automation | `listclean-automation` | 用户安装 | Automate Listclean tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| mailcheck-automation | `mailcheck-automation` | 用户安装 | Automate Mailcheck tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| mails-so-automation | `mails-so-automation` | 用户安装 | Automate Mails So tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| neverbounce-automation | `neverbounce-automation` | 用户安装 | Automate Neverbounce tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| nocrm-io-automation | `nocrm-io-automation` | 用户安装 | Automate Nocrm IO tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| peopledatalabs-automation | `peopledatalabs-automation` | 用户安装 | Automate Peopledatalabs tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| pipeline-crm-automation | `pipeline-crm-automation` | 用户安装 | Automate Pipeline CRM tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| realphonevalidation-automation | `realphonevalidation-automation` | 用户安装 | Automate Realphonevalidation tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| salesforce-marketing-cloud-automation | `salesforce-marketing-cloud-automation` | 用户安装 | Automate Salesforce Marketing Cloud tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| salesforce-service-cloud-automation | `salesforce-service-cloud-automation` | 用户安装 | Automate Salesforce Service Cloud tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| salesmate-automation | `salesmate-automation` | 用户安装 | Automate Salesmate tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| tomba-automation | `tomba-automation` | 用户安装 | Automate Tomba tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| verifiedemail-automation | `verifiedemail-automation` | 用户安装 | Automate Verifiedemail tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| veriphone-automation | `veriphone-automation` | 用户安装 | Automate Veriphone tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| zerobounce-automation | `zerobounce-automation` | 用户安装 | Automate Zerobounce tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| zoho_bigin-automation | `zoho_bigin-automation` | 用户安装 | Automate Zoho Bigin tasks via Rube MCP (Composio): pipelines, contacts, companies, products, and small business CRM. Always search tools first for current schemas. |
| zoho-bigin-automation | `zoho-bigin-automation` | 用户安装 | Automate Zoho Bigin tasks via Rube MCP (Composio). Always search tools first for current schemas. |

### 营销、邮件与内容运营（60）

SEO、广告、营销自动化、邮件营销、内容管理与增长运营。

| Skill | 目录 | 来源 | 功能简介 |
|---|---|---|---|
| active-campaign-automation | `active-campaign-automation` | 用户安装 | Automate ActiveCampaign tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| adrapid-automation | `adrapid-automation` | 用户安装 | Automate Adrapid tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| agility-cms-automation | `agility-cms-automation` | 用户安装 | Automate Agility CMS tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| Ahrefs Automation | `ahrefs-automation` | 用户安装 | Automate SEO research with Ahrefs -- analyze backlink profiles, research keywords, track domain metrics history, audit organic rankings, and perform batch URL analysis through the Composio Ahrefs integration. |
| beamer-automation | `beamer-automation` | 用户安装 | Automate Beamer tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| benchmark-email-automation | `benchmark-email-automation` | 用户安装 | Automate Benchmark Email tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| bigmailer-automation | `bigmailer-automation` | 用户安装 | Automate Bigmailer tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| campaign-cleaner-automation | `campaign-cleaner-automation` | 用户安装 | Automate Campaign Cleaner tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| campayn-automation | `campayn-automation` | 用户安装 | Automate Campayn tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| canny-automation | `canny-automation` | 用户安装 | Automate Canny tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| competitive-ads-extractor | `competitive-ads-extractor` | 用户安装 | Extracts and analyzes competitors' ads from ad libraries (Facebook, LinkedIn, etc.) to understand what messaging, problems, and creative approaches are working. Helps inspire and improve your own ad campaigns. |
| Contentful Automation | `contentful-automation` | 用户安装 | Automate headless CMS operations in Contentful -- list spaces, retrieve space metadata, and update space configurations through the Composio Contentful integration. |
| contentful-graphql-automation | `contentful-graphql-automation` | 用户安装 | Automate Contentful Graphql tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| curated-automation | `curated-automation` | 用户安装 | Automate Curated tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| Customer.io Automation | `customerio-automation` | 用户安装 | Automate customer engagement workflows including broadcast triggers, message analytics, segment management, and newsletter tracking through Customer.io via Composio |
| doppler-marketing-automation-automation | `doppler-marketing-automation-automation` | 用户安装 | Automate Doppler Marketing Automation tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| doppler-secretops-automation | `doppler-secretops-automation` | 用户安装 | Automate Doppler Secretops tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| dripcel-automation | `dripcel-automation` | 用户安装 | Automate Dripcel tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| drip-jobs-automation | `drip-jobs-automation` | 用户安装 | Automate Drip Jobs tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| emailoctopus-automation | `emailoctopus-automation` | 用户安装 | Automate Emailoctopus tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| emelia-automation | `emelia-automation` | 用户安装 | Automate Emelia tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| enginemailer-automation | `enginemailer-automation` | 用户安装 | Automate Enginemailer tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| Facebook Automation | `facebook-automation` | 用户安装 | Automate Facebook Page management including post creation, scheduling, video uploads, Messenger conversations, and audience engagement via Composio |
| fomo-automation | `fomo-automation` | 用户安装 | Automate Fomo tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| givebutter-automation | `givebutter-automation` | 用户安装 | Automate Givebutter tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| goodbits-automation | `goodbits-automation` | 用户安装 | Automate Goodbits tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| googleads-automation | `googleads-automation` | 用户安装 | Automate Google Ads analytics tasks via Rube MCP (Composio): list Google Ads links, run GA4 reports, check compatibility, list properties and accounts. Always search tools first for current schemas. |
| Gumroad Automation | `gumroad-automation` | 用户安装 | Automate Gumroad product management, sales tracking, license verification, and webhook subscriptions using natural language through the Composio MCP integration. |
| hashnode-automation | `hashnode-automation` | 用户安装 | Automate Hashnode tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| hypeauditor-automation | `hypeauditor-automation` | 用户安装 | Automate Hypeauditor tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| kit-automation | `kit-automation` | 用户安装 | Automate Kit tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| kontent-ai-automation | `kontent-ai-automation` | 用户安装 | Automate Kontent AI tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| mailbluster-automation | `mailbluster-automation` | 用户安装 | Automate Mailbluster tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| mailboxlayer-automation | `mailboxlayer-automation` | 用户安装 | Automate Mailboxlayer tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| mailcoach-automation | `mailcoach-automation` | 用户安装 | Automate Mailcoach tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| MailerLite Automation | `mailerlite-automation` | 用户安装 | Automate email marketing workflows including subscriber management, campaign analytics, group segmentation, and account monitoring through MailerLite via Composio |
| mailersend-automation | `mailersend-automation` | 用户安装 | Automate Mailersend tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| mailsoftly-automation | `mailsoftly-automation` | 用户安装 | Automate Mailsoftly tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| many-chat-automation | `many-chat-automation` | 用户安装 | Automate ManyChat tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| metaads-automation | `metaads-automation` | 用户安装 | Automate Metaads tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| moz-automation | `moz-automation` | 用户安装 | Automate Moz tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| Omnisend Automation | `omnisend-automation` | 用户安装 | Automate ecommerce marketing workflows including contact management, bulk operations, and subscriber segmentation through Omnisend via Composio |
| persistiq-automation | `persistiq-automation` | 用户安装 | Automate Persistiq tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| Prismic Automation | `prismic-automation` | 用户安装 | Automate headless CMS operations in Prismic -- query documents, search content, retrieve custom types, and manage repository refs through the Composio Prismic integration. |
| raffle-winner-picker | `raffle-winner-picker` | 用户安装 | Picks random winners from lists, spreadsheets, or Google Sheets for giveaways, raffles, and contests. Ensures fair, unbiased selection with transparency. |
| ravenseotools-automation | `ravenseotools-automation` | 用户安装 | Automate Ravenseotools tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| remarkety-automation | `remarkety-automation` | 用户安装 | Automate Remarkety tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| reply-io-automation | `reply-io-automation` | 用户安装 | Automate Reply IO tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| ritekit-automation | `ritekit-automation` | 用户安装 | Automate Ritekit tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| segmetrics-automation | `segmetrics-automation` | 用户安装 | Automate Segmetrics tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| SEMrush Automation | `semrush-automation` | 用户安装 | Automate SEO analysis with SEMrush -- research keywords, analyze domain organic rankings, audit backlinks, assess keyword difficulty, and discover related terms through the Composio SEMrush integration. |
| sendfox-automation | `sendfox-automation` | 用户安装 | Automate Sendfox tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| sendlane-automation | `sendlane-automation` | 用户安装 | Automate Sendlane tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| sendloop-automation | `sendloop-automation` | 用户安装 | Automate Sendloop tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| similarweb_digitalrank_api-automation | `similarweb_digitalrank_api-automation` | 用户安装 | Automate SimilarWeb tasks via Rube MCP (Composio): website traffic, rankings, and digital market intelligence. Always search tools first for current schemas. |
| similarweb-digitalrank-api-automation | `similarweb-digitalrank-api-automation` | 用户安装 | Automate SimilarWeb tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| tapfiliate-automation | `tapfiliate-automation` | 用户安装 | Automate Tapfiliate tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| timekit-automation | `timekit-automation` | 用户安装 | Automate Timekit tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| toneden-automation | `toneden-automation` | 用户安装 | Automate Toneden tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| woodpecker-co-automation | `woodpecker-co-automation` | 用户安装 | Automate Woodpecker co tasks via Rube MCP (Composio). Always search tools first for current schemas. |

### 客服、沟通与会议（65）

客服工单、聊天、短信、电话、会议、日历和团队沟通。

| Skill | 目录 | 来源 | 功能简介 |
|---|---|---|---|
| -2chat-automation | `-2chat-automation` | 用户安装 | Automate 2chat tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| agencyzoom-automation | `agencyzoom-automation` | 用户安装 | Automate Agencyzoom tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| agent-mail-automation | `agent-mail-automation` | 用户安装 | Automate Agent Mail tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| cal-automation | `cal-automation` | 用户安装 | Automate Cal tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| calendarhero-automation | `calendarhero-automation` | 用户安装 | Automate Calendarhero tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| callingly-automation | `callingly-automation` | 用户安装 | Automate Callingly tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| callpage-automation | `callpage-automation` | 用户安装 | Automate Callpage tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| chatwork-automation | `chatwork-automation` | 用户安装 | Automate Chatwork tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| chmeetings-automation | `chmeetings-automation` | 用户安装 | Automate Chmeetings tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| clickmeeting-automation | `clickmeeting-automation` | 用户安装 | Automate Clickmeeting tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| coinmarketcal-automation | `coinmarketcal-automation` | 用户安装 | Automate Coinmarketcal tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| connect | `connect` | 用户安装 | Connect Codex to any app via the Composio CLI. Send emails, create issues, post messages, update databases - take real actions across Gmail, Slack, GitHub, Notion, and 1000+ services from the terminal. |
| demio-automation | `demio-automation` | 用户安装 | Automate Demio tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| developer-growth-analysis | `developer-growth-analysis` | 用户安装 | Analyzes your recent Codex chat history to identify coding patterns, development gaps, and areas for improvement, curates relevant learning resources from HackerNews, and automatically sends a personalized growth report to your Slack DMs. |
| dialpad-automation | `dialpad-automation` | 用户安装 | Automate Dialpad tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| discordbot-automation | `discordbot-automation` | 用户安装 | Automate Discordbot tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| evenium-automation | `evenium-automation` | 用户安装 | Automate Evenium tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| Eventbrite Automation | `eventbrite-automation` | 用户安装 | Automate Eventbrite event management, attendee tracking, organization discovery, and category browsing through natural language commands |
| eventee-automation | `eventee-automation` | 用户安装 | Automate Eventee tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| eventzilla-automation | `eventzilla-automation` | 用户安装 | Automate Eventzilla tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| front-automation | `front-automation` | 用户安装 | Automate Front tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| googlecalendar-automation | `googlecalendar-automation` | 用户安装 | Automate Google Calendar tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| googlemeet-automation | `googlemeet-automation` | 用户安装 | Automate Google Meet tasks via Rube MCP (Composio): create Meet spaces, schedule video conferences via Calendar events, manage meeting access. Always search tools first for current schemas. |
| Gorgias Automation | `gorgias-automation` | 用户安装 | Automate e-commerce customer support workflows in Gorgias -- manage tickets, customers, tags, and teams through natural language commands. |
| go-to-webinar-automation | `go-to-webinar-automation` | 用户安装 | Automate GoToWebinar tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| helpwise-automation | `helpwise-automation` | 用户安装 | Automate Helpwise tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| humanitix-automation | `humanitix-automation` | 用户安装 | Automate Humanitix tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| internal-comms | `internal-comms` | 用户安装 | A set of resources to help me write all kinds of internal communications, using the formats that my company likes to use. Claude should use this skill whenever asked to write some sort of internal communications (status reports, leadership updates, 3P updates, company newsletters, FAQs, incident reports, project updates, etc.). |
| linear | `linear` | 用户安装 | Manage issues, projects & team workflows in Linear. Use when the user wants to read, create or updates tickets in Linear. |
| meeting-insights-analyzer | `meeting-insights-analyzer` | 用户安装 | Analyzes meeting transcripts and recordings to uncover behavioral patterns, communication insights, and actionable feedback. Identifies when you avoid conflict, use filler words, dominate conversations, or miss opportunities to listen. Perfect for professionals seeking to improve their communication and leadership skills. |
| meeting-notes-and-actions | `meeting-notes-and-actions` | 用户安装 | Turn meeting transcripts or rough notes into crisp summaries with decisions, risks, and owner-tagged action items; use for Zoom/Meet/Teams transcripts, call notes, or long meeting chats to generate share-ready outputs. |
| missive-automation | `missive-automation` | 用户安装 | Automate Missive tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| mocean-automation | `mocean-automation` | 用户安装 | Automate Mocean tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| msg91-automation | `msg91-automation` | 用户安装 | Automate Msg91 tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| notion-meeting-intelligence | `notion-meeting-intelligence` | 用户安装 | Prepare meeting materials with Notion context and Codex research; use when gathering context, drafting agendas/pre-reads, and tailoring materials to attendees. |
| oncehub-automation | `oncehub-automation` | 用户安装 | Automate Oncehub tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| pushbullet-automation | `pushbullet-automation` | 用户安装 | Automate Pushbullet tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| pushover-automation | `pushover-automation` | 用户安装 | Automate Pushover tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| re-amaze-automation | `re-amaze-automation` | 用户安装 | Automate Re Amaze tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| respond-io-automation | `respond-io-automation` | 用户安装 | Automate Respond IO tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| ring_central-automation | `ring_central-automation` | 用户安装 | Automate RingCentral tasks via Rube MCP (Composio): calls, messages, meetings, and unified communications. Always search tools first for current schemas. |
| RingCentral Automation | `ring-central-automation` | 用户安装 | RingCentral automation via Rube MCP -- toolkit not currently available in Composio; no RING_CENTRAL_ tools found |
| slackbot-automation | `slackbot-automation` | 用户安装 | Automate Slackbot tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| slack-gif-creator | `slack-gif-creator` | 用户安装 | Toolkit for creating animated GIFs optimized for Slack, with validators for size constraints and composable animation primitives. This skill applies when users request animated GIFs or emoji animations for Slack from descriptions like "make me a GIF for Slack of X doing Y". |
| sms-alert-automation | `sms-alert-automation` | 用户安装 | Automate SMS Alert tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| smtp2go-automation | `smtp2go-automation` | 用户安装 | Automate Smtp2go tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| spoki-automation | `spoki-automation` | 用户安装 | Automate Spoki tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| superchat-automation | `superchat-automation` | 用户安装 | Automate Superchat tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| supportbee-automation | `supportbee-automation` | 用户安装 | Automate Supportbee tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| supportivekoala-automation | `supportivekoala-automation` | 用户安装 | Automate Supportivekoala tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| support-ticket-triage | `support-ticket-triage` | 用户安装 | Triage customer support tickets/emails/chats into categories, priority, and next action; draft responses and create reproducible steps; use for Zendesk/Intercom/Help Scout exports or pasted threads. |
| telnyx-automation | `telnyx-automation` | 用户安装 | Automate Telnyx tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| teltel-automation | `teltel-automation` | 用户安装 | Automate Teltel tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| ticketmaster-automation | `ticketmaster-automation` | 用户安装 | Automate Ticketmaster tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| timelinesai-automation | `timelinesai-automation` | 用户安装 | Automate Timelinesai tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| unione-automation | `unione-automation` | 用户安装 | Automate Unione tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| waboxapp-automation | `waboxapp-automation` | 用户安装 | Automate Waboxapp tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| wati-automation | `wati-automation` | 用户安装 | Automate Wati tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| webapp-testing | `webapp-testing` | 用户安装 | Toolkit for interacting with and testing local web applications using Playwright. Supports verifying frontend functionality, debugging UI behavior, capturing browser screenshots, and viewing browser logs. |
| Webex Automation | `webex-automation` | 用户安装 | Automate Cisco Webex messaging, rooms, teams, webhooks, and people management through natural language commands |
| youtube-downloader | `video-downloader` | 用户安装 | Download YouTube videos with customizable quality and format options. Use this skill when the user asks to download, save, or grab YouTube videos. Supports various quality settings (best, 1080p, 720p, 480p, 360p), multiple formats (mp4, webm, mkv), and audio-only downloads as MP3. |
| Zoho Books Automation | `zoho-books-automation` | 用户安装 | Automate Zoho Books accounting workflows including invoice creation, bill management, contact lookup, payment tracking, and multi-organization support through natural language commands |
| Zoho Desk Automation | `zoho-desk-automation` | 用户安装 | Zoho Desk automation via Rube MCP -- toolkit not currently available in Composio; no ZOHO_DESK_ tools found |
| zoho_desk-automation | `zoho_desk-automation` | 用户安装 | Automate Zoho Desk tasks via Rube MCP (Composio): tickets, contacts, agents, departments, and help desk operations. Always search tools first for current schemas. |
| zoominfo-automation | `zoominfo-automation` | 用户安装 | Automate Zoominfo tasks via Rube MCP (Composio). Always search tools first for current schemas. |

### 文档、PDF、表单与签署（80）

PDF/文档生成处理、表单、证书、电子签名与合同工作流。

| Skill | 目录 | 来源 | 功能简介 |
|---|---|---|---|
| accredible-certificates-automation | `accredible-certificates-automation` | 用户安装 | Automate Accredible Certificates tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| affinda-automation | `affinda-automation` | 用户安装 | Automate Affinda tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| algodocs-automation | `algodocs-automation` | 用户安装 | Automate Algodocs tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| api2pdf-automation | `api2pdf-automation` | 用户安装 | Automate Api2pdf tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| apitemplate-io-automation | `apitemplate-io-automation` | 用户安装 | Automate Apitemplate IO tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| boldsign-automation | `boldsign-automation` | 用户安装 | Automate Boldsign tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| boloforms-automation | `boloforms-automation` | 用户安装 | Automate Boloforms tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| byteforms-automation | `byteforms-automation` | 用户安装 | Automate Byteforms tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| cabinpanda-automation | `cabinpanda-automation` | 用户安装 | Automate Cabinpanda tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| canvas-design | `canvas-design` | 用户安装 | Create beautiful visual art in .png and .pdf documents using design philosophy. You should use this skill when the user asks to create a poster, piece of art, design, or other static piece. Create original visual designs, never copying existing artists' work to avoid copyright violations. |
| carbone-automation | `carbone-automation` | 用户安装 | Automate Carbone tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| cdr-platform-automation | `cdr-platform-automation` | 用户安装 | Automate Cdr Platform tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| certifier-automation | `certifier-automation` | 用户安装 | Automate Certifier tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| changelog-generator | `changelog-generator` | 用户安装 | Automatically creates user-facing changelogs from git commits by analyzing commit history, categorizing changes, and transforming technical commits into clear, customer-friendly release notes. Turns hours of manual changelog writing into minutes of automated generation. |
| classmarker-automation | `classmarker-automation` | 用户安装 | Automate Classmarker tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| Cloudinary Automation | `cloudinary-automation` | 用户安装 | Automate Cloudinary media management including folder organization, upload presets, asset lookup, transformations, and usage monitoring through natural language commands |
| codebase-migrate | `codebase-migrate` | 用户安装 | Run large codebase migrations and multi-file refactors. Uses the Composio CLI to coordinate issue tracking, batched PRs, and CI verification while the agent executes the transforms locally across hundreds of files. |
| content-research-writer | `content-research-writer` | 用户安装 | Assists in writing high-quality content by conducting research, adding citations, improving hooks, iterating on outlines, and providing real-time feedback on each section. Transforms your writing process from solo effort to collaborative partnership. |
| craftmypdf-automation | `craftmypdf-automation` | 用户安装 | Automate Craftmypdf tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| docmosis-automation | `docmosis-automation` | 用户安装 | Automate Docmosis tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| docnify-automation | `docnify-automation` | 用户安装 | Automate Docnify tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| docsumo-automation | `docsumo-automation` | 用户安装 | Automate Docsumo tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| docugenerate-automation | `docugenerate-automation` | 用户安装 | Automate Docugenerate tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| documenso-automation | `documenso-automation` | 用户安装 | Automate Documenso tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| documint-automation | `documint-automation` | 用户安装 | Automate Documint tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| docupilot-automation | `docupilot-automation` | 用户安装 | Automate Docupilot tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| docupost-automation | `docupost-automation` | 用户安装 | Automate Docupost tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| docuseal-automation | `docuseal-automation` | 用户安装 | Automate Docuseal tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| draftable-automation | `draftable-automation` | 用户安装 | Automate Draftable tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| dropbox-sign-automation | `dropbox-sign-automation` | 用户安装 | Automate Dropbox Sign tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| encodian-automation | `encodian-automation` | 用户安装 | Automate Encodian tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| esignatures-io-automation | `esignatures-io-automation` | 用户安装 | Automate Esignatures IO tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| eversign-automation | `eversign-automation` | 用户安装 | Automate Eversign tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| Excel Automation | `excel-automation` | 用户安装 | Excel Automation: create workbooks, manage worksheets, read/write cell data, and format spreadsheets via Microsoft Excel and Google Sheets integration |
| extracta-ai-automation | `extracta-ai-automation` | 用户安装 | Automate Extracta AI tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| feathery-automation | `feathery-automation` | 用户安装 | Automate Feathery tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| fillout_forms-automation | `fillout_forms-automation` | 用户安装 | Automate Fillout tasks via Rube MCP (Composio): forms, submissions, workflows, and form builder. Always search tools first for current schemas. |
| fillout-forms-automation | `fillout-forms-automation` | 用户安装 | Automate Fillout tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| flexisign-automation | `flexisign-automation` | 用户安装 | Automate Flexisign tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| formbricks-automation | `formbricks-automation` | 用户安装 | Automate Formbricks tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| formcarry-automation | `formcarry-automation` | 用户安装 | Automate Formcarry tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| formdesk-automation | `formdesk-automation` | 用户安装 | Automate Formdesk tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| formsite-automation | `formsite-automation` | 用户安装 | Automate Formsite tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| getform-automation | `getform-automation` | 用户安装 | Automate Getform tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| google_classroom-automation | `google_classroom-automation` | 用户安装 | Automate Google Classroom tasks via Rube MCP (Composio): course management, assignments, student rosters, and announcements. Always search tools first for current schemas. |
| google_search_console-automation | `google_search_console-automation` | 用户安装 | Automate Google Search Console tasks via Rube MCP (Composio): search performance, URL inspection, sitemaps, and indexing status. Always search tools first for current schemas. |
| googledocs-automation | `googledocs-automation` | 用户安装 | Automate Google Docs tasks via Rube MCP (Composio): create, edit, search, export, copy, and update documents. Always search tools first for current schemas. |
| google-search-console-automation | `google-search-console-automation` | 用户安装 | Automate Google Search Console tasks via Rube MCP (Composio): query search analytics, list sites, inspect URLs, submit sitemaps, monitor search performance. Always search tools first for current schemas. |
| ignisign-automation | `ignisign-automation` | 用户安装 | Automate Ignisign tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| invoice-organizer | `invoice-organizer` | 用户安装 | Automatically organizes invoices and receipts for tax preparation by reading messy files, extracting key information, renaming them consistently, and sorting them into logical folders. Turns hours of manual bookkeeping into minutes of automated organization. |
| issue-triage | `issue-triage` | 用户安装 | Triage Linear or Jira backlogs and run bug sweeps via the Composio CLI. Bulk-fetch issues, dedupe, relabel, reassign, and post summaries — all from the shell without clicking through the UI. |
| Jotform Automation | `jotform-automation` | 用户安装 | Automate Jotform form listing, user management, activity history, folder organization, and plan inspection through natural language commands |
| notion-research-documentation | `notion-research-documentation` | 用户安装 | Research across Notion and synthesize into structured documentation; use when gathering info from multiple Notion sources to produce briefs, comparisons, or reports with citations. |
| onesignal_rest_api-automation | `onesignal_rest_api-automation` | 用户安装 | Automate OneSignal tasks via Rube MCP (Composio): push notifications, segments, templates, and messaging. Always search tools first for current schemas. |
| onesignal-rest-api-automation | `onesignal-rest-api-automation` | 用户安装 | Automate OneSignal tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| onesignal-user-auth-automation | `onesignal-user-auth-automation` | 用户安装 | Automate Onesignal User Auth tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| PandaDoc Automation | `pandadoc-automation` | 用户安装 | Automate document workflows with PandaDoc -- create documents from files, manage contacts, organize folders, set up webhooks, create templates, and track document status through the Composio PandaDoc integration. |
| paperjsx | `paperjsx` | 用户安装 | Generate PPTX presentations, DOCX documents, XLSX spreadsheets, and PDF reports from structured JSON input using PaperJSX. |
| pdf4me-automation | `pdf4me-automation` | 用户安装 | Automate Pdf4me tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| pdf-api-io-automation | `pdf-api-io-automation` | 用户安装 | Automate PDF API IO tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| pdf-co-automation | `pdf-co-automation` | 用户安装 | Automate PDF co tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| pdfless-automation | `pdfless-automation` | 用户安装 | Automate Pdfless tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| pdfmonkey-automation | `pdfmonkey-automation` | 用户安装 | Automate Pdfmonkey tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| PhantomBuster Automation | `phantombuster-automation` | 用户安装 | Automate lead generation, web scraping, and social media data extraction workflows through PhantomBuster's cloud platform via Composio |
| Ramp Automation | `ramp-automation` | 用户安装 | Ramp Automation: manage corporate card transactions, reimbursements, users, and expense tracking via the Ramp platform |
| renderform-automation | `renderform-automation` | 用户安装 | Automate Renderform tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| share_point-automation | `share_point-automation` | 用户安装 | Automate SharePoint tasks via Rube MCP (Composio): document libraries, sites, lists, and content management. Always search tools first for current schemas. |
| SharePoint Automation | `share-point-automation` | 用户安装 | SharePoint Automation: manage sites, lists, documents, folders, pages, and search content across SharePoint and OneDrive |
| signaturely-automation | `signaturely-automation` | 用户安装 | Automate Signaturely tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| signpath-automation | `signpath-automation` | 用户安装 | Automate Signpath tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| signwell-automation | `signwell-automation` | 用户安装 | Automate Signwell tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| spreadsheet-formula-helper | `spreadsheet-formula-helper` | 用户安装 | Write and debug spreadsheet formulas (Excel/Google Sheets), pivot tables, and array formulas; translate between dialects; use when users need working formulas with examples and edge-case checks. |
| SurveyMonkey Automation | `survey-monkey-automation` | 用户安装 | Automate SurveyMonkey survey creation, response collection, collector management, and survey discovery through natural language commands |
| tally-automation | `tally-automation` | 用户安装 | Automate Tally tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| tapform-automation | `tapform-automation` | 用户安装 | Automate Tapform tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| templated-automation | `templated-automation` | 用户安装 | Automate Templated tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| text-to-pdf-automation | `text-to-pdf-automation` | 用户安装 | Automate Text To PDF tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| typefully-automation | `typefully-automation` | 用户安装 | Automate Typefully tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| waiverfile-automation | `waiverfile-automation` | 用户安装 | Automate Waiverfile tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| Wave Accounting Automation | `wave-accounting-automation` | 用户安装 | Wave Accounting toolkit is not currently available as a native integration. No Wave-specific tools were found in the Composio platform. This skill is a placeholder pending future integration. |

### 文件、媒体与设计资产（41）

文件上传、图像/视频/音频处理、设计素材、截图和品牌资产。

| Skill | 目录 | 来源 | 功能简介 |
|---|---|---|---|
| abyssale-automation | `abyssale-automation` | 用户安装 | Automate Abyssale tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| bannerbear-automation | `bannerbear-automation` | 用户安装 | Automate Bannerbear tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| cincopa-automation | `cincopa-automation` | 用户安装 | Automate Cincopa tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| cloudconvert-automation | `cloudconvert-automation` | 用户安装 | Automate Cloudconvert tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| conversion-tools-automation | `conversion-tools-automation` | 用户安装 | Automate Conversion Tools tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| convertapi-automation | `convertapi-automation` | 用户安装 | Automate Convertapi tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| docker_hub-automation | `docker_hub-automation` | 用户安装 | Automate Docker Hub tasks via Rube MCP (Composio): repositories, images, tags, and container registry management. Always search tools first for current schemas. |
| felt-automation | `felt-automation` | 用户安装 | Automate Felt tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| file-organizer | `file-organizer` | 用户安装 | Intelligently organizes your files and folders across your computer by understanding context, finding duplicates, suggesting better structures, and automating cleanup tasks. Reduces cognitive load and keeps your digital workspace tidy without manual effort. |
| files-com-automation | `files-com-automation` | 用户安装 | Automate Files Com tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| finerworks-automation | `finerworks-automation` | 用户安装 | Automate Finerworks tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| fireflies-automation | `fireflies-automation` | 用户安装 | Automate Fireflies tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| gamma-automation | `gamma-automation` | 用户安装 | Automate Gamma tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| giphy-automation | `giphy-automation` | 用户安装 | Automate Giphy tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| gladia-automation | `gladia-automation` | 用户安装 | Automate Gladia tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| googledrive-automation | `googledrive-automation` | 用户安装 | Automate Google Drive tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| googlephotos-automation | `googlephotos-automation` | 用户安装 | Automate Google Photos tasks via Rube MCP (Composio): upload media, manage albums, search photos, batch add items, create and update albums. Always search tools first for current schemas. |
| happy-scribe-automation | `happy-scribe-automation` | 用户安装 | Automate Happy Scribe tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| heyzine-automation | `heyzine-automation` | 用户安装 | Automate Heyzine tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| html-to-image-automation | `html-to-image-automation` | 用户安装 | Automate Html To Image tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| imagekit-io-automation | `imagekit-io-automation` | 用户安装 | Automate Imagekit IO tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| imgbb-automation | `imgbb-automation` | 用户安装 | Automate Imgbb tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| imgix-automation | `imgix-automation` | 用户安装 | Automate Imgix tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| kraken-io-automation | `kraken-io-automation` | 用户安装 | Automate Kraken IO tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| logo-dev-automation | `logo-dev-automation` | 用户安装 | Automate Logo Dev tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| loomio-automation | `loomio-automation` | 用户安装 | Automate Loomio tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| pexels-automation | `pexels-automation` | 用户安装 | Automate Pexels tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| placid-automation | `placid-automation` | 用户安装 | Automate Placid tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| printautopilot-automation | `printautopilot-automation` | 用户安装 | Automate Printautopilot tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| remove-bg-automation | `remove-bg-automation` | 用户安装 | Automate Remove Bg tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| rev-ai-automation | `rev-ai-automation` | 用户安装 | Automate Rev AI tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| screenshot-fyi-automation | `screenshot-fyi-automation` | 用户安装 | Automate Screenshot Fyi tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| screenshotone-automation | `screenshotone-automation` | 用户安装 | Automate Screenshotone tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| shortpixel-automation | `shortpixel-automation` | 用户安装 | Automate Shortpixel tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| shotstack-automation | `shotstack-automation` | 用户安装 | Automate Shotstack tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| smugmug-automation | `smugmug-automation` | 用户安装 | Automate Smugmug tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| Spotify Automation | `spotify-automation` | 用户安装 | Automate Spotify workflows including playlist management, music search, playback control, and user profile access via Composio |
| spotlightr-automation | `spotlightr-automation` | 用户安装 | Automate Spotlightr tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| theme-factory | `theme-factory` | 用户安装 | Toolkit for styling artifacts with a theme. These artifacts can be slides, docs, reportings, HTML landing pages, etc. There are 10 pre-set themes with colors/fonts that you can apply to any artifact that has been creating, or can generate a new theme on-the-fly. |
| Uploadcare Automation | `uploadcare-automation` | 用户安装 | Automate Uploadcare file management including listing, storing, inspecting, downloading, and organizing file groups through natural language commands |
| visme-automation | `visme-automation` | 用户安装 | Automate Visme tasks via Rube MCP (Composio). Always search tools first for current schemas. |

### 开发者工具、代码与 DevOps（48）

代码库迁移、CI/CD、监控、错误追踪、数据库与开发者平台。

| Skill | 目录 | 来源 | 功能简介 |
|---|---|---|---|
| anchor-browser-automation | `anchor-browser-automation` | 用户安装 | Automate Anchor Browser tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| appcircle-automation | `appcircle-automation` | 用户安装 | Automate Appcircle tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| appveyor-automation | `appveyor-automation` | 用户安装 | Automate Appveyor tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| atlassian-automation | `atlassian-automation` | 用户安装 | Automate Atlassian tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| backendless-automation | `backendless-automation` | 用户安装 | Automate Backendless tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| better-stack-automation | `better-stack-automation` | 用户安装 | Automate Better Stack tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| browserbase-tool-automation | `browserbase-tool-automation` | 用户安装 | Automate Browserbase Tool tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| browserless-automation | `browserless-automation` | 用户安装 | Automate Browserless tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| bubble-automation | `bubble-automation` | 用户安装 | Automate Bubble tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| bugbug-automation | `bugbug-automation` | 用户安装 | Automate Bugbug tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| bugherd-automation | `bugherd-automation` | 用户安装 | Automate Bugherd tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| bugsnag-automation | `bugsnag-automation` | 用户安装 | Automate Bugsnag tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| buildkite-automation | `buildkite-automation` | 用户安装 | Automate Buildkite tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| cloudflare-browser-rendering-automation | `cloudflare-browser-rendering-automation` | 用户安装 | Automate Cloudflare Browser Rendering tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| codacy-automation | `codacy-automation` | 用户安装 | Automate Codacy tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| datadog-logs | `datadog-logs` | 用户安装 | Query and filter Datadog logs from the shell using the Composio CLI. Run scoped log searches, pivot across services/environments, and export structured JSON for downstream agents instead of click-driving the Datadog UI. |
| deploy-pipeline | `deploy-pipeline` | 用户安装 | Run end-to-end deploy pipelines across Stripe, Supabase, and Vercel using the Composio CLI. Promote Stripe products, push Supabase migrations, ship Vercel deployments, and verify with post-deploy checks — all from one script. |
| gh-address-comments | `gh-address-comments` | 用户安装 | Help address review/issue comments on the open GitHub PR for the current branch using gh CLI; verify gh auth first and prompt the user to authenticate if not logged in. |
| gh-fix-ci | `gh-fix-ci` | 用户安装 | Inspect GitHub PR checks with gh, pull failing GitHub Actions logs, summarize failure context, then create a fix plan and implement after user approval. Use when a user asks to debug or fix failing PR CI/CD checks on GitHub Actions and wants a plan + code changes; for external checks (e.g., Buildkite), only report the details URL and mark them out of scope. |
| googlebigquery-automation | `googlebigquery-automation` | 用户安装 | Automate Google BigQuery tasks via Rube MCP (Composio): run SQL queries, explore datasets and metadata, execute MBQL queries via Metabase integration. Always search tools first for current schemas. |
| grafbase-automation | `grafbase-automation` | 用户安装 | Automate Grafbase tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| honeybadger-automation | `honeybadger-automation` | 用户安装 | Automate Honeybadger tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| hyperbrowser-automation | `hyperbrowser-automation` | 用户安装 | Automate Hyperbrowser tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| influxdb-cloud-automation | `influxdb-cloud-automation` | 用户安装 | Automate Influxdb Cloud tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| launch_darkly-automation | `launch_darkly-automation` | 用户安装 | Automate LaunchDarkly tasks via Rube MCP (Composio): feature flags, environments, segments, and rollout management. Always search tools first for current schemas. |
| LaunchDarkly Automation | `launch-darkly-automation` | 用户安装 | Automate LaunchDarkly feature flag management -- list projects and environments, create and delete trigger workflows, and track code references via the Composio MCP integration. |
| Neon Automation | `neon-automation` | 用户安装 | Automate Neon serverless Postgres operations -- manage projects, branches, databases, roles, and connection URIs via the Composio MCP integration. |
| New Relic Automation | `new-relic-automation` | 用户安装 | Automate New Relic observability workflows -- manage alert policies, notification channels, alert conditions, and monitor applications and browser apps via the Composio MCP integration. |
| new_relic-automation | `new_relic-automation` | 用户安装 | Automate New Relic tasks via Rube MCP (Composio): APM, alerts, dashboards, NRQL queries, and infrastructure monitoring. Always search tools first for current schemas. |
| npm-automation | `npm-automation` | 用户安装 | Automate NPM tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| pingdom-automation | `pingdom-automation` | 用户安装 | Automate Pingdom tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| plasmic-automation | `plasmic-automation` | 用户安装 | Automate Plasmic tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| prisma-automation | `prisma-automation` | 用户安装 | Automate Prisma tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| Productboard Automation | `productboard-automation` | 用户安装 | Automate product management workflows in Productboard -- manage features, notes, objectives, components, and releases through natural language commands. |
| productlane-automation | `productlane-automation` | 用户安装 | Automate Productlane tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| project-bubble-automation | `project-bubble-automation` | 用户安装 | Automate Project Bubble tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| pr-review-ci-fix | `pr-review-ci-fix` | 用户安装 | Automated PR review and CI auto-fix for GitHub and GitLab using the Composio CLI. Pulls diffs, fetches failing job logs, posts review comments, and loops fix commits until checks go green. |
| sentry-triage | `sentry-triage` | 用户安装 | Diagnose Sentry issues without copy-pasting stack traces. Uses the Composio CLI to pull issue details, events, breadcrumbs, and suspect commits, then maps the frames to local source so the agent can propose a fix directly. |
| seqera-automation | `seqera-automation` | 用户安装 | Automate Seqera tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| Shortcut Automation | `shortcut-automation` | 用户安装 | Automate project management workflows in Shortcut -- create stories, manage tasks, track epics, and organize workflows through natural language commands. |
| Snowflake Automation | `snowflake-automation` | 用户安装 | Automate Snowflake data warehouse operations -- list databases, schemas, and tables, execute SQL statements, and manage data workflows via the Composio MCP integration. |
| sourcegraph-automation | `sourcegraph-automation` | 用户安装 | Automate Sourcegraph tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| statuscake-automation | `statuscake-automation` | 用户安装 | Automate Statuscake tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| turbot-pipes-automation | `turbot-pipes-automation` | 用户安装 | Automate Turbot Pipes tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| turso-automation | `turso-automation` | 用户安装 | Automate Turso tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| uptimerobot-automation | `uptimerobot-automation` | 用户安装 | Automate Uptimerobot tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| v0-automation | `v0-automation` | 用户安装 | Automate V0 tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| wakatime-automation | `wakatime-automation` | 用户安装 | Automate Wakatime tasks via Rube MCP (Composio). Always search tools first for current schemas. |

### 安全、身份、网络与基础设施（32）

身份认证、密码/密钥、安全扫描、DNS/IP、网络、云和基础设施工具。

| Skill | 目录 | 来源 | 功能简介 |
|---|---|---|---|
| auth0-automation | `auth0-automation` | 用户安装 | Automate Auth0 tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| bitwarden-automation | `bitwarden-automation` | 用户安装 | Automate Bitwarden tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| brightdata-automation | `brightdata-automation` | 用户安装 | Automate Brightdata tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| cloudflare-api-key-automation | `cloudflare-api-key-automation` | 用户安装 | Automate Cloudflare API tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| cloudflare-automation | `cloudflare-automation` | 用户安装 | Automate Cloudflare tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| control-d-automation | `control-d-automation` | 用户安装 | Automate Control D tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| digicert-automation | `digicert-automation` | 用户安装 | Automate Digicert tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| digital-ocean-automation | `digital-ocean-automation` | 用户安装 | Automate DigitalOcean tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| Docker Hub Automation | `docker-hub-automation` | 用户安装 | Automate Docker Hub operations -- manage organizations, repositories, teams, members, and webhooks via the Composio MCP integration. |
| domain-name-brainstormer | `domain-name-brainstormer` | 用户安装 | Generates creative domain name ideas for your project and checks availability across multiple TLDs (.com, .io, .dev, .ai, etc.). Saves hours of brainstorming and manual checking. |
| globalping-automation | `globalping-automation` | 用户安装 | Automate Globalping tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| google_admin-automation | `google_admin-automation` | 用户安装 | Automate Google Admin tasks via Rube MCP (Composio): user management, org units, groups, and domain administration. Always search tools first for current schemas. |
| hookdeck-automation | `hookdeck-automation` | 用户安装 | Automate Hookdeck tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| ip2location-automation | `ip2location-automation` | 用户安装 | Automate Ip2location tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| ip2location-io-automation | `ip2location-io-automation` | 用户安装 | Automate Ip2location IO tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| ip2proxy-automation | `ip2proxy-automation` | 用户安装 | Automate Ip2proxy tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| ip2whois-automation | `ip2whois-automation` | 用户安装 | Automate Ip2whois tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| ipdata-co-automation | `ipdata-co-automation` | 用户安装 | Automate Ipdata co tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| ipinfo-io-automation | `ipinfo-io-automation` | 用户安装 | Automate Ipinfo IO tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| jumpcloud-automation | `jumpcloud-automation` | 用户安装 | Automate Jumpcloud tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| lastpass-automation | `lastpass-automation` | 用户安装 | Automate Lastpass tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| mx-toolbox-automation | `mx-toolbox-automation` | 用户安装 | Automate Mx Toolbox tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| nango-automation | `nango-automation` | 用户安装 | Automate Nango tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| nextdns-automation | `nextdns-automation` | 用户安装 | Automate Nextdns tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| ngrok-automation | `ngrok-automation` | 用户安装 | Automate Ngrok tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| rootly-automation | `rootly-automation` | 用户安装 | Automate Rootly tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| securitytrails-automation | `securitytrails-automation` | 用户安装 | Automate Securitytrails tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| smartproxy-automation | `smartproxy-automation` | 用户安装 | Automate Smartproxy tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| sslmate-cert-spotter-api-automation | `sslmate-cert-spotter-api-automation` | 用户安装 | Automate Sslmate Cert Spotter API tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| svix-automation | `svix-automation` | 用户安装 | Automate Svix tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| virustotal-automation | `virustotal-automation` | 用户安装 | Automate Virustotal tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| wiz-automation | `wiz-automation` | 用户安装 | Automate Wiz tasks via Rube MCP (Composio). Always search tools first for current schemas. |

### 数据、搜索、采集与研究（60）

网页采集、搜索、数据集、金融/新闻/学术数据和研究辅助。

| Skill | 目录 | 来源 | 功能简介 |
|---|---|---|---|
| abstract-automation | `abstract-automation` | 用户安装 | Automate Abstract tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| agenty-automation | `agenty-automation` | 用户安装 | Automate Agenty tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| alpha-vantage-automation | `alpha-vantage-automation` | 用户安装 | Automate Alpha Vantage tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| amazon-automation | `amazon-automation` | 用户安装 | Automate Amazon tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| api-bible-automation | `api-bible-automation` | 用户安装 | Automate API Bible tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| Apify Automation | `apify-automation` | 用户安装 | Automate web scraping and data extraction with Apify -- run Actors, manage datasets, create reusable tasks, and retrieve crawl results through the Composio Apify integration. |
| api-ninjas-automation | `api-ninjas-automation` | 用户安装 | Automate API Ninjas tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| beaconchain-automation | `beaconchain-automation` | 用户安装 | Automate Beaconchain tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| bestbuy-automation | `bestbuy-automation` | 用户安装 | Automate Bestbuy tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| bitquery-automation | `bitquery-automation` | 用户安装 | Automate Bitquery tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| brandfetch-automation | `brandfetch-automation` | 用户安装 | Automate Brandfetch tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| browseai-automation | `browseai-automation` | 用户安装 | Automate Browseai tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| browser-tool-automation | `browser-tool-automation` | 用户安装 | Automate Browser Tool tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| builtwith-automation | `builtwith-automation` | 用户安装 | Automate Builtwith tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| census-bureau-automation | `census-bureau-automation` | 用户安装 | Automate Census Bureau tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| coinmarketcap-automation | `coinmarketcap-automation` | 用户安装 | Automate Coinmarketcap tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| coinranking-automation | `coinranking-automation` | 用户安装 | Automate Coinranking tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| currents-api-automation | `currents-api-automation` | 用户安装 | Automate Currents API tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| dictionary-api-automation | `dictionary-api-automation` | 用户安装 | Automate Dictionary API tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| diffbot-automation | `diffbot-automation` | 用户安装 | Automate Diffbot tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| dromo-automation | `dromo-automation` | 用户安装 | Automate Dromo tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| eodhd-apis-automation | `eodhd-apis-automation` | 用户安装 | Automate Eodhd Apis tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| exa-automation | `exa-automation` | 用户安装 | Automate Exa tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| finage-automation | `finage-automation` | 用户安装 | Automate Finage tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| Firecrawl Automation | `firecrawl-automation` | 用户安装 | Automate web crawling and data extraction with Firecrawl -- scrape pages, crawl sites, extract structured data, batch scrape URLs, and map website structures through the Composio Firecrawl integration. |
| geoapify-automation | `geoapify-automation` | 用户安装 | Automate Geoapify tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| gigasheet-automation | `gigasheet-automation` | 用户安装 | Automate Gigasheet tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| hackernews-automation | `hackernews-automation` | 用户安装 | Automate Hackernews tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| junglescout-automation | `junglescout-automation` | 用户安装 | Automate Junglescout tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| kadoa-automation | `kadoa-automation` | 用户安装 | Automate Kadoa tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| kaggle-automation | `kaggle-automation` | 用户安装 | Automate Kaggle tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| linkup-automation | `linkup-automation` | 用户安装 | Automate Linkup tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| mboum-automation | `mboum-automation` | 用户安装 | Automate Mboum tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| nasa-automation | `nasa-automation` | 用户安装 | Automate Nasa tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| nasdaq-automation | `nasdaq-automation` | 用户安装 | Automate Nasdaq tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| news-api-automation | `news-api-automation` | 用户安装 | Automate News API tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| openweather-api-automation | `openweather-api-automation` | 用户安装 | Automate Openweather API tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| parsehub-automation | `parsehub-automation` | 用户安装 | Automate Parsehub tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| parsera-automation | `parsera-automation` | 用户安装 | Automate Parsera tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| parseur-automation | `parseur-automation` | 用户安装 | Automate Parseur tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| perigon-automation | `perigon-automation` | 用户安装 | Automate Perigon tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| polygon-automation | `polygon-automation` | 用户安装 | Automate Polygon tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| polygon-io-automation | `polygon-io-automation` | 用户安装 | Automate Polygon IO tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| remote-retrieval-automation | `remote-retrieval-automation` | 用户安装 | Automate Remote Retrieval tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| scrape-do-automation | `scrape-do-automation` | 用户安装 | Automate Scrape Do tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| scrapegraph-ai-automation | `scrapegraph-ai-automation` | 用户安装 | Automate Scrapegraph AI tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| scrapfly-automation | `scrapfly-automation` | 用户安装 | Automate Scrapfly tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| scrapingant-automation | `scrapingant-automation` | 用户安装 | Automate Scrapingant tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| scrapingbee-automation | `scrapingbee-automation` | 用户安装 | Automate Scrapingbee tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| semanticscholar-automation | `semanticscholar-automation` | 用户安装 | Automate Semanticscholar tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| serpapi-automation | `serpapi-automation` | 用户安装 | Automate Serpapi tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| serpdog-automation | `serpdog-automation` | 用户安装 | Automate Serpdog tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| serply-automation | `serply-automation` | 用户安装 | Automate Serply tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| tavily-automation | `tavily-automation` | 用户安装 | Automate Tavily tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| token-metrics-automation | `token-metrics-automation` | 用户安装 | Automate Token Metrics tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| twelve-data-automation | `twelve-data-automation` | 用户安装 | Automate Twelve Data tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| webscraping-ai-automation | `webscraping-ai-automation` | 用户安装 | Automate Webscraping AI tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| yousearch-automation | `yousearch-automation` | 用户安装 | Automate Yousearch tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| zenrows-automation | `zenrows-automation` | 用户安装 | Automate Zenrows tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| zyte-api-automation | `zyte-api-automation` | 用户安装 | Automate Zyte API tasks via Rube MCP (Composio). Always search tools first for current schemas. |

### 财务、支付、电商与库存（42）

会计、发票、支付、采购、费用、线上商店、订单和库存。

| Skill | 目录 | 来源 | 功能简介 |
|---|---|---|---|
| altoviz-automation | `altoviz-automation` | 用户安装 | Automate Altoviz tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| baselinker-automation | `baselinker-automation` | 用户安装 | Automate Baselinker tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| bookingmood-automation | `bookingmood-automation` | 用户安装 | Automate Bookingmood tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| booqable-automation | `booqable-automation` | 用户安装 | Automate Booqable tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| Braintree Automation | `braintree-automation` | 用户安装 | Braintree Automation: manage payment processing via Stripe-compatible tools for customers, subscriptions, payment methods, and transactions |
| brex-automation | `brex-automation` | 用户安装 | Automate Brex tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| brex-staging-automation | `brex-staging-automation` | 用户安装 | Automate Brex Staging tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| btcpay-server-automation | `btcpay-server-automation` | 用户安装 | Automate Btcpay Server tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| cloudcart-automation | `cloudcart-automation` | 用户安装 | Automate Cloudcart tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| Coinbase Automation | `coinbase-automation` | 用户安装 | Coinbase Automation: list and manage cryptocurrency wallets, accounts, and portfolio data via Coinbase CDP SDK |
| coupa-automation | `coupa-automation` | 用户安装 | Automate Coupa tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| elorus-automation | `elorus-automation` | 用户安装 | Automate Elorus tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| flutterwave-automation | `flutterwave-automation` | 用户安装 | Automate Flutterwave tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| FreshBooks Automation | `freshbooks-automation` | 用户安装 | FreshBooks Automation: manage businesses, projects, time tracking, and billing in FreshBooks cloud accounting |
| instacart-automation | `instacart-automation` | 用户安装 | Automate Instacart tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| Lemon Squeezy Automation | `lemon-squeezy-automation` | 用户安装 | Automate Lemon Squeezy store management -- products, orders, subscriptions, customers, discounts, and checkout tracking -- using natural language through the Composio MCP integration. |
| lemon_squeezy-automation | `lemon_squeezy-automation` | 用户安装 | Automate Lemon Squeezy tasks via Rube MCP (Composio): products, orders, subscriptions, checkouts, and digital sales. Always search tools first for current schemas. |
| lexoffice-automation | `lexoffice-automation` | 用户安装 | Automate Lexoffice tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| loyverse-automation | `loyverse-automation` | 用户安装 | Automate Loyverse tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| moneybird-automation | `moneybird-automation` | 用户安装 | Automate Moneybird tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| moonclerk-automation | `moonclerk-automation` | 用户安装 | Automate Moonclerk tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| moxie-automation | `moxie-automation` | 用户安装 | Automate Moxie tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| NetSuite Automation | `netsuite-automation` | 用户安装 | NetSuite Automation: manage customers, sales orders, invoices, inventory, and records via Oracle NetSuite ERP with SuiteQL queries |
| payhip-automation | `payhip-automation` | 用户安装 | Automate Payhip tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| plisio-automation | `plisio-automation` | 用户安装 | Automate Plisio tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| precoro-automation | `precoro-automation` | 用户安装 | Automate Precoro tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| quaderno-automation | `quaderno-automation` | 用户安装 | Automate Quaderno tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| QuickBooks Automation | `quickbooks-automation` | 用户安装 | QuickBooks Automation: manage invoices, customers, accounts, and payments in QuickBooks Online for streamlined bookkeeping |
| sevdesk-automation | `sevdesk-automation` | 用户安装 | Automate Sevdesk tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| shipengine-automation | `shipengine-automation` | 用户安装 | Automate Shipengine tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| storeganise-automation | `storeganise-automation` | 用户安装 | Automate Storeganise tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| storerocket-automation | `storerocket-automation` | 用户安装 | Automate Storerocket tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| taxjar-automation | `taxjar-automation` | 用户安装 | Automate Taxjar tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| wave_accounting-automation | `wave_accounting-automation` | 用户安装 | Automate Wave Accounting tasks via Rube MCP (Composio): invoices, customers, payments, and small business accounting. Always search tools first for current schemas. |
| Xero Automation | `xero-automation` | 用户安装 | Xero Automation: manage invoices, contacts, payments, bank transactions, and accounts in Xero for cloud-based bookkeeping |
| ynab-automation | `ynab-automation` | 用户安装 | Automate Ynab tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| zoho_books-automation | `zoho_books-automation` | 用户安装 | Automate Zoho Books tasks via Rube MCP (Composio): invoices, expenses, contacts, payments, and accounting. Always search tools first for current schemas. |
| zoho_inventory-automation | `zoho_inventory-automation` | 用户安装 | Automate Zoho Inventory tasks via Rube MCP (Composio): items, orders, warehouses, shipments, and stock management. Always search tools first for current schemas. |
| zoho_invoice-automation | `zoho_invoice-automation` | 用户安装 | Automate Zoho Invoice tasks via Rube MCP (Composio): invoices, estimates, expenses, clients, and payment tracking. Always search tools first for current schemas. |
| zoho-inventory-automation | `zoho-inventory-automation` | 用户安装 | Automate Zoho Inventory tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| zoho-invoice-automation | `zoho-invoice-automation` | 用户安装 | Automate Zoho Invoice tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| zylvie-automation | `zylvie-automation` | 用户安装 | Automate Zylvie tasks via Rube MCP (Composio). Always search tools first for current schemas. |

### 人力资源、招聘与工时（35）

招聘 ATS、人事、薪资、排班、工时和服务运营。

| Skill | 目录 | 来源 | 功能简介 |
|---|---|---|---|
| accelo-automation | `accelo-automation` | 用户安装 | Automate Accelo tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| aero-workflow-automation | `aero-workflow-automation` | 用户安装 | Automate Aero Workflow tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| appointo-automation | `appointo-automation` | 用户安装 | Automate Appointo tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| Ashby Automation | `ashby-automation` | 用户安装 | Automate recruiting and hiring workflows in Ashby -- manage candidates, jobs, applications, interviews, and notes through natural language commands. |
| async-interview-automation | `async-interview-automation` | 用户安装 | Automate Async Interview tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| breezy-hr-automation | `breezy-hr-automation` | 用户安装 | Automate Breezy HR tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| cats-automation | `cats-automation` | 用户安装 | Automate Cats tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| Clockify Automation | `clockify-automation` | 用户安装 | Automate time tracking workflows in Clockify -- create and manage time entries, workspaces, and users through natural language commands. |
| deel-automation | `deel-automation` | 用户安装 | Automate Deel tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| desktime-automation | `desktime-automation` | 用户安装 | Automate Desktime tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| everhour-automation | `everhour-automation` | 用户安装 | Automate Everhour tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| factorial-automation | `factorial-automation` | 用户安装 | Automate Factorial tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| Harvest Automation | `harvest-automation` | 用户安装 | Automate time tracking, project management, and invoicing workflows in Harvest -- log hours, manage projects, clients, and tasks through natural language commands. |
| icims-talent-cloud-automation | `icims-talent-cloud-automation` | 用户安装 | Automate Icims Talent Cloud tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| jobnimbus-automation | `jobnimbus-automation` | 用户安装 | Automate Jobnimbus tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| Lever Automation | `lever-automation` | 用户安装 | Automate recruiting workflows in Lever ATS -- manage opportunities, job postings, requisitions, pipeline stages, and candidate tags through the Composio Lever integration. |
| leverly-automation | `leverly-automation` | 用户安装 | Automate Leverly tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| lever-sandbox-automation | `lever-sandbox-automation` | 用户安装 | Automate Lever Sandbox tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| magnetic-automation | `magnetic-automation` | 用户安装 | Automate Magnetic tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| maintainx-automation | `maintainx-automation` | 用户安装 | Automate Maintainx tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| moco-automation | `moco-automation` | 用户安装 | Automate Moco tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| recruitee-automation | `recruitee-automation` | 用户安装 | Automate Recruitee tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| rippling-automation | `rippling-automation` | 用户安装 | Automate Rippling tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| safetyculture-automation | `safetyculture-automation` | 用户安装 | Automate Safetyculture tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| sap-successfactors-automation | `sap-successfactors-automation` | 用户安装 | Automate SAP SuccessFactors tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| smartrecruiters-automation | `smartrecruiters-automation` | 用户安装 | Automate Smartrecruiters tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| tailored-resume-generator | `tailored-resume-generator` | 用户安装 | Analyzes job descriptions and generates tailored resumes that highlight relevant experience, skills, and achievements to maximize interview chances |
| talenthr-automation | `talenthr-automation` | 用户安装 | Automate Talenthr tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| teamcamp-automation | `teamcamp-automation` | 用户安装 | Automate Teamcamp tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| timecamp-automation | `timecamp-automation` | 用户安装 | Automate Timecamp tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| timely-automation | `timely-automation` | 用户安装 | Automate Timely tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| Toggl Automation | `toggl-automation` | 用户安装 | Automate time tracking workflows in Toggl Track -- create time entries, manage projects, clients, tags, and workspaces through natural language commands. |
| workable-automation | `workable-automation` | 用户安装 | Automate Workable tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| Workday Automation | `workday-automation` | 用户安装 | Automate HR operations in Workday -- manage workers, time off requests, absence balances, and employee data through natural language commands. |
| worksnaps-automation | `worksnaps-automation` | 用户安装 | Automate Worksnaps tasks via Rube MCP (Composio). Always search tools first for current schemas. |

### 生产力、协作与知识管理（20）

笔记、文档协作、云盘、任务、会议纪要、表格和个人/团队效率工具。

| Skill | 目录 | 来源 | 功能简介 |
|---|---|---|---|
| beeminder-automation | `beeminder-automation` | 用户安装 | Automate Beeminder tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| boxhero-automation | `boxhero-automation` | 用户安装 | Automate Boxhero tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| dovetail-automation | `dovetail-automation` | 用户安装 | Automate Dovetail tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| fibery-automation | `fibery-automation` | 用户安装 | Automate Fibery tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| google-admin-automation | `google-admin-automation` | 用户安装 | Automate Google Workspace Admin tasks via Rube MCP (Composio): manage users, groups, memberships, suspend accounts, create users, add aliases. Always search tools first for current schemas. |
| googleslides-automation | `googleslides-automation` | 用户安装 | Automate Google Slides tasks via Rube MCP (Composio): create presentations, add slides from Markdown, batch update, copy from templates, get thumbnails. Always search tools first for current schemas. |
| googletasks-automation | `googletasks-automation` | 用户安装 | Automate Google Tasks via Rube MCP (Composio): create, list, update, delete, move, and bulk-insert tasks and task lists. Always search tools first for current schemas. |
| grist-automation | `grist-automation` | 用户安装 | Automate Grist tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| habitica-automation | `habitica-automation` | 用户安装 | Automate Habitica tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| listennotes-automation | `listennotes-automation` | 用户安装 | Automate Listennotes tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| mem0-automation | `mem0-automation` | 用户安装 | Automate Mem0 tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| mem-automation | `mem-automation` | 用户安装 | Automate Mem tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| Microsoft Clarity Automation | `microsoft-clarity-automation` | 用户安装 | Automate user behavior analytics with Microsoft Clarity -- export heatmap data, session metrics, and engagement analytics segmented by browser, device, country, source, and more through the Composio Microsoft Clarity integration. |
| microsoft_clarity-automation | `microsoft_clarity-automation` | 用户安装 | Automate Microsoft Clarity tasks via Rube MCP (Composio): session recordings, heatmaps, and user behavior analytics. Always search tools first for current schemas. |
| microsoft-tenant-automation | `microsoft-tenant-automation` | 用户安装 | Automate Microsoft Tenant tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| mural-automation | `mural-automation` | 用户安装 | Automate Mural tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| notion-knowledge-capture | `notion-knowledge-capture` | 用户安装 | Capture conversations and decisions into structured Notion pages; use when turning chats/notes into wiki entries, how-tos, decisions, or FAQs with proper linking. |
| notion-spec-to-implementation | `notion-spec-to-implementation` | 用户安装 | Turn Notion specs into implementation plans, tasks, and progress tracking; use when implementing PRDs/feature specs and creating Notion plans + tasks from them. |
| short-menu-automation | `short-menu-automation` | 用户安装 | Automate Short Menu tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| ticktick-automation | `ticktick-automation` | 用户安装 | Automate Ticktick tasks via Rube MCP (Composio). Always search tools first for current schemas. |

### 地图、位置、活动与公共数据（29）

地图、地址、地理编码、天气、活动票务、体育和公共数据 API。

| Skill | 目录 | 来源 | 功能简介 |
|---|---|---|---|
| addresszen-automation | `addresszen-automation` | 用户安装 | Automate Addresszen tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| ambee-automation | `ambee-automation` | 用户安装 | Automate Ambee tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| ambient-weather-automation | `ambient-weather-automation` | 用户安装 | Automate Ambient Weather tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| api-sports-automation | `api-sports-automation` | 用户安装 | Automate API Sports tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| bart-automation | `bart-automation` | 用户安装 | Automate Bart tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| college-football-data-automation | `college-football-data-automation` | 用户安装 | Automate College Football Data tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| expofp-automation | `expofp-automation` | 用户安装 | Automate Expofp tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| foursquare-automation | `foursquare-automation` | 用户安装 | Automate Foursquare tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| geocodio-automation | `geocodio-automation` | 用户安装 | Automate Geocodio tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| geokeo-automation | `geokeo-automation` | 用户安装 | Automate Geokeo tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| google_maps-automation | `google_maps-automation` | 用户安装 | Automate Google Maps tasks via Rube MCP (Composio): geocoding, directions, place search, and distance calculations. Always search tools first for current schemas. |
| google-address-validation-automation | `google-address-validation-automation` | 用户安装 | Automate Google Address Validation tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| google-maps-automation | `google-maps-automation` | 用户安装 | Automate Google Maps tasks via Rube MCP (Composio): geocode addresses, search places, get directions, compute route matrices, reverse geocode, autocomplete, get place details. Always search tools first for current schemas. |
| graphhopper-automation | `graphhopper-automation` | 用户安装 | Automate Graphhopper tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| here-automation | `here-automation` | 用户安装 | Automate Here tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| iqair-airvisual-automation | `iqair-airvisual-automation` | 用户安装 | Automate Iqair Airvisual tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| mapbox-automation | `mapbox-automation` | 用户安装 | Automate Mapbox tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| opencage-automation | `opencage-automation` | 用户安装 | Automate Opencage tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| optimoroute-automation | `optimoroute-automation` | 用户安装 | Automate Optimoroute tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| placekey-automation | `placekey-automation` | 用户安装 | Automate Placekey tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| radar-automation | `radar-automation` | 用户安装 | Automate Radar tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| route4me-automation | `route4me-automation` | 用户安装 | Automate Route4me tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| seat-geek-automation | `seat-geek-automation` | 用户安装 | Automate Seat Geek tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| stormglass-io-automation | `stormglass-io-automation` | 用户安装 | Automate Stormglass IO tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| the-odds-api-automation | `the-odds-api-automation` | 用户安装 | Automate The Odds API tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| tomtom-automation | `tomtom-automation` | 用户安装 | Automate Tomtom tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| tripadvisor-content-api-automation | `tripadvisor-content-api-automation` | 用户安装 | Automate TripAdvisor tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| weathermap-automation | `weathermap-automation` | 用户安装 | Automate Weathermap tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| yelp-automation | `yelp-automation` | 用户安装 | Automate Yelp tasks via Rube MCP (Composio). Always search tools first for current schemas. |

### 教育与学习（6）

学习管理系统、课程、课堂、测评和教育平台自动化。

| Skill | 目录 | 来源 | 功能简介 |
|---|---|---|---|
| blackboard-automation | `blackboard-automation` | 用户安装 | Automate Blackboard tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| canvas-automation | `canvas-automation` | 用户安装 | Automate Canvas tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| coassemble-automation | `coassemble-automation` | 用户安装 | Automate Coassemble tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| d2lbrightspace-automation | `d2lbrightspace-automation` | 用户安装 | Automate D2lbrightspace tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| google-classroom-automation | `google-classroom-automation` | 用户安装 | Automate Google Classroom tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| lessonspace-automation | `lessonspace-automation` | 用户安装 | Automate Lessonspace tasks via Rube MCP (Composio). Always search tools first for current schemas. |

### 健康、生活与服务行业（4）

健康、健身、生活服务、环境和线下服务运营自动化。

| Skill | 目录 | 来源 | 功能简介 |
|---|---|---|---|
| fitbit-automation | `fitbit-automation` | 用户安装 | Automate Fitbit tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| more-trees-automation | `more-trees-automation` | 用户安装 | Automate More Trees tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| sensibo-automation | `sensibo-automation` | 用户安装 | Automate Sensibo tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| strava-automation | `strava-automation` | 用户安装 | Automate Strava tasks via Rube MCP (Composio). Always search tools first for current schemas. |

### 娱乐、社交、游戏与 Web3（7）

音乐、播客、游戏、社交平台、区块链和 NFT 服务。

| Skill | 目录 | 来源 | 功能简介 |
|---|---|---|---|
| battlenet-automation | `battlenet-automation` | 用户安装 | Automate Battlenet tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| cults-automation | `cults-automation` | 用户安装 | Automate Cults tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| dungeon-fighter-online-automation | `dungeon-fighter-online-automation` | 用户安装 | Automate Dungeon Fighter Online tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| epic-games-automation | `epic-games-automation` | 用户安装 | Automate Epic Games tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| helium-mcp | `helium-mcp` | 用户安装 | Search real-time news with bias scoring, get live stock/ETF/crypto data with AI analysis, ML options pricing, balanced news synthesis, and meme search via the Helium MCP server. |
| open-sea-automation | `open-sea-automation` | 用户安装 | Automate Open Sea tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| twitch-automation | `twitch-automation` | 用户安装 | Automate Twitch tasks via Rube MCP (Composio). Always search tools first for current schemas. |

### IoT、硬件与设备（3）

IoT、硬件设备、传感器和实体设备控制。

| Skill | 目录 | 来源 | 功能简介 |
|---|---|---|---|
| beaconstac-automation | `beaconstac-automation` | 用户安装 | Automate Beaconstac tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| bolt-iot-automation | `bolt-iot-automation` | 用户安装 | Automate Bolt Iot tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| vestaboard-automation | `vestaboard-automation` | 用户安装 | Automate Vestaboard tasks via Rube MCP (Composio). Always search tools first for current schemas. |

### 其他通用 SaaS/API（232）

未能明确归入以上业务域的通用 SaaS/API 自动化技能。

| Skill | 目录 | 来源 | 功能简介 |
|---|---|---|---|
| -21risk-automation | `-21risk-automation` | 用户安装 | Automate 21risk tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| ably-automation | `ably-automation` | 用户安装 | Automate Ably tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| abuselpdb-automation | `abuselpdb-automation` | 用户安装 | Automate Abuselpdb tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| acculynx-automation | `acculynx-automation` | 用户安装 | Automate Acculynx tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| adobe-automation | `adobe-automation` | 用户安装 | Automate Adobe tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| adyntel-automation | `adyntel-automation` | 用户安装 | Automate Adyntel tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| aeroleads-automation | `aeroleads-automation` | 用户安装 | Automate Aeroleads tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| agentql-automation | `agentql-automation` | 用户安装 | Automate Agentql tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| agiled-automation | `agiled-automation` | 用户安装 | Automate Agiled tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| alchemy-automation | `alchemy-automation` | 用户安装 | Automate Alchemy tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| algolia-automation | `algolia-automation` | 用户安装 | Automate Algolia tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| amara-automation | `amara-automation` | 用户安装 | Automate Amara tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| amcards-automation | `amcards-automation` | 用户安装 | Automate Amcards tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| anonyflow-automation | `anonyflow-automation` | 用户安装 | Automate Anonyflow tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| apaleo-automation | `apaleo-automation` | 用户安装 | Automate Apaleo tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| apex27-automation | `apex27-automation` | 用户安装 | Automate Apex27 tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| apiflash-automation | `apiflash-automation` | 用户安装 | Automate Apiflash tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| api-labz-automation | `api-labz-automation` | 用户安装 | Automate API Labz tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| apilio-automation | `apilio-automation` | 用户安装 | Automate Apilio tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| apipie-ai-automation | `apipie-ai-automation` | 用户安装 | Automate Apipie AI tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| apiverve-automation | `apiverve-automation` | 用户安装 | Automate Apiverve tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| appdrag-automation | `appdrag-automation` | 用户安装 | Automate Appdrag tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| appsflyer-automation | `appsflyer-automation` | 用户安装 | Automate Appsflyer tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| aryn-automation | `aryn-automation` | 用户安装 | Automate Aryn tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| ascora-automation | `ascora-automation` | 用户安装 | Automate Ascora tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| asin-data-api-automation | `asin-data-api-automation` | 用户安装 | Automate Asin Data API tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| autom-automation | `autom-automation` | 用户安装 | Automate Autom tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| axonaut-automation | `axonaut-automation` | 用户安装 | Automate Axonaut tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| ayrshare-automation | `ayrshare-automation` | 用户安装 | Automate Ayrshare tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| baserow-automation | `baserow-automation` | 用户安装 | Automate Baserow tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| basin-automation | `basin-automation` | 用户安装 | Automate Basin tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| bench-automation | `bench-automation` | 用户安装 | Automate Bench tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| benzinga-automation | `benzinga-automation` | 用户安装 | Automate Benzinga tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| bidsketch-automation | `bidsketch-automation` | 用户安装 | Automate Bidsketch tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| big-data-cloud-automation | `big-data-cloud-automation` | 用户安装 | Automate Big Data Cloud tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| bigml-automation | `bigml-automation` | 用户安装 | Automate Bigml tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| blackbaud-automation | `blackbaud-automation` | 用户安装 | Automate Blackbaud tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| blocknative-automation | `blocknative-automation` | 用户安装 | Automate Blocknative tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| bonsai-automation | `bonsai-automation` | 用户安装 | Automate Bonsai tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| borneo-automation | `borneo-automation` | 用户安装 | Automate Borneo tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| botbaba-automation | `botbaba-automation` | 用户安装 | Automate Botbaba tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| botstar-automation | `botstar-automation` | 用户安装 | Automate Botstar tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| bouncer-automation | `bouncer-automation` | 用户安装 | Automate Bouncer tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| breeze-automation | `breeze-automation` | 用户安装 | Automate Breeze tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| brightpearl-automation | `brightpearl-automation` | 用户安装 | Automate Brightpearl tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| brilliant-directories-automation | `brilliant-directories-automation` | 用户安装 | Automate Brilliant Directories tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| browserhub-automation | `browserhub-automation` | 用户安装 | Automate Browserhub tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| bunnycdn-automation | `bunnycdn-automation` | 用户安装 | Automate Bunnycdn tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| cardly-automation | `cardly-automation` | 用户安装 | Automate Cardly tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| castingwords-automation | `castingwords-automation` | 用户安装 | Automate Castingwords tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| chaser-automation | `chaser-automation` | 用户安装 | Automate Chaser tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| cloudlayer-automation | `cloudlayer-automation` | 用户安装 | Automate Cloudlayer tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| cloudpress-automation | `cloudpress-automation` | 用户安装 | Automate Cloudpress tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| codereadr-automation | `codereadr-automation` | 用户安装 | Automate Codereadr tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| composio-automation | `composio-automation` | 用户安装 | Automate Composio tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| composio-search-automation | `composio-search-automation` | 用户安装 | Automate Composio Search tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| connecteam-automation | `connecteam-automation` | 用户安装 | Automate Connecteam tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| conveyor-automation | `conveyor-automation` | 用户安装 | Automate Conveyor tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| convolo-ai-automation | `convolo-ai-automation` | 用户安装 | Automate Convolo AI tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| corrently-automation | `corrently-automation` | 用户安装 | Automate Corrently tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| countdown-api-automation | `countdown-api-automation` | 用户安装 | Automate Countdown API tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| create-plan | `create-plan` | 用户安装 | Create a concise plan. Use when a user explicitly asks for a plan related to a coding task. |
| crowdin-automation | `crowdin-automation` | 用户安装 | Automate Crowdin tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| crustdata-automation | `crustdata-automation` | 用户安装 | Automate Crustdata tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| customjs-automation | `customjs-automation` | 用户安装 | Automate Customjs tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| cutt-ly-automation | `cutt-ly-automation` | 用户安装 | Automate Cutt Ly tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| dadata-ru-automation | `dadata-ru-automation` | 用户安装 | Automate Dadata Ru tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| daffy-automation | `daffy-automation` | 用户安装 | Automate Daffy tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| dailybot-automation | `dailybot-automation` | 用户安装 | Automate Dailybot tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| datarobot-automation | `datarobot-automation` | 用户安装 | Automate Datarobot tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| deadline-funnel-automation | `deadline-funnel-automation` | 用户安装 | Automate Deadline Funnel tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| detrack-automation | `detrack-automation` | 用户安装 | Automate Detrack tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| dialmycalls-automation | `dialmycalls-automation` | 用户安装 | Automate Dialmycalls tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| dnsfilter-automation | `dnsfilter-automation` | 用户安装 | Automate Dnsfilter tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| dock-certs-automation | `dock-certs-automation` | 用户安装 | Automate Dock Certs tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| dotsimple-automation | `dotsimple-automation` | 用户安装 | Automate Dotsimple tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| dpd2-automation | `dpd2-automation` | 用户安装 | Automate Dpd2 tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| echtpost-automation | `echtpost-automation` | 用户安装 | Automate Echtpost tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| email-draft-polish | `email-draft-polish` | 用户安装 | Draft, rewrite, or condense emails with target tone, length, and audience; use for cold outreach, replies, status updates, or escalations where clarity and brevity matter. |
| endorsal-automation | `endorsal-automation` | 用户安装 | Automate Endorsal tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| enigma-automation | `enigma-automation` | 用户安装 | Automate Enigma tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| entelligence-automation | `entelligence-automation` | 用户安装 | Automate Entelligence tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| esputnik-automation | `esputnik-automation` | 用户安装 | Automate Esputnik tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| etermin-automation | `etermin-automation` | 用户安装 | Automate Etermin tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| exist-automation | `exist-automation` | 用户安装 | Automate Exist tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| faceup-automation | `faceup-automation` | 用户安装 | Automate Faceup tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| fidel-api-automation | `fidel-api-automation` | 用户安装 | Automate Fidel API tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| fingertip-automation | `fingertip-automation` | 用户安装 | Automate Fingertip tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| finmei-automation | `finmei-automation` | 用户安装 | Automate Finmei tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| fireberry-automation | `fireberry-automation` | 用户安装 | Automate Fireberry tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| firmao-automation | `firmao-automation` | 用户安装 | Automate Firmao tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| fixer-automation | `fixer-automation` | 用户安装 | Automate Fixer tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| fixer-io-automation | `fixer-io-automation` | 用户安装 | Automate Fixer IO tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| fluxguard-automation | `fluxguard-automation` | 用户安装 | Automate Fluxguard tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| forcemanager-automation | `forcemanager-automation` | 用户安装 | Automate Forcemanager tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| fraudlabs-pro-automation | `fraudlabs-pro-automation` | 用户安装 | Automate Fraudlabs Pro tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| gagelist-automation | `gagelist-automation` | 用户安装 | Automate Gagelist tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| gatherup-automation | `gatherup-automation` | 用户安装 | Automate Gatherup tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| gift-up-automation | `gift-up-automation` | 用户安装 | Automate Gift Up tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| gist-automation | `gist-automation` | 用户安装 | Automate Gist tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| gleap-automation | `gleap-automation` | 用户安装 | Automate Gleap tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| godial-automation | `godial-automation` | 用户安装 | Automate Godial tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| goody-automation | `goody-automation` | 用户安装 | Automate Goody tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| google-cloud-vision-automation | `google-cloud-vision-automation` | 用户安装 | Automate Google Cloud Vision tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| googlesuper-automation | `googlesuper-automation` | 用户安装 | Automate Google Super tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| gosquared-automation | `gosquared-automation` | 用户安装 | Automate Gosquared tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| helcim-automation | `helcim-automation` | 用户安装 | Automate Helcim tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| helloleads-automation | `helloleads-automation` | 用户安装 | Automate Helloleads tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| heyreach-automation | `heyreach-automation` | 用户安装 | Automate Heyreach tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| highergov-automation | `highergov-automation` | 用户安装 | Automate Highergov tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| hotspotsystem-automation | `hotspotsystem-automation` | 用户安装 | Automate Hotspotsystem tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| hyperise-automation | `hyperise-automation` | 用户安装 | Automate Hyperise tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| idea-scale-automation | `idea-scale-automation` | 用户安装 | Automate Idea Scale tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| insighto-ai-automation | `insighto-ai-automation` | 用户安装 | Automate Insighto AI tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| intelliprint-automation | `intelliprint-automation` | 用户安装 | Automate Intelliprint tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| interzoid-automation | `interzoid-automation` | 用户安装 | Automate Interzoid tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| keap-automation | `keap-automation` | 用户安装 | Automate Keap tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| keen-io-automation | `keen-io-automation` | 用户安装 | Automate Keen IO tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| klipfolio-automation | `klipfolio-automation` | 用户安装 | Automate Klipfolio tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| ko-fi-automation | `ko-fi-automation` | 用户安装 | Automate Ko Fi tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| l2s-automation | `l2s-automation` | 用户安装 | Automate L2s tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| labs64-netlicensing-automation | `labs64-netlicensing-automation` | 用户安装 | Automate Labs64 Netlicensing tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| landbot-automation | `landbot-automation` | 用户安装 | Automate Landbot tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| leiga-automation | `leiga-automation` | 用户安装 | Automate Leiga tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| linguapop-automation | `linguapop-automation` | 用户安装 | Automate Linguapop tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| linkhut-automation | `linkhut-automation` | 用户安装 | Automate Linkhut tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| livesession-automation | `livesession-automation` | 用户安装 | Automate Livesession tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| lodgify-automation | `lodgify-automation` | 用户安装 | Automate Lodgify tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| many_chat-automation | `many_chat-automation` | 用户安装 | Automate ManyChat tasks via Rube MCP (Composio): chatbot flows, subscribers, broadcasts, and messenger automation. Always search tools first for current schemas. |
| mapulus-automation | `mapulus-automation` | 用户安装 | Automate Mapulus tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| melo-automation | `melo-automation` | 用户安装 | Automate Melo tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| memberspot-automation | `memberspot-automation` | 用户安装 | Automate Memberspot tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| memberstack-automation | `memberstack-automation` | 用户安装 | Automate Memberstack tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| membervault-automation | `membervault-automation` | 用户安装 | Automate Membervault tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| mezmo-automation | `mezmo-automation` | 用户安装 | Automate Mezmo tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| minerstat-automation | `minerstat-automation` | 用户安装 | Automate Minerstat tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| moosend-automation | `moosend-automation` | 用户安装 | Automate Moosend tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| mopinion-automation | `mopinion-automation` | 用户安装 | Automate Mopinion tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| mx-technologies-automation | `mx-technologies-automation` | 用户安装 | Automate MX Technologies tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| ncscale-automation | `ncscale-automation` | 用户安装 | Automate Ncscale tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| neutrino-automation | `neutrino-automation` | 用户安装 | Automate Neutrino tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| ninox-automation | `ninox-automation` | 用户安装 | Automate Ninox tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| onedesk-automation | `onedesk-automation` | 用户安装 | Automate Onedesk tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| onepage-automation | `onepage-automation` | 用户安装 | Automate Onepage tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| opengraph-io-automation | `opengraph-io-automation` | 用户安装 | Automate Opengraph IO tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| owl-protocol-automation | `owl-protocol-automation` | 用户安装 | Automate Owl Protocol tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| page-x-automation | `page-x-automation` | 用户安装 | Automate Page X tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| paradym-automation | `paradym-automation` | 用户安装 | Automate Paradym tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| parallel-automation | `parallel-automation` | 用户安装 | Automate Parallel tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| parma-automation | `parma-automation` | 用户安装 | Automate Parma tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| passcreator-automation | `passcreator-automation` | 用户安装 | Automate Passcreator tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| passslot-automation | `passslot-automation` | 用户安装 | Automate Passslot tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| piggy-automation | `piggy-automation` | 用户安装 | Automate Piggy tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| piloterr-automation | `piloterr-automation` | 用户安装 | Automate Piloterr tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| pilvio-automation | `pilvio-automation` | 用户安装 | Automate Pilvio tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| plain-automation | `plain-automation` | 用户安装 | Automate Plain tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| platerecognizer-automation | `platerecognizer-automation` | 用户安装 | Automate Platerecognizer tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| poptin-automation | `poptin-automation` | 用户安装 | Automate Poptin tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| postgrid-automation | `postgrid-automation` | 用户安装 | Automate Postgrid tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| postgrid-verify-automation | `postgrid-verify-automation` | 用户安装 | Automate Postgrid Verify tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| prerender-automation | `prerender-automation` | 用户安装 | Automate Prerender tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| process-street-automation | `process-street-automation` | 用户安装 | Automate Process Street tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| procfu-automation | `procfu-automation` | 用户安装 | Automate Procfu tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| proofly-automation | `proofly-automation` | 用户安装 | Automate Proofly tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| proxiedmail-automation | `proxiedmail-automation` | 用户安装 | Automate Proxiedmail tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| qualaroo-automation | `qualaroo-automation` | 用户安装 | Automate Qualaroo tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| rafflys-automation | `rafflys-automation` | 用户安装 | Automate Rafflys tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| ragic-automation | `ragic-automation` | 用户安装 | Automate Ragic tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| raisely-automation | `raisely-automation` | 用户安装 | Automate Raisely tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| recallai-automation | `recallai-automation` | 用户安装 | Automate Recallai tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| refiner-automation | `refiner-automation` | 用户安装 | Automate Refiner tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| repairshopr-automation | `repairshopr-automation` | 用户安装 | Automate Repairshopr tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| reply-automation | `reply-automation` | 用户安装 | Automate Reply tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| resend-automation | `resend-automation` | 用户安装 | Automate Resend tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| retailed-automation | `retailed-automation` | 用户安装 | Automate Retailed tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| retently-automation | `retently-automation` | 用户安装 | Automate Retently tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| revolt-automation | `revolt-automation` | 用户安装 | Automate Revolt tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| rkvst-automation | `rkvst-automation` | 用户安装 | Automate Rkvst tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| rocketlane-automation | `rocketlane-automation` | 用户安装 | Automate Rocketlane tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| rosette-text-analytics-automation | `rosette-text-analytics-automation` | 用户安装 | Automate Rosette Text Analytics tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| sage-automation | `sage-automation` | 用户安装 | Automate Sage tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| satismeter-automation | `satismeter-automation` | 用户安装 | Automate Satismeter tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| seismic-automation | `seismic-automation` | 用户安装 | Automate Seismic tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| sendbird-automation | `sendbird-automation` | 用户安装 | Automate Sendbird tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| sendspark-automation | `sendspark-automation` | 用户安装 | Automate Sendspark tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| servicem8-automation | `servicem8-automation` | 用户安装 | Automate Servicem8 tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| shorten-rest-automation | `shorten-rest-automation` | 用户安装 | Automate Shorten Rest tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| short-io-automation | `short-io-automation` | 用户安装 | Automate Short IO tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| sidetracker-automation | `sidetracker-automation` | 用户安装 | Automate Sidetracker tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| simla-com-automation | `simla-com-automation` | 用户安装 | Automate Simla Com tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| simple-analytics-automation | `simple-analytics-automation` | 用户安装 | Automate Simple Analytics tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| simplesat-automation | `simplesat-automation` | 用户安装 | Automate Simplesat tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| skyfire-automation | `skyfire-automation` | 用户安装 | Automate Skyfire tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| splitwise-automation | `splitwise-automation` | 用户安装 | Automate Splitwise tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| spondyr-automation | `spondyr-automation` | 用户安装 | Automate Spondyr tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| stack-exchange-automation | `stack-exchange-automation` | 用户安装 | Automate Stack Exchange tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| stannp-automation | `stannp-automation` | 用户安装 | Automate Stannp tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| starton-automation | `starton-automation` | 用户安装 | Automate Starton tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| streamtime-automation | `streamtime-automation` | 用户安装 | Automate Streamtime tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| supadata-automation | `supadata-automation` | 用户安装 | Automate Supadata tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| survey_monkey-automation | `survey_monkey-automation` | 用户安装 | Automate SurveyMonkey tasks via Rube MCP (Composio): surveys, responses, collectors, and survey analytics. Always search tools first for current schemas. |
| sympla-automation | `sympla-automation` | 用户安装 | Automate Sympla tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| taggun-automation | `taggun-automation` | 用户安装 | Automate Taggun tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| test-app-automation | `test-app-automation` | 用户安装 | Automate Test App tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| textit-automation | `textit-automation` | 用户安装 | Automate Textit tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| textrazor-automation | `textrazor-automation` | 用户安装 | Automate Textrazor tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| thanks-io-automation | `thanks-io-automation` | 用户安装 | Automate Thanks IO tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| timelink-automation | `timelink-automation` | 用户安装 | Automate Timelink tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| tinyurl-automation | `tinyurl-automation` | 用户安装 | Automate Tinyurl tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| tisane-automation | `tisane-automation` | 用户安装 | Automate Tisane tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| tpscheck-automation | `tpscheck-automation` | 用户安装 | Automate Tpscheck tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| triggercmd-automation | `triggercmd-automation` | 用户安装 | Automate Triggercmd tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| twocaptcha-automation | `twocaptcha-automation` | 用户安装 | Automate Twocaptcha tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| typless-automation | `typless-automation` | 用户安装 | Automate Typless tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| u301-automation | `u301-automation` | 用户安装 | Automate U301 tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| updown-io-automation | `updown-io-automation` | 用户安装 | Automate Updown IO tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| userlist-automation | `userlist-automation` | 用户安装 | Automate Userlist tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| venly-automation | `venly-automation` | 用户安装 | Automate Venly tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| vero-automation | `vero-automation` | 用户安装 | Automate Vero tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| wachete-automation | `wachete-automation` | 用户安装 | Automate Wachete tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| webvizio-automation | `webvizio-automation` | 用户安装 | Automate Webvizio tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| whautomate-automation | `whautomate-automation` | 用户安装 | Automate Whautomate tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| winston-ai-automation | `winston-ai-automation` | 用户安装 | Automate Winston AI tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| wit-ai-automation | `wit-ai-automation` | 用户安装 | Automate Wit AI tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| workiom-automation | `workiom-automation` | 用户安装 | Automate Workiom tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| yandex-automation | `yandex-automation` | 用户安装 | Automate Yandex tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| y-gy-automation | `y-gy-automation` | 用户安装 | Automate Y Gy tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| zenserp-automation | `zenserp-automation` | 用户安装 | Automate Zenserp tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| zeplin-automation | `zeplin-automation` | 用户安装 | Automate Zeplin tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| zoho_mail-automation | `zoho_mail-automation` | 用户安装 | Automate Zoho Mail tasks via Rube MCP (Composio): email sending, folders, labels, and mailbox management. Always search tools first for current schemas. |
| zoho-automation | `zoho-automation` | 用户安装 | Automate Zoho tasks via Rube MCP (Composio). Always search tools first for current schemas. |
| zoho-mail-automation | `zoho-mail-automation` | 用户安装 | Automate Zoho Mail tasks via Rube MCP (Composio). Always search tools first for current schemas. |
