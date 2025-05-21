import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import compression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    visualizer({
      open: true,  // Automatically open the visualization in your browser
      filename: "stats.html",  // Output file
      gzipSize: true,
      brotliSize: true,
    }),
    compression(),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
