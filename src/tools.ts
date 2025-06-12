import * as math from 'mathjs';

/**
 * 符号计算
 * @param expression 要计算的表达式字符串
 * @returns 解析后的表达式树
 */
function symbolicCompute(expression: string) {
  return math.parse(expression);
}

/**
 * 表达式简化
 * @param expr 要简化的表达式字符串或表达式树
 * @param scope 可选的作用域对象
 * @param options 可选的简化选项
 * @returns 简化后的表达式
 */
function simplifyExpression(expr: string | math.MathNode, scope: Record<string, any>={}, options?: math.SimplifyOptions) {
  return math.simplify(expr, scope, options);
}

/**
 * 求导数
 * @param expr 要求导的表达式字符串或表达式树
 * @param variable 求导变量
 * @returns 导数表达式
 */
function derivative(expr: string | math.MathNode, variable: string | math.MathNode) {
  return math.derivative(expr, variable);
}

/**
 * 有理化
 * @param expr 要有理化的表达式字符串或表达式树
 * @returns 有理化后的表达式
 */
function rationalize(expr: string | math.MathNode) {
  return math.rationalize(expr);
}

/**
 * 解析并计算数学表达式
 * @param expression 要计算的数学表达式字符串
 * @param scope 可选的变量作用域对象
 * @returns 计算结果
 */
function evaluateMathExpression(expression: string, scope: Record<string, any>={}) {
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

/**
 * 创建矩阵
 * @param data 矩阵数据，可以是数组或嵌套数组
 * @returns 创建的矩阵
 */
function createMatrix(data: any[]): math.Matrix {
  return math.matrix(data);
}

/**
 * 矩阵加法
 * @param a 第一个矩阵
 * @param b 第二个矩阵
 * @returns 相加后的矩阵
 */
function matrixAdd(a: math.Matrix | any[], b: math.Matrix | any[]) {
  return math.add(a, b);
}

/**
 * 矩阵乘法
 * @param a 第一个矩阵
 * @param b 第二个矩阵
 * @returns 相乘后的矩阵
 */
function matrixMultiply(a: math.Matrix | any[], b: math.Matrix | any[]) {
  return math.multiply(a, b);
}

export const tools={
    evaluateMathExpression,
    calculateExpression,
    createMatrix,
    matrixAdd,
    matrixMultiply,
    symbolicCompute,
    simplifyExpression,
    derivative,
    rationalize
}