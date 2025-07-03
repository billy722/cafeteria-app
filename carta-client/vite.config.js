// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './', // <- Esto es esencial para que funcionen bien las rutas en producción
  plugins: [react()],
})
