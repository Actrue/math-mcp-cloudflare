# 数学运算工具 - Cloudflare Worker MCP 服务

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/your-repo/math-mcp-cloudflare)

一个基于 **MCP (Model Context Protocol)** 协议的数学运算工具，专为大模型提供强大的数学计算能力。本项目部署在 Cloudflare Worker 上，提供高性能、低延迟的数学运算服务。

## 🚀 项目特色

- **🤖 AI 友好**: 基于 MCP 协议，专为大模型设计的数学运算工具
- **⚡ 高性能**: 部署在 Cloudflare Worker 边缘网络，全球低延迟访问
- **🔧 功能丰富**: 支持基础运算、矩阵计算、符号运算、方程求解等
- **📦 零依赖**: 无需额外配置，一键部署即可使用
- **🔒 类型安全**: 完整的 TypeScript 支持和类型定义

## 🎯 核心功能

### 基础数学运算
- ✅ 四则运算（加减乘除）
- ✅ 幂运算和开方
- ✅ 三角函数（sin/cos/tan）
- ✅ 对数和指数函数
- ✅ 数学常量（π、e）

### 高级数学功能
- ✅ 矩阵运算（创建、加法、乘法）
- ✅ 符号计算和表达式解析
- ✅ 求导数计算
- ✅ 表达式简化和有理化
- ✅ 线性方程组求解

### MCP 工具列表

| 工具名称 | 功能描述 | 示例 |
|---------|----------|------|
| `evaluateMath` | 解析并计算数学表达式 | `sin(pi/2) + cos(0)` |
| `calculateSimple` | 简单数学表达式计算 | `2+3*4` |
| `calculateAdvanced` | 高级四则运算 | 支持加减乘除操作 |
| `createMatrix` | 创建矩阵 | `[[1,2],[3,4]]` |
| `matrixAdd` | 矩阵加法 | 两个矩阵相加 |
| `matrixMultiply` | 矩阵乘法 | 两个矩阵相乘 |
| `symbolicCompute` | 符号计算 | 表达式解析为符号树 |
| `derivative` | 求导数 | `d/dx(x^2)` |
| `rationalize` | 表达式有理化 | 分式化简 |
| `solveLinearSystem` | 线性方程组求解 | Ax=b 形式求解 |

## 🌐 在线体验

- **SSE 接口**: https://math.sereniblue.com/sse
- **MCP 接口**: https://math.sereniblue.com/mcp

## 📖 使用示例

### 基础数学运算
```json
{
  "tool": "evaluateMath",
  "arguments": {
    "expression": "sin(pi/2) + sqrt(16)"
  }
}
// 返回: 5
```

### 矩阵运算
```json
{
  "tool": "matrixMultiply",
  "arguments": {
    "a": [[1, 2], [3, 4]],
    "b": [[5, 6], [7, 8]]
  }
}
// 返回: [[19, 22], [43, 50]]
```

### 求导计算
```json
{
  "tool": "derivative",
  "arguments": {
    "expr": "x^2 + 3*x + 2",
    "variable": "x"
  }
}
// 返回: 2*x + 3
```

### 线性方程组求解
```json
{
  "tool": "solveLinearSystem",
  "arguments": {
    "coefficients": [[2, 1], [1, 3]],
    "constants": [4, 7]
  }
}
// 求解: 2x + y = 4, x + 3y = 7
// 返回: [1, 2]
```

## 🛠️ 快速部署

### 前置要求
- Node.js 18+
- Cloudflare 账户
- Wrangler CLI

### 部署步骤

1. **克隆项目**
```bash
git clone <your-repo-url>
cd math-mcp-cloudflare
```

2. **安装依赖**
```bash
pnpm install
```

3. **配置域名**
编辑 `wrangler.jsonc` 文件，修改自定义域名：
```json
{
  "routes": [{
    "pattern": "your-domain.com",
    "custom_domain": true
  }]
}
```

4. **部署到 Cloudflare**
```bash
pnpm run deploy
```

### 本地开发
```bash
# 启动开发服务器
pnpm run dev

# 运行测试
pnpm run test

# 类型检查
pnpm run type-check

# 代码格式化
pnpm run format
```

