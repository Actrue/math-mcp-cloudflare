import { describe, it, expect } from 'vitest'
import { tools } from '../src/tools'

/**
 * 数学运算工具测试套件
 * 测试所有数学运算功能的正确性
 */
describe('数学运算工具测试', () => {
  
  describe('基础表达式计算', () => {
    it('应该正确计算简单的加法表达式', () => {
      const result = tools.evaluateMathExpression('2 + 3')
      expect(result).toBe(5)
    })

    it('应该正确计算减法表达式', () => {
      const result = tools.evaluateMathExpression('10 - 4')
      expect(result).toBe(6)
    })

    it('应该正确计算乘法表达式', () => {
      const result = tools.evaluateMathExpression('6 * 7')
      expect(result).toBe(42)
    })

    it('应该正确计算除法表达式', () => {
      const result = tools.evaluateMathExpression('15 / 3')
      expect(result).toBe(5)
    })

    it('应该正确计算幂运算', () => {
      const result = tools.evaluateMathExpression('2^3')
      expect(result).toBe(8)
    })

    it('应该正确处理括号表达式', () => {
      const result = tools.evaluateMathExpression('(2 + 3) * 4')
      expect(result).toBe(20)
    })

    it('应该正确计算复杂表达式', () => {
      const result = tools.evaluateMathExpression('2 * (3 + 4) - 1')
      expect(result).toBe(13)
    })
  })

  describe('三角函数计算', () => {
    it('应该正确计算sin函数', () => {
      const result = tools.evaluateMathExpression('sin(pi/2)')
      expect(result).toBeCloseTo(1, 10)
    })

    it('应该正确计算cos函数', () => {
      const result = tools.evaluateMathExpression('cos(0)')
      expect(result).toBe(1)
    })

    it('应该正确计算tan函数', () => {
      const result = tools.evaluateMathExpression('tan(pi/4)')
      expect(result).toBeCloseTo(1, 10)
    })
  })

  describe('高级数学函数', () => {
    it('应该正确计算平方根', () => {
      const result = tools.evaluateMathExpression('sqrt(16)')
      expect(result).toBe(4)
    })

    it('应该正确计算自然对数', () => {
      const result = tools.evaluateMathExpression('log(e)')
      expect(result).toBeCloseTo(1, 10)
    })

    it('应该正确使用数学常量pi', () => {
      const result = tools.evaluateMathExpression('pi')
      expect(result).toBeCloseTo(Math.PI, 10)
    })

    it('应该正确使用数学常量e', () => {
      const result = tools.evaluateMathExpression('e')
      expect(result).toBeCloseTo(Math.E, 10)
    })
  })

  describe('变量表达式计算', () => {
    it('应该正确计算带变量的表达式', () => {
      const result = tools.evaluateMathExpression('x + 5', { x: 10 })
      expect(result).toBe(15)
    })

    it('应该正确计算多变量表达式', () => {
      const result = tools.evaluateMathExpression('x * y + z', { x: 2, y: 3, z: 4 })
      expect(result).toBe(10)
    })
  })

  describe('错误处理', () => {
    it('应该抛出错误当表达式无效时', () => {
      expect(() => {
        tools.evaluateMathExpression('2 +')
      }).toThrow()
    })

    it('应该处理除以零的情况', () => {
      const result = tools.evaluateMathExpression('1/0')
      expect(result).toBe(Infinity)
    })
  })

  describe('calculateExpression函数', () => {
    it('应该与evaluateMathExpression产生相同结果', () => {
      const expr = '2 * 3 + 4'
      const result1 = tools.calculateExpression(expr)
      const result2 = tools.evaluateMathExpression(expr)
      expect(result1).toBe(result2)
    })
  })
})

describe('矩阵运算测试', () => {
  
  describe('矩阵创建', () => {
    it('应该正确创建2x2矩阵', () => {
      const data = [[1, 2], [3, 4]]
      const matrix = tools.createMatrix(data)
      expect(matrix.size()).toEqual([2, 2])
      expect(matrix.get([0, 0])).toBe(1)
      expect(matrix.get([0, 1])).toBe(2)
      expect(matrix.get([1, 0])).toBe(3)
      expect(matrix.get([1, 1])).toBe(4)
    })

    it('应该正确创建3x3矩阵', () => {
      const data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
      const matrix = tools.createMatrix(data)
      expect(matrix.size()).toEqual([3, 3])
    })

    it('应该正确创建向量', () => {
      const data = [1, 2, 3]
      const matrix = tools.createMatrix(data)
      expect(matrix.size()).toEqual([3])
    })
  })

  describe('矩阵加法', () => {
    it('应该正确计算2x2矩阵加法', () => {
      const a = [[1, 2], [3, 4]]
      const b = [[5, 6], [7, 8]]
      const result = tools.matrixAdd(a, b)
      expect(result.valueOf()).toEqual([[6, 8], [10, 12]])
    })

    it('应该正确计算3x3矩阵加法', () => {
      const a = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
      const b = [[9, 8, 7], [6, 5, 4], [3, 2, 1]]
      const result = tools.matrixAdd(a, b)
      expect(result.valueOf()).toEqual([[10, 10, 10], [10, 10, 10], [10, 10, 10]])
    })

    it('应该正确计算向量加法', () => {
      const a = [1, 2, 3]
      const b = [4, 5, 6]
      const result = tools.matrixAdd(a, b)
      expect(result.valueOf()).toEqual([5, 7, 9])
    })
  })

  describe('矩阵乘法', () => {
    it('应该正确计算2x2矩阵乘法', () => {
      const a = [[1, 2], [3, 4]]
      const b = [[5, 6], [7, 8]]
      const result = tools.matrixMultiply(a, b)
      expect(result.valueOf()).toEqual([[19, 22], [43, 50]])
    })

    it('应该正确计算矩阵与向量乘法', () => {
      const a = [[1, 2], [3, 4]]
      const b = [5, 6]
      const result = tools.matrixMultiply(a, b)
      expect(result.valueOf()).toEqual([17, 39])
    })

    it('应该正确计算标量乘法', () => {
      const a = [[1, 2], [3, 4]]
      const scalar = 2
      const result = tools.matrixMultiply(a, scalar)
      expect(result.valueOf()).toEqual([[2, 4], [6, 8]])
    })
  })
})

