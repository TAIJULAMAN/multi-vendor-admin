import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   host: '10.10.20.22',
  //   port: 5000,
  //   strictPort: true,
  // },
})
