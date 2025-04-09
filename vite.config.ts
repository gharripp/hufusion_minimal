import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,  // Automatically open the visualization in your browser
      filename: "stats.html",  // Output file
      gzipSize: true,
      brotliSize: true,
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
