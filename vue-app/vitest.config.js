import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
<<<<<<< Updated upstream:vue-app/vitest.config.js
    plugins: [vue()],
    test: {
        environment: 'jsdom',
        globals: true,
    }
=======
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
>>>>>>> Stashed changes:vue-app/vite.config.js
})
