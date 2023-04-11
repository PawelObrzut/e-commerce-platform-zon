import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://tradezon-node.onrender.com',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    minify: true,
    rollupOptions: {
      input: 'src/main.tsx',
      output: {
        format: 'esm',
      },
    },
  },
})
