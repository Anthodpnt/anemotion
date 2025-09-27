import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import react from '@vitejs/plugin-react'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  root: resolve(__dirname, 'src'),
  base: './',
  build: {
    outDir: resolve(__dirname, 'build'),
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@data': resolve(__dirname, 'src/data'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@icons': resolve(__dirname, 'src/components/commons/Icons'),
      '@motion': resolve(__dirname, 'src/motion'),
      '@layout': resolve(__dirname, 'src/components/layout'),
      '@sections': resolve(__dirname, 'src/components/sections'),
      '@components': resolve(__dirname, 'src/components/commons'),
    },
  },
  plugins: [react()],
  publicDir: resolve(__dirname, 'public'),
})
