import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // relative asset paths, so the build runs from any folder: a GitHub Pages repo path or a domain root
  base: './',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    // v1 at /, v2 at /v2.html with its legal pages beside it
    rollupOptions: {
      input: { main: 'index.html', v2: 'v2.html', privacy: 'v2-privacy.html', cookies: 'v2-cookies.html' },
    },
  },
})
