import * as math from 'mathjs';

/**
 * 统一的响应格式
 */
interface ToolResponse<T = any> {
  state: boolean;
  message: string;
  data: T | null;
}

/**
 * 创建成功响应
 * @param data 返回的数据
 * @param message 成功消息
 * @returns 格式化的响应对象
 */
function createSuccessResponse<T>(data: T, message: string = '操作成功'): ToolResponse<T> {
  return {
    state: true,
    message,
    data
  };
}

/**
 * 创建失败响应
 * @param message 错误消息
 * @returns 格式化的响应对象
 */
function createErrorResponse(message: string): ToolResponse<null> {
  return {
    state: false,
    message,
    data: null
  };
}

/**
 * 符号计算
 * @param expression 要计算的表达式字符串
 * @returns 解析后的表达式树
 */
function symbolicCompute(expression: string): ToolResponse {
  try {
    const result = math.parse(expression);
    return createSuccessResponse(result, '符号计算成功');
  } catch (error) {
    return createErrorResponse(`符号计算失败: ${error}`);
  }
}

/**
 * 表达式简化
 * @param expr 要简化的表达式字符串或表达式树
 * @param scope 可选的作用域对象
 * @param options 可选的简化选项
 * @returns 简化后的表达式
 */
function simplifyExpression(expr: string | math.MathNode, scope: Record<string, any>={}, options?: math.SimplifyOptions): ToolResponse {
  try {
    let result;
    // 如果有作用域变量，先计算表达式
    if (Object.keys(scope).length > 0) {
      // 如果是MathNode，转换为字符串
      const exprStr = typeof expr === 'string' ? expr : expr.toString();
      result = math.evaluate(exprStr, scope);
    } else {
      // 否则进行符号简化
      if (options) {
        result = math.simplify(expr, {}, options);
      } else {
        result = math.simplify(expr);
      }
    }
    return createSuccessResponse(result, '表达式简化成功');
  } catch (error) {
    return createErrorResponse(`表达式简化失败: ${error}`);
  }
}

/**
 * 求导数
 * @param expr 要求导的表达式字符串或表达式树
 * @param variable 求导变量
 * @returns 导数表达式
 */
function derivative(expr: string | math.MathNode, variable: string | math.MathNode): ToolResponse {
  try {
    const result = math.derivative(expr, variable);
    return createSuccessResponse(result, '求导计算成功');
  } catch (error) {
    return createErrorResponse(`求导计算失败: ${error}`);
  }
}

/**
 * 有理化
 * @param expr 要有理化的表达式字符串或表达式树
 * @returns 有理化后的表达式
 */
function rationalize(expr: string | math.MathNode): ToolResponse {
  try {
    const result = math.rationalize(expr);
    return createSuccessResponse(result, '有理化计算成功');
  } catch (error) {
    return createErrorResponse(`有理化计算失败: ${error}`);
  }
}

/**
 * 解析并计算数学表达式
 * @param expression 要计算的数学表达式字符串
 * @param scope 可选的变量作用域对象
 * @returns 计算结果
 */
function evaluateMathExpression(expression: string, scope: Record<string, any>={}): ToolResponse {
  try {
    const result = math.evaluate(expression, scope);
    return createSuccessResponse(result, '数学表达式计算成功');
  } catch (error) {
    return createErrorResponse(`数学表达式计算失败: ${error}`);
  }
}

/**
 * 计算数学表达式（简化版）
 * @param expr 数学表达式字符串
 * @returns 计算结果
 */
function calculateExpression(expr: string): ToolResponse {
  return evaluateMathExpression(expr);
}

/**
 * 创建矩阵
 * @param data 矩阵数据，可以是数组或嵌套数组
 * @returns 创建的矩阵
 */
function createMatrix(data: any[]): ToolResponse<math.Matrix> {
  try {
    const result = math.matrix(data);
    return createSuccessResponse(result, '矩阵创建成功');
  } catch (error) {
    return {
      state: false,
      message: `矩阵创建失败: ${error}`,
      data: math.matrix([]) as math.Matrix
    };
  }
}

/**
 * 矩阵加法
 * @param a 第一个矩阵
 * @param b 第二个矩阵
 * @returns 相加后的矩阵
 */
function matrixAdd(a: math.Matrix | any[], b: math.Matrix | any[]): ToolResponse {
  try {
    const result = math.add(a, b);
    return createSuccessResponse(result, '矩阵加法计算成功');
  } catch (error) {
    return createErrorResponse(`矩阵加法计算失败: ${error}`);
  }
}

/**
 * 矩阵乘法
 * @param a 第一个矩阵
 * @param b 第二个矩阵
 * @returns 相乘后的矩阵
 */
function matrixMultiply(a: math.Matrix | any[], b: math.Matrix | any[]): ToolResponse {
  try {
    const result = math.multiply(a, b);
    return createSuccessResponse(result, '矩阵乘法计算成功');
  } catch (error) {
    return createErrorResponse(`矩阵乘法计算失败: ${error}`);
  }
}

/**
 * 求解线性方程组
 * @param coefficients 系数矩阵 A，形如 [[a11, a12, ...], [a21, a22, ...], ...]
 * @param constants 常数向量 b，形如 [b1, b2, ...]
 * @param variables 变量名数组（可选），如 ['x', 'y', 'z']
 * @returns 解向量 x，使得 Ax = b。如果提供变量名则返回对象格式，否则返回数组格式
 */
function solveLinearSystem(coefficients: number[][], constants: number[], variables?: string[]): ToolResponse {
  try {
    // 使用mathjs的lusolve函数求解线性方程组
    const A = math.matrix(coefficients);
    const b = math.matrix(constants);
    const solution = math.lusolve(A, b);
    
    // 将解转换为数组格式并处理精度
    const solutionArray = solution.toArray() as number[][];
    const flatSolution = solutionArray.map(row => {
      const value = Array.isArray(row) ? row[0] : row;
      // 处理浮点数精度问题，保留合理的小数位数
      return Math.abs(value - Math.round(value)) < 1e-10 ? Math.round(value) : Number(value.toFixed(10));
    });
    
    // 如果提供了变量名，返回对象格式
    if (variables && variables.length > 0) {
      const result: Record<string, number> = {};
      variables.forEach((variable, index) => {
        if (index < flatSolution.length) {
          result[variable] = flatSolution[index];
        }
      });
      return createSuccessResponse(result, '线性方程组求解成功');
    }
    
    // 否则返回数组格式
    return createSuccessResponse(flatSolution, '线性方程组求解成功');
  } catch (error) {
    return createErrorResponse(`线性方程组求解失败: ${error}`);
  }
}

/**
 * 求解方程组（支持多种格式）
 * @param equations 方程组，可以是字符串数组或系数矩阵格式
 * @param variables 变量名数组（可选）
 * @returns 求解结果
 */
function solveEquationSystem(equations: string[] | {coefficients: number[][], constants: number[]}, variables?: string[]): ToolResponse {
  try {
    if (Array.isArray(equations)) {
      // 如果是字符串数组格式的方程组
      // 这里可以扩展解析字符串方程的功能
      return createErrorResponse('字符串格式的方程组解析功能待实现');
    } else {
      // 如果是系数矩阵格式
      const { coefficients, constants } = equations;
      // 直接使用更新后的solveLinearSystem函数，它已经处理了变量名和格式
      return solveLinearSystem(coefficients, constants, variables);
    }
  } catch (error) {
    return createErrorResponse(`方程组求解失败: ${error}`);
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