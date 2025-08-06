import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "use-sync-external-store/shim/index.js": "react",
      "use-sync-external-store/shim": "react",
      "use-sync-external-store": "react",
    },
  },
  server: {
    host: true, // Allows external access
    port: 3000, // Optional: Set your desired port
  },
})
