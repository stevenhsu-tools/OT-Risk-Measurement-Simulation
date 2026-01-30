import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "./src") },
      { find: "plotly.js/dist/plotly", replacement: path.resolve(__dirname, "node_modules/plotly.js/dist/plotly.js") },
      { find: "plotly.js", replacement: path.resolve(__dirname, "node_modules/plotly.js/dist/plotly.js") },
    ],
  },
})
