
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { tools } from './tools';
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({
	name: "数学运算工具",
	version: "1.0.0",
});



// Math expression evaluation tool
server.tool(
	"evaluateMath",
	"此工具用于解析并计算数学表达式\n\n支持的表达式格式:\n- 基本运算: +, -, *, /, ^(幂)\n- 括号: ( )\n- 常用函数: sin, cos, tan, sqrt, log\n- 常量: pi, e\n- 变量: 支持字母变量(a-z)\n\n示例:\n- 2*(3+4)\n- sin(pi/2)\n- sqrt(x^2 + y^2)",
	{ expression: z.string() },
	async ({ expression }) => ({
		content: [{ type: "text", text: String(tools.evaluateMathExpression(expression)) }],
	})
);

// Simple calculation tool
server.tool(
	"calculateSimple",
	"此工具用于计算简单数学表达式\n\n输入参数:\n- expr: 数学表达式字符串\n\n示例:\n{\n  \"expr\": \"2+3*4\"\n}",
	{ expr: z.string() },
	async ({ expr }) => ({
		content: [{ type: "text", text: String(tools.calculateExpression(expr)) }],
	})
);




// Expression simplification tool
/* 功能暂时有bug
this.server.tool(
	"simplifyExpression",
	"此工具用于简化数学表达式\n\n输入参数:\n- expr: 要简化的表达式字符串\n- scope: 可选的作用域对象(变量值)\n\n示例:\n{\n  \"expr\": \"2*x + 3*x\",\n  \"scope\": {\"x\": 2}\n}",
	{ 
		expr: z.string(), 
		scope: z.record(z.any()).optional().default({}) 
	},
	async ({ expr, scope }) => {
		try {
			const node = tools.symbolicCompute(expr);
			const result = tools.simplifyExpression(node, scope);
			return { content: [{ type: "text", text: result.toString() }] };
		} catch (error) {
			return { content: [{ type: "text", text: `Error: ${error}` }] };
		}
	}
);
*/

// Calculator tool with multiple operations
server.tool(
	"calculateAdvanced",
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
		return { content: [{ type: "text", text: String(result) }] }
	}
);

// Matrix creation tool
server.tool(
	"createMatrix",
	"此工具用于创建矩阵\n\n运算目标: 将输入的数组数据转换为数学矩阵结构，便于后续矩阵运算\n\n输入参数:\n- data: 矩阵数据，可以是数组或嵌套数组\n\n示例:\n{\n  \"data\": [[1,2],[3,4]]\n}",
	{ data: z.array(z.any()) },
	async ({ data }) => ({
		content: [{ type: "text", text: JSON.stringify(tools.createMatrix(data)) }],
	})
);

// Matrix addition tool
server.tool(
	"matrixAdd",
	"此工具用于矩阵加法运算\n\n运算目标: 对两个相同维度的矩阵执行逐元素相加运算\n\n输入参数:\n- a: 第一个矩阵\n- b: 第二个矩阵\n\n示例:\n{\n  \"a\": [[1,2],[3,4]],\n  \"b\": [[5,6],[7,8]]\n}",
	{
		a: z.array(z.any()),
		b: z.array(z.any())
	},
	async ({ a, b }) => ({
		content: [{ type: "text", text: JSON.stringify(tools.matrixAdd(a, b)) }],
	})
);

// Matrix multiplication tool
server.tool(
	"matrixMultiply",
	"此工具用于矩阵乘法运算\n\n运算目标: 执行矩阵乘法运算，要求第一个矩阵的列数等于第二个矩阵的行数\n\n输入参数:\n- a: 第一个矩阵\n- b: 第二个矩阵\n\n示例:\n{\n  \"a\": [[1,2],[3,4]],\n  \"b\": [[5,6],[7,8]]\n}",
	{
		a: z.array(z.any()),
		b: z.array(z.any())
	},
	async ({ a, b }) => ({
		content: [{ type: "text", text: JSON.stringify(tools.matrixMultiply(a, b)) }],
	})
);

// Symbolic computation tool
server.tool(
	"symbolicCompute",
	"此工具用于符号计算\n\n运算目标: 将数学表达式解析为符号表达式树\n\n输入参数:\n- expression: 数学表达式字符串\n\n示例:\n{\n  \"expression\": \"2x + 3y\"\n}",
	{ expression: z.string() },
	async ({ expression }) => {
		try {
			const result = tools.symbolicCompute(expression);
			return { content: [{ type: "text", text: result.toString() }] };
		} catch (error) {
			return { content: [{ type: "text", text: `Error: ${error}` }] };
		}
	}
);



// Derivative computation tool
server.tool(
	"derivative",
	"此工具用于求导数\n\n运算目标: 计算表达式的导数\n\n输入参数:\n- expr: 要求导的表达式字符串\n- variable: 求导变量\n\n示例:\n{\n  \"expr\": \"x^2 + 3x\",\n  \"variable\": \"x\"\n}",
	{
		expr: z.string(),
		variable: z.string()
	},
	async ({ expr, variable }) => {
		try {
			const result = tools.derivative(expr, variable);
			return { content: [{ type: "text", text: result.toString() }] };
		} catch (error) {
			return { content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }] };
		}
	}
);

// Rationalization tool
server.tool(
	"rationalize",
	"此工具用于表达式有理化\n\n运算目标: 将表达式有理化为分数形式\n\n输入参数:\n- expr: 要有理化的表达式字符串\n\n示例:\n{\n  \"expr\": \"1/(x+1) + 1/(x-1)\"\n}",
	{ expr: z.string() },
	async ({ expr }) => {
		try {
			const result = tools.rationalize(expr);
			return { content: [{ type: "text", text: result.toString() }] };
		} catch (error) {
			return { content: [{ type: "text", text: `Error: ${error}` }] };
		}
	}
);


	const transport = new StdioServerTransport();
	await server.connect(transport);

