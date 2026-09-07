import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    base: env.VITE_BASE_PATH || '/',
    build: { target: 'es2022' },
    server: { port: 5173, strictPort: true },
    preview: { port: 4173, strictPort: true },
  }
})
