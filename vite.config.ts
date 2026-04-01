import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/city-photo-adventure/', // 設定給 GitHub Pages 使用的相對路徑
})
