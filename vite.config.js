import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    server: {
        open: true
    },
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        minify: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                models: resolve(__dirname, 'models.html')
            }
        }
    },
});
