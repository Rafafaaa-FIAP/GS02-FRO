import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/GS02-front",
  build: { chunkSizeWarningLimit: 1600, }
})
