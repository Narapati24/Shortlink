import { defineConfig } from 'vite'

export default defineConfig({
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
    outDir: 'dist'
  }
})
