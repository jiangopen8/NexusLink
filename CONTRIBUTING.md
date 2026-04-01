# 贡献指南

感谢你有兴趣为 NexusLink 做贡献！🎉

## 如何贡献

### 1. 报告 Bug

如果你发现了 bug，请创建 GitHub Issue：

1. 使用 [GitHub Issues](https://github.com/jiangopen8/NexusLink/issues) 报告
2. 包含以下信息：
   - 清晰的标题
   - 详细的描述
   - 复现步骤
   - 预期行为 vs 实际行为
   - 环境信息 (OS, Node.js 版本等)

### 2. 建议新功能

如果你有新功能建议：

1. 在 [GitHub Discussions](https://github.com/jiangopen8/NexusLink/discussions) 讨论
2. 或创建 Feature Request Issue
3. 清晰描述：
   - 解决什么问题
   - 期望的行为
   - 可能的实现方案

### 3. 提交代码

#### 前置准备

```bash
# Fork 仓库
git clone https://github.com/YOUR_USERNAME/NexusLink.git
cd NexusLink

# 创建特性分支
git checkout -b feature/amazing-feature

# 安装依赖
pnpm install
```

#### 开发流程

1. **编写代码**
   - 遵循 TypeScript 严格模式
   - 遵循现有代码风格
   - 添加必要的注释

2. **编写测试**
   ```bash
   # 测试优先！新功能必须有测试
   pnpm test
   ```

3. **本地测试**
   ```bash
   # 运行所有测试
   pnpm test

   # 特定包
   pnpm --filter @nexuslink/core-governance test

   # 监听模式
   pnpm test --watch
   ```

4. **提交更改**
   ```bash
   # 遵循 Conventional Commits
   git commit -m "feat: add amazing feature"
   git commit -m "fix: resolve issue with X"
   git commit -m "docs: update README"
   git commit -m "test: add tests for feature X"
   ```

5. **推送并创建 PR**
   ```bash
   git push origin feature/amazing-feature
   ```
   - 创建 Pull Request
   - 填写 PR 模板
   - 等待 Code Review

---

## 开发规范

### 代码风格

```typescript
// ✅ Good
export class MyModule {
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  getValue(): string {
    return this.value;
  }
}

// ❌ Bad
export class mymodule {
  value;
  constructor(v) {
    this.value = v;
  }
  getvalue() {
    return this.value;
  }
}
```

### 测试规范

```typescript
// ✅ Good
describe('MyModule', () => {
  it('should return value when called', () => {
    const module = new MyModule('test');
    expect(module.getValue()).toBe('test');
  });

  it('should throw error for invalid input', () => {
    expect(() => new MyModule('')).toThrow();
  });
});

// ❌ Bad
describe('test', () => {
  it('test', () => {
    const m = new MyModule('test');
    expect(m.getValue()).toBe('test');
  });
});
```

### 提交信息规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/)：

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type**:
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `test`: 测试添加或修改
- `refactor`: 代码重构
- `perf`: 性能优化
- `chore`: 构建、依赖等

**例子**:
```bash
git commit -m "feat(core-governance): add DAO voting mechanism"
git commit -m "fix(core-settlement): prevent double spending in nanopayments"
git commit -m "docs(readme): update quick start guide"
```

---

## PR 流程

### 创建 PR 前

- [ ] 代码遵循项目规范
- [ ] 所有测试通过 (`pnpm test`)
- [ ] 新功能有相应测试
- [ ] 文档已更新
- [ ] 提交信息清晰

### PR 模板

```markdown
## 描述

简要说明你做了什么

## 相关 Issue

关闭 #123

## 变更类型

- [ ] Bug 修复
- [ ] 新功能
- [ ] 不兼容的变更
- [ ] 文档更新

## 测试

描述你如何测试这些变更

## 检查清单

- [ ] 我的代码遵循项目的代码风格
- [ ] 我已经进行了自我审查
- [ ] 我已经添加了必要的文档
- [ ] 我的变更不生成新警告
- [ ] 我已添加测试来证明我的修复/功能有效
- [ ] 新的和现有的单元测试通过了我的更改
```

---

## 开发任务

### 当前优先级

1. **Bug 修复** 🐛
   - 高优先级，立即处理
   - 创建 Issue，标记为 `bug`

2. **文档改进** 📖
   - 修复文档错误
   - 添加示例和说明

3. **测试覆盖** 🧪
   - 为现有功能添加测试
   - 提高覆盖率

4. **新功能** ✨
   - 符合 Roadmap 的新功能
   - 讨论后才开发

### 不接受的贡献

- ❌ 未经讨论的大规模重构
- ❌ 添加新的外部依赖（除非必要）
- ❌ 破坏向后兼容性
- ❌ 未通过测试的代码

---

## 开发环境

### 系统要求

- Node.js >= 18.0
- pnpm >= 8.0
- Git >= 2.30

### 安装开发工具

```bash
# 安装 Node.js (使用 nvm)
nvm install 18

# 安装 pnpm
npm install -g pnpm

# 安装项目依赖
pnpm install

# 验证环境
pnpm run test
```

### IDE 设置

**推荐**: VS Code

**扩展**:
- ESLint
- Prettier
- TypeScript Vue Plugin

**设置** (`.vscode/settings.json`):
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

---

## 常见问题

### 如何运行特定的测试？

```bash
pnpm --filter @nexuslink/core-governance test
pnpm test -- --grep "should vote on proposal"
```

### 如何调试代码？

```bash
# 在 VS Code 中添加 launch.json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Test",
  "runtimeExecutable": "pnpm",
  "runtimeArgs": ["test"],
  "console": "integratedTerminal"
}
```

### 如何构���项目？

```bash
# 构建所有包
pnpm build

# 特定包
pnpm --filter @nexuslink/core-governance build
```

### 如何清理构建？

```bash
# 删除所有 dist 目录
pnpm clean
```

---

## Code Review

### 代码审查标准

我们关注以下方面：

1. **功能性** ✅
   - 代码是否实现了预期功能
   - 是否有 Edge Case 处理

2. **代码质量** 📊
   - 遵循约定
   - 易于理解
   - 复用性好

3. **测试覆盖** 🧪
   - 功能是否有测试
   - 覆盖率是否足够

4. **文档** 📖
   - 是否有适当的注释
   - 是否更新了相关文档

5. **性能** ⚡
   - 是否有性能问题
   - 是否有优化空间

### 如何应对反馈

1. 了解反馈的原因
2. 讨论不同意见
3. 根据反馈进行改进
4. 更新 PR

---

## 获得帮助

### 文档

- 📖 [README.md](./README.md) — 项目概览
- 📘 [PHASE2_GUIDE.md](./PHASE2_GUIDE.md) — 功能指南
- 📗 [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) — 技术细节

### 沟通渠道

- **GitHub Issues**: 问题和 Bug
- **GitHub Discussions**: 想法和讨论
- **Code Comments**: 在 PR 中讨论

### 获得支持

- 查看现有 Issues 和讨论
- 搜索相关文档
- 创建新 Issue（如果未找到答案）

---

## 许可证

通过贡献，你同意你的贡献将在 MIT 许可证下发布。

---

## 致谢

感谢所有为 NexusLink 做出贡献的人！🙏

---

**Happy Contributing! 🚀**
