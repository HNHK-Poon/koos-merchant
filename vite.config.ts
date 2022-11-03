import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';


// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 5002,
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        '@home': fileURLToPath(new URL('./src/views/home', import.meta.url)),
        '@activity': fileURLToPath(new URL('./src/views/activity', import.meta.url)),
        '@state': fileURLToPath(new URL('./src/infrastructure/state', import.meta.url)),
        '@context': fileURLToPath(new URL('./src/infrastructure/context', import.meta.url)),
        '@service': fileURLToPath(new URL('./src/infrastructure/service', import.meta.url)),
        '@hook': fileURLToPath(new URL('./src/infrastructure/hook', import.meta.url)),
        '@locales': fileURLToPath(new URL('./src/infrastructure/locales', import.meta.url)),
      }
    },
    define: {
      'process.env': process.env
    }
});
