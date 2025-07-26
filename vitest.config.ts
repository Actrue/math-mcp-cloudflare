/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // 测试环境配置
    environment: 'node',
    // 测试文件匹配模式
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    // 排除文件
    exclude: ['node_modules', 'dist', '.git'],
    // 全局测试设置
    globals: true,
    // 测试超时时间
    testTimeout: 10000,
    // 钩子超时时间
    hookTimeout: 10000
  },
  esbuild: {
    target: 'node18'
  }
})