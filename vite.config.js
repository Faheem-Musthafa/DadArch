import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const adminRedirect = () => ({
  name: 'admin-redirect',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      if (req.url === '/admin' || req.url === '/admin/') {
        req.url = '/admin/index.html';
      }
      next();
    });
  },
});

export default defineConfig({
  plugins: [react(), adminRedirect()],
})
