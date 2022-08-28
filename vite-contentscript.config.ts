import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }]
  },
  build: {
    emptyOutDir: false,
    sourcemap: true,
    rollupOptions: {
      input: 'src/services/content/content-script.ts',
      output: {
        dir: 'dist',
        format: 'iife',
        entryFileNames: '[name].js'
      }
    }
  },
})