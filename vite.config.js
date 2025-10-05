import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Anas-Khan-Portfolio/', // ✅ must match your repo name exactly (case-sensitive)
})
