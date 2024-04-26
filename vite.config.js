import { ViteEjsPlugin } from 'vite-plugin-ejs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { defineConfig } from 'vite';
import { glob } from 'glob';
import autoprefixer from 'autoprefixer';

import liveReload from 'vite-plugin-live-reload';

function moveOutputPlugin() {
    return {
        name: 'move-output',
        enforce: 'post',
        apply: 'build',
        async generateBundle(options, bundle) {
            for (const fileName in bundle) {
                if (fileName.startsWith('pages/')) {
                    const newFileName = fileName.slice('pages/'.length);
                    bundle[fileName].fileName = newFileName;
                }
            }
        },
    };
}

export default defineConfig({
    // base 的寫法：base: '/Repository 的名稱/'
    // base: process.env.NODE_ENV === 'production' ? '/2023-Dessert-Webshop-Project/' : '/',
    base: '/2023-Dessert-Webshop-Project/',
    css: {
        postcss: {
            plugins: [autoprefixer()]
        }
    },
    plugins: [
        liveReload(['./layout/**/*.ejs', './pages/**/*.ejs', './pages/**/*.html']),
        ViteEjsPlugin(),
        moveOutputPlugin(),
    ],
    server: {
        // 啟動 server 時預設開啟的頁面
        open: 'pages/index.html',
    },
    build: {
        rollupOptions: {
            input: Object.fromEntries(
                glob
                .sync('pages/**/*.html')
                .map((file) => [
                path.relative('pages', file.slice(0, file.length - path.extname(file).length)),
                fileURLToPath(new URL(file, import.meta.url)),
                ])
            ),
        },
        outDir: 'dist',
    },
});
