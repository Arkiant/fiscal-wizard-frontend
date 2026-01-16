import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Reduce bundle size in production
    minify: 'esbuild', // Use built-in minifier
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks for better caching
          vendor: ['react', 'react-dom'],
          ui: ['react-dropzone']
        }
      }
    },
    // Optimize for production
    target: 'esnext',
    chunkSizeWarningLimit: 1000
  },
  // Define global constants
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0')
  }
})