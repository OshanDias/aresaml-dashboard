import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// During development the React dev server runs on :5173 and the Spring API on
// :8080. This proxy forwards any request starting with /api to the backend, so
// the frontend can call fetch('/api/...') as if it were same-origin - no CORS
// headaches. For a deployed build, set VITE_API_URL to your live API instead.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
});
