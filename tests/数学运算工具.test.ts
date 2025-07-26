import { expect, test } from 'vitest';
import { tools } from '../src/tools';

// 测试符号计算功能
test('符号计算', () => {
  const result = tools.symbolicCompute('x + y');
  expect(result.state).toBe(true);
  expect(result.data.toString()).toBe('x + y');
});

// 测试表达式简化功能
test('表达式简化', () => {
  const result = tools.simplifyExpression('x + x + 2');
  expect(result.state).toBe(true);
  expect(result.data.toString()).toBe('2 * (x + 1)');
});

// 测试求导功能
test('求导数', () => {
  const result = tools.derivative('x^2', 'x');
  expect(result.state).toBe(true);
  expect(result.data.toString()).toBe('2 * x');
});

// 测试有理化功能
test('有理化', () => {
  const result = tools.rationalize('1/(x+1) + 1/(x+2)');
  expect(result.state).toBe(true);
  expect(result.data.toString()).toContain('(2 * x + 3)');
});

// 测试数学表达式计算功能
test('数学表达式计算', () => {
  const result = tools.evaluateMathExpression('2 + 3 * 4');
  expect(result.state).toBe(true);
  expect(result.data).toBe(14);
});

// 测试矩阵创建功能
test('矩阵创建', () => {
  const result = tools.createMatrix([[1, 2], [3, 4]]);
  expect(result.state).toBe(true);
  expect(result.data?.size()).toEqual([2, 2]);
});

// 测试矩阵加法功能
test('矩阵加法', () => {
  const result = tools.matrixAdd([[1, 2], [3, 4]], [[5, 6], [7, 8]]);
  expect(result.state).toBe(true);
  expect(result.data).toEqual([[6, 8], [10, 12]]);
});

// 测试矩阵乘法功能
test('矩阵乘法', () => {
  const result = tools.matrixMultiply([[1, 2], [3, 4]], [[5, 6], [7, 8]]);
  expect(result.state).toBe(true);
  expect(result.data).toEqual([[19, 22], [43, 50]]);
});

// 测试线性方程组求解功能
test('线性方程组求解', () => {
  const result = tools.solveLinearSystem([[2, 1], [1, 1]], [3, 2], ['x', 'y']);
  expect(result.state).toBe(true);
  expect(result.data).toEqual({ x: 1, y: 1 });
});

// 测试方程组求解功能
test('方程组求解', () => {
  const result = tools.solveEquationSystem({
    coefficients: [[2, 1], [1, 1]],
    constants: [3, 2]
  }, ['x', 'y']);
  expect(result.state).toBe(true);
  expect(result.data).toEqual({ x: 1, y: 1 });
});