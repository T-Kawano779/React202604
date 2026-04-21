import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
  define: {
    'import.meta.vitest': 'undefined', // 【インソーステスト用】通常のビルド時は消す設定
  },
})