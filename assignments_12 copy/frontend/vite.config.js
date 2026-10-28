import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // ← ใส่ Port ของ Backend (ถ้าใช้ 5000 ก็แก้เป็น 5000)
        changeOrigin: true
      }
    }
  }
})
