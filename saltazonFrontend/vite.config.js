import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
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
