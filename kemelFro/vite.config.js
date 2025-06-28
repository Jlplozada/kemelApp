import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 4001,
    allowedHosts: ['kemel.online', 'www.kemel.online'], // 👈 añade esto
    // Redirige todas las rutas a index.html para SPA
    historyApiFallback: true
  },
})
