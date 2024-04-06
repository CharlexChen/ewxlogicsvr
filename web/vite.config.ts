import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  root: 'web',
  plugins: [vue()],
  build: {
    outDir: path.resolve(__dirname, '../build'),
  },
  resolve: {
    alias: {
      // '~': './',
      // '@': './web',
      '~': path.resolve(__dirname, '../'),
      '@': path.resolve(__dirname, './'),
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        math: 'always'
      },
    }
  }
})
