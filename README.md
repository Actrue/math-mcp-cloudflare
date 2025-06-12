# 数学运算工具-cloudflare版本

一个运行在Cloudflare Worker上的数学运算工具集，提供以下功能：

- 基础数学运算（加减乘除、幂运算）
- 三角函数计算（sin/cos/tan）
- 矩阵运算（创建矩阵、矩阵加减乘）
- 符号计算（表达式解析、求导）
- 表达式有理化

## 体验地址

- SSE体验地址: https://math.sereniblue.com/sse
- streamableHttp体验地址: https://math.sereniblue.com/mcp

## 功能说明

1. **基础运算**：支持加减乘除、幂运算、括号表达式
2. **高级计算**：支持三角函数、对数、平方根等
3. **矩阵运算**：支持矩阵创建、加法、乘法
4. **符号计算**：支持表达式解析、求导、有理化

## 部署说明

无多余依赖，把wrangler中的域名改为自己的就可以直接wrangler deploy进行部署。