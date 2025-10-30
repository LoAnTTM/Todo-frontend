// vite.config.js hoặc vite.config.ts

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
        open: true,
        proxy: {
            // Khi Frontend gọi '/api'
            '/api': {
                target: 'http://localhost:8000', // Chuyển tiếp đến Backend
                rewrite: (path) => path.replace(/^\/api/, ''),
                changeOrigin: true,
                secure: false,
            },
        },
    },
});