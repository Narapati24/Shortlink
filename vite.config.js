import { defineConfig } from 'vite'

export default defineConfig({
  base: './', // Ensure relative paths for GitHub Pages
  server: {
    open: true,
    watch: {
      usePolling: false
    }
  },
  css: {
    devSourcemap: true
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
  }
})
