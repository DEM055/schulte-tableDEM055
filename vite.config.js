import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Указываем базовый путь
export default defineConfig({
  base: '/schulte-tableDEM055/',
  plugins: [react()],
})
