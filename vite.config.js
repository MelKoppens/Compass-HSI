import { defineConfig } from 'vite'
import svgLoader from 'vite-svg-loader'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgLoader()],
})
