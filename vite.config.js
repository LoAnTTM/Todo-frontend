import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // keep this in sync with package.json dev script
    port: 5173,
    open: true
  }
});
