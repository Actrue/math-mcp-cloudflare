import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { tools } from './tools';
export class MyMCP extends McpAgent {
	server = new McpServer({
		name: "Authless Calculator",
		version: "1.0.0",
	});

	async init() {

		// Math expression evaluation tool
		this.server.tool(
			"evaluateMath",
            "此工具用于解析并计算数学表达式\n\n支持的表达式格式:\n- 基本运算: +, -, *, /, ^(幂)\n- 括号: ( )\n- 常用函数: sin, cos, tan, sqrt, log\n- 常量: pi, e\n- 变量: 支持字母变量(a-z)\n\n示例:\n- 2*(3+4)\n- sin(pi/2)\n- sqrt(x^2 + y^2)",
			{ expression: z.string() },
			async ({ expression }) => ({
				content: [{ type: "text", text: String(tools.evaluateMathExpression(expression)) }],
			})
		);

		// Simple calculation tool
		this.server.tool(
			"calculate",
			"此工具用于计算简单数学表达式\n\n输入参数:\n- expr: 数学表达式字符串\n\n示例:\n{\n  \"expr\": \"2+3*4\"\n}",
			{ expr: z.string() },
			async ({ expr }) => ({
				content: [{ type: "text", text: String(tools.calculateExpression(expr)) }],
			})
		);

		// Calculator tool with multiple operations
		this.server.tool(
			"calculate",
			"此工具支持多种数学运算\n\n输入参数:\n- operation: 运算类型(add/subtract/multiply/divide)\n- a: 第一个数字\n- b: 第二个数字\n\n示例:\n{\n  \"operation\": \"multiply\",\n  \"a\": 5,\n  \"b\": 4\n}",
			{
				operation: z.enum(["add", "subtract", "multiply", "divide"]),
				a: z.number(),
				b: z.number(),
			},
			async ({ operation, a, b }) => {
				let result: number;
				switch (operation) {
					case "add":
						result = a + b;
						break;
					case "subtract":
						result = a - b;
						break;
					case "multiply":
						result = a * b;
						break;
					case "divide":
						if (b === 0)
							return {
								content: [
									{
										type: "text",
										text: "Error: Cannot divide by zero",
									},
								],
							};
						result = a / b;
						break;
				}
				return { content: [{ type: "text", text: String(result) }] };
			}
		);
	}
}