describe('方程组求解测试', () => {

  describe('solveLinearSystem', () => {
    it('应该正确求解2x2线性方程组', () => {
      const coefficients = [[2, 1], [1, 3]];
      const constants = [5, 7];
      const solution = tools.solveLinearSystem(coefficients, constants);
      expect(solution.toArray()).toEqual([[1.6], [1.8]]); // x=1.6, y=1.8
    });

    it('应该正确求解3x3线性方程组', () => {
      const coefficients = [[1, 1, 1], [0, 1, 1], [0, 0, 1]];
      const constants = [6, 4, 3];
      const solution = tools.solveLinearSystem(coefficients, constants);
      expect(solution.toArray()).toEqual([[2], [1], [3]]); // x=2, y=1, z=3
    });

    it('应该处理无解或多解的情况（mathjs会抛出错误）', () => {
      const coefficients = [[1, 1], [2, 2]];
      const constants = [1, 3];
      expect(() => tools.solveLinearSystem(coefficients, constants)).toThrow();
    });

    it('应该处理系数矩阵和常数向量维度不匹配的情况', () => {
      const coefficients = [[1, 1], [2, 2]];
      const constants = [1, 3, 5];
      expect(() => tools.solveLinearSystem(coefficients, constants)).toThrow();
    });
  });

  describe('solveEquationSystem', () => {
    it('应该正确求解带变量名的2x2线性方程组', () => {
      const equations = { coefficients: [[2, 1], [1, 3]], constants: [5, 7] };
      const variables = ['x', 'y'];
      const solution = tools.solveEquationSystem(equations, variables);
      expect(solution).toEqual({ x: 1.6, y: 1.8 });
    });

    it('应该正确求解带变量名的3x3线性方程组', () => {
      const equations = { coefficients: [[1, 1, 1], [0, 1, 1], [0, 0, 1]], constants: [6, 4, 3] };
      const variables = ['x', 'y', 'z'];
      const solution = tools.solveEquationSystem(equations, variables);
      expect(solution).toEqual({ x: 2, y: 1, z: 3 });
    });

    it('如果没有提供变量名，应该返回扁平化的数组', () => {
      const equations = { coefficients: [[2, 1], [1, 3]], constants: [5, 7] };
      const solution = tools.solveEquationSystem(equations);
      expect(solution).toEqual([1.6, 1.8]);
    });

    it('应该处理字符串格式的方程组（目前未实现）', () => {
      const equations = ['2x + y = 5', 'x + 3y = 7'];
      expect(() => tools.solveEquationSystem(equations)).toThrow('字符串格式的方程组解析功能待实现');
    });
  });
});

describe('符号计算测试', () => {
  
  describe('符号表达式解析', () => {
    it('应该正确解析简单表达式', () => {
      const result = tools.symbolicCompute('x + 1')
      expect(result.toString()).toBe('x + 1')
    })

    it('应该正确解析复杂表达式', () => {
      const result = tools.symbolicCompute('2*x^2 + 3*x + 1')
      expect(result.toString()).toBe('2 * x ^ 2 + 3 * x + 1')
    })

    it('应该正确解析三角函数表达式', () => {
      const result = tools.symbolicCompute('sin(x) + cos(y)')
      expect(result.toString()).toBe('sin(x) + cos(y)')
    })
  })

  describe('求导数', () => {
    it('应该正确计算多项式的导数', () => {
      const result = tools.derivative('x^2', 'x')
      expect(result.toString()).toBe('2 * x')
    })

    it('应该正确计算复杂多项式的导数', () => {
      const result = tools.derivative('x^3 + 2*x^2 + x + 1', 'x')
      expect(result.toString()).toBe('3 * x ^ 2 + 4 * x + 1')
    })

    it('应该正确计算三角函数的导数', () => {
      const result = tools.derivative('sin(x)', 'x')
      expect(result.toString()).toBe('cos(x)')
    })

    it('应该正确计算指数函数的导数', () => {
      const result = tools.derivative('e^x', 'x')
      expect(result.toString()).toBe('e ^ x')
    })

    it('应该正确计算常数的导数', () => {
      const result = tools.derivative('5', 'x')
      expect(result.toString()).toBe('0')
    })
  })

  describe('表达式有理化', () => {
    it('应该正确有理化简单分式', () => {
      const result = tools.rationalize('1/2 + 1/3')
      // mathjs可能返回小数形式，检查数值是否正确
      expect(parseFloat(result.toString())).toBeCloseTo(5/6, 10)
    })

    it('应该正确有理化复杂分式', () => {
      const result = tools.rationalize('(x + 1) / (x - 1) + (x - 1) / (x + 1)')
      // 结果应该是有理化的形式
      expect(result.toString()).toContain('/')
    })
  })

  describe('表达式简化', () => {
    it('应该正确简化代数表达式', () => {
      const expr = tools.symbolicCompute('2*x + 3*x')
      const result = tools.simplifyExpression(expr)
      expect(result.toString()).toBe('5 * x')
    })

    it('应该正确简化带数值的表达式', () => {
      const expr = tools.symbolicCompute('x + 1')
      const result = tools.simplifyExpression(expr, { x: 2 })
      expect(result.toString()).toBe('3')
    })
  })
})