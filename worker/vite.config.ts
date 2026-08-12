import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' makes the build work on GitHub Pages sub-paths
// and when served from a Cloudflare Worker or any static host.
export default defineConfig({
  plugins: [react()],
  base: './'
})
