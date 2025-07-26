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
  // 如果有作用域变量，先计算表达式
  if (Object.keys(scope).length > 0) {
    // 如果是MathNode，转换为字符串
    const exprStr = typeof expr === 'string' ? expr : expr.toString();
    return math.evaluate(exprStr, scope);
  }
  // 否则进行符号简化
  if (options) {
    return math.simplify(expr, {}, options);
  } else {
    return math.simplify(expr);
  }
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

/**
 * 求解线性方程组
 * @param coefficients 系数矩阵 A，形如 [[a11, a12, ...], [a21, a22, ...], ...]
 * @param constants 常数向量 b，形如 [b1, b2, ...]
 * @returns 解向量 x，使得 Ax = b
 */
function solveLinearSystem(coefficients: number[][], constants: number[]) {
  try {
    // 使用mathjs的lusolve函数求解线性方程组
    const A = math.matrix(coefficients);
    const b = math.matrix(constants);
    const solution = math.lusolve(A, b);
    return solution;
  } catch (error) {
    console.error('Failed to solve linear system:', error);
    throw new Error(`无法求解线性方程组: ${error}`);
  }
}

/**
 * 求解方程组（支持多种格式）
 * @param equations 方程组，可以是字符串数组或系数矩阵格式
 * @param variables 变量名数组（可选）
 * @returns 求解结果
 */
function solveEquationSystem(equations: string[] | {coefficients: number[][], constants: number[]}, variables?: string[]) {
  try {
    if (Array.isArray(equations)) {
      // 如果是字符串数组格式的方程组
      // 这里可以扩展解析字符串方程的功能
      throw new Error('字符串格式的方程组解析功能待实现');
    } else {
      // 如果是系数矩阵格式
      const { coefficients, constants } = equations;
      const solution = solveLinearSystem(coefficients, constants);
        
        // 如果提供了变量名，返回带变量名的结果
        if (variables && variables.length > 0) {
          const solutionArray = solution.toArray() as number[][];
          const result: Record<string, number> = {};
          variables.forEach((variable, index) => {
            result[variable] = solutionArray[index][0]; // 获取扁平化后的值
          });
          return result;
        }
        
        // 如果没有提供变量名，返回扁平化的数组
        return solution.toArray().flat();
    }
  } catch (error) {
    console.error('Failed to solve equation system:', error);
    throw new Error(`求解方程组失败: ${error}`);
  }
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
    rationalize,
    solveLinearSystem,
    solveEquationSystem
}