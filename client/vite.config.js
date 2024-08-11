import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0', // Allows external access
    port: 5173, // Optional: specify the port if needed
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Example of chunking vendor libraries
          vendor: ['react', 'react-dom'], // Adjust based on your dependencies
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Adjust or increase as needed
  },
});
