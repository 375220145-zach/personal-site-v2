import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/personal-site-v2/',
  build: { outDir: 'docs', emptyOutDir: false },
  plugins: [react(), tailwindcss()],
})
