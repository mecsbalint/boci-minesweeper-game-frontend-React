import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const env = loadEnv(process.cwd(), "");
const BACKEND_URI = env.VITE_BACKEND_URI;

// https://vite.dev/config/
export default defineConfig({
    server: {
        proxy: {
            "/api": BACKEND_URI,
            "/socket.io": {
                target: BACKEND_URI,
                ws: true,
                changeOrigin: true,
                rewriteWsOrigin: true
            }
        },
    },
    plugins: [
        react(),
        tailwindcss()
    ],
});
