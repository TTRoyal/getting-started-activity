import {defineConfig} from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  // envDir: './',
  server: {
    proxy: {
      '/api': {
        target: 'https://discordauth.retown.workers.dev',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
    hmr: false
  },
});