## 🏗️ 技术架构

### 核心技术栈
- **运行环境**: Cloudflare Workers
- **开发语言**: TypeScript
- **Web 框架**: Hono
- **MCP 协议**: @modelcontextprotocol/sdk
- **数学库**: mathjs
- **构建工具**: Wrangler
- **测试框架**: Vitest
- **代码质量**: Biome

### 项目结构
```
math-mcp-cloudflare/
├── src/
│   ├── index.ts          # 应用入口，路由配置
│   ├── mcp.ts            # MCP 服务实现
│   ├── tools.ts          # 数学运算工具函数
│   └── stdio.ts          # 标准输入输出处理
├── tests/
│   └── 数学运算工具.test.ts # 测试用例
├── .trae/
│   └── documents/
│       └── 数学运算工具产品文档.md # 产品文档
├── wrangler.jsonc        # Cloudflare Worker 配置
├── package.json          # 项目依赖和脚本
└── README.md            # 项目说明文档
```

### 响应格式
所有工具函数都返回统一的响应格式：
```typescript
interface ToolResponse<T = any> {
  state: boolean;    // 执行状态：true=成功，false=失败
  message: string;   // 状态消息
  data: T | null;    // 返回数据，失败时为null
}
```

## 📚 API 文档

### 接口端点
- **SSE 接口**: `https://your-domain.com/sse`
- **MCP 接口**: `https://your-domain.com/mcp`

### 工具调用格式
```json
{
  "method": "tools/call",
  "params": {
    "name": "工具名称",
    "arguments": {
      "参数名": "参数值"
    }
  }
}
```

### 错误处理
当工具调用失败时，返回格式如下：
```json
{
  "state": false,
  "message": "错误描述信息",
  "data": null
}
```

## 🧪 测试

项目包含完整的测试用例，覆盖所有数学运算功能：

```bash
# 运行所有测试
pnpm run test

# 运行测试并生成覆盖率报告
pnpm run test:run
```

### 测试覆盖范围
- ✅ 基础数学表达式计算
- ✅ 三角函数和高级数学函数
- ✅ 矩阵运算（创建、加法、乘法）
- ✅ 符号计算和表达式简化
- ✅ 求导数计算
- ✅ 表达式有理化
- ✅ 线性方程组求解
- ✅ 错误处理机制

## 🔧 配置说明

### Wrangler 配置
`wrangler.jsonc` 文件包含 Cloudflare Worker 的部署配置：

```json
{
  "name": "math-mcp-cloudflare",
  "main": "src/index.ts",
  "compatibility_date": "2025-03-10",
  "compatibility_flags": ["nodejs_compat"],
  "routes": [{
    "pattern": "your-domain.com",
    "custom_domain": true
  }]
}
```

### 环境变量
项目无需额外的环境变量配置，开箱即用。

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/新功能`)
3. 提交更改 (`git commit -am '添加新功能'`)
4. 推送到分支 (`git push origin feature/新功能`)
5. 创建 Pull Request

### 代码规范
- 使用 TypeScript 进行开发
- 遵循 Biome 代码格式规范
- 为新功能添加相应的测试用例
- 更新相关文档

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙋‍♂️ 常见问题

### Q: 如何添加新的数学运算功能？
A: 在 `src/tools.ts` 中添加新的工具函数，然后在 `src/mcp.ts` 中注册对应的 MCP 工具。

### Q: 支持哪些数学函数？
A: 支持 mathjs 库提供的所有数学函数，包括基础运算、三角函数、对数、矩阵运算等。

### Q: 如何处理复杂的数学表达式？
A: 使用 `evaluateMath` 工具，支持复杂的数学表达式解析和计算。

### Q: 是否支持自定义变量？
A: 是的，`evaluateMathExpression` 函数支持传入变量作用域对象。

## 📞 联系方式

如有问题或建议，请通过以下方式联系：
- 提交 Issue
- 发起 Pull Request
- 邮箱联系（如果有的话）

---

⭐ 如果这个项目对你有帮助，请给个 Star 支持一下！