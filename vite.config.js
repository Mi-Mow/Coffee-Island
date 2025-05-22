import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Coffee-Island/',
  server: { port: 5200 },
  plugins: [react()],
})
