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
    rollupOptions: {
      output: {
        manualChunks: {
          "background": ["src/services/background/background.ts"]
        },
        chunkFileNames: "[name].js"
      }
    },
    sourcemap: true,
    watch: {}
  },
})
