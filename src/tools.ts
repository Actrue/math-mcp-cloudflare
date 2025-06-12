import * as math from 'mathjs';

/**
 * 解析并计算数学表达式
 * @param expression 要计算的数学表达式字符串
 * @param scope 可选的变量作用域对象
 * @returns 计算结果
 */
function evaluateMathExpression(expression: string, scope?: Record<string, any>): any {
  try {
    return math.evaluate(expression, scope);
  } catch (error) {
    console.error('Failed to evaluate expression:', error);
    throw new Error(`Invalid expression: ${expression}`);
  }
}

/**
 * 计算数学表达式（简化版）
 * @param expr 数学表达式字符串
 * @returns 计算结果
 */
function calculateExpression(expr: string): any {
  return evaluateMathExpression(expr);
}

export const tools={
    evaluateMathExpression,
    calculateExpression
}