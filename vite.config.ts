import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

function saveHeroPhotoPlugin(): Plugin {
  return {
    name: 'save-hero-photo-plugin',
    configureServer(server) {
      server.middlewares.use('/api/save-hero-photo', (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const parsed = JSON.parse(body);
              const imageStr = parsed.image;
              if (imageStr && typeof imageStr === 'string' && imageStr.startsWith('data:image')) {
                const base64Data = imageStr.replace(/^data:image\/\w+;base64,/, '');
                const buffer = Buffer.from(base64Data, 'base64');
                const publicAssetsDir = path.resolve(process.cwd(), 'public', 'assets');
                if (!fs.existsSync(publicAssetsDir)) {
                  fs.mkdirSync(publicAssetsDir, { recursive: true });
                }
                const targetFilePath = path.join(publicAssetsDir, 'profile-photo.jpg');
                fs.writeFileSync(targetFilePath, buffer);

                // Also sync to dist/assets/profile-photo.jpg if dist exists
                const distAssetsDir = path.resolve(process.cwd(), 'dist', 'assets');
                if (fs.existsSync(distAssetsDir)) {
                  fs.writeFileSync(path.join(distAssetsDir, 'profile-photo.jpg'), buffer);
                }

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, path: '/assets/profile-photo.jpg', size: buffer.length }));
                return;
              }
            } catch (err) {
              console.error('Failed to save hero photo:', err);
            }
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Failed to process image' }));
          });
        } else {
          res.statusCode = 404;
          res.end();
        }
      });

      server.middlewares.use('/api/photo-status', (_req, res) => {
        const targetFilePath = path.resolve(process.cwd(), 'public', 'assets', 'profile-photo.jpg');
        const exists = fs.existsSync(targetFilePath);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ exists, path: '/assets/profile-photo.jpg' }));
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), saveHeroPhotoPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
