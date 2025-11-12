import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true,        // escucha en 0.0.0.0 (necesario para túneles)
    port: 5173,
    strictPort: true,
    hmr: {
      clientPort: 443, // HMR a través de ngrok HTTPS
      // protocol: 'wss', // normalmente no hace falta; descomenta si tu navegador bloquea mixed content
    },
  },
})
