# NexusLink 当前上下文快照（2026-05-06）

## 当前目标

为 NexusLink 项目构建一个内测用 WebApp 页面，放在 `webapp/` 目录下，能够体现当前项目的所有功能和特点，并完成构建与测试。

## 已完成交付

- 新增 `webapp/` 独立 Vite + TypeScript 应用。
- `pnpm-workspace.yaml` 已加入 `webapp`，WebApp 已纳入 workspace/turbo 门禁。
- WebApp 第一屏为内测控制台，不是营销页，打开即可查看系统能力、模拟链路、质量门禁和风险项。
- 已生成构建产物到 `webapp/dist/`。
- 当前内测服务已启动在 `http://127.0.0.1:5174/`。

## 关键文件

- `webapp/package.json`：WebApp 包脚本，包含 `dev`、`build`、`test`、`lint`。
- `webapp/index.html`：Vite HTML 入口。
- `webapp/src/main.ts`：页面渲染和交互入口。
- `webapp/src/data.ts`：内测控制台展示数据。
- `webapp/src/model.ts`：能力搜索、排序、统计等纯逻辑。
- `webapp/src/styles.css`：控制台样式。
- `webapp/src/model.test.ts`：模型与能力覆盖测试。
- `webapp/src/app-contract.test.ts`：页面入口和交付契约测试。
- `pnpm-workspace.yaml`：新增 `webapp` workspace。
- `pnpm-lock.yaml`：执行 `pnpm install` 后更新。

## WebApp 覆盖的功能面

当前 `webapp/src/data.ts` 明确展示 12 个能力模块：

1. DID 身份与意图边界
2. 加密记忆
3. SAL 存储抽象层
4. 配置与运行时基线
5. NSS 技能注册与发现
6. ACP 通信与契约编排
7. PoSE、VC、Space 与 DAO
8. 价值结算与 Nanopayment
9. 开发者 CLI 工具层
10. Agent Skills 与多平台适配
11. 技能市场与调用反馈
12. 链上合约注册表

端到端模拟链路包含 8 步：

1. 注册 Alice/Bob Agent DID
2. 发布并发现市场研究技能
3. 记录协作记忆
4. 加载本地运行配置
5. ACP 消息与契约执行
6. 签发 VC 并进入治理空间
7. USDC、e-CNY 与 Nanopayment 结算
8. 通过平台 Adapter 调用 Skill

## 已执行验证

WebApp 单包验证：

```bash
npx --yes pnpm@10.30.2 --filter @nexuslink/webapp build
npx --yes pnpm@10.30.2 --filter @nexuslink/webapp test
npx --yes pnpm@10.30.2 --filter @nexuslink/webapp lint
```

结果：

- `build` 通过，生成 `webapp/dist/index.html`、CSS 和 JS assets。
- `test` 通过：2 个 test files，7 个 tests passed。
- `lint` 通过：`tsc --noEmit` 无错误。

全仓验证：

```bash
npx --yes pnpm@10.30.2 exec turbo run build --force
npx --yes pnpm@10.30.2 exec turbo run lint --force
npx --yes pnpm@10.30.2 exec turbo run test --force
git diff --check -- webapp pnpm-workspace.yaml pnpm-lock.yaml
```

结果：

- `turbo run build --force`：13/13 successful。
- `turbo run lint --force`：22/22 successful。
- `turbo run test --force`：26/26 successful。
- `git diff --check -- webapp pnpm-workspace.yaml pnpm-lock.yaml`：无空白错误。

服务验证：

- `http://127.0.0.1:5174/` 返回 HTTP 200。
- 端口 `5174` 当前监听进程为 Vite dev server。

## 已知注意项

- 当前 Node 是 `v25.9.0`，项目 `package.json` 要求 `>=20 <23`。
- Hardhat 在 Node 25 下会持续提示不受支持，但本轮 build/lint/test 均通过。
- 仓库已有大量与本轮无关的新增或修改文件，未做回退。
- `webapp/dist/`、`webapp/node_modules/`、`webapp/.turbo/` 按当前 `.gitignore` 不进入版本跟踪。
- 之前启动 Vite 时产生过 `.vite-dev.*.log`，已清理，当前 `git status -- webapp` 未显示这些日志。

## 后续建议

- 正式内测建议切换 Node 20 或 Node 22。
- 可继续把 WebApp 从静态展示升级为调用本地 CLI/API 的交互式演示台。
- 如果要部署给多人内测，可以增加 `preview` 脚本或静态托管 `webapp/dist/`。
