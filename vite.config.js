import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
      host: true,  // allows access using the IP
      port: 3000,  // you can change this port if needed
    },
  }
)
