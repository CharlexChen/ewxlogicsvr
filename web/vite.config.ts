import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig({
  root: 'web',
  plugins: [vue(), svgLoader({ svgoConfig: {} })],
  build: {
    outDir: path.resolve(__dirname, '../build'),
  },
  resolve: {
    alias: {
      // '~': './',
      // '@': './web',
      '~': path.resolve(__dirname, '../'),
      '@': path.resolve(__dirname, './'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        math: 'always',
        javascriptEnabled: true,
      },
    },
  },
});
