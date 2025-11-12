import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig(({ mode }) => ({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true,          // Necesario para exponer el dev server fuera del localhost
    port: 5173,
    strictPort: true,
    hmr: mode === 'development' ? { clientPort: 443 } : undefined, // Solo en dev
  },
  build: {
    outDir: 'dist',      // Carpeta de salida para producción
  },
}))
