import pkg from './package.json';
import { defineConfig } from 'vite';
import removeConsole from 'vite-plugin-remove-console';
import dts from 'vite-plugin-dts';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  base: './',
  plugins: [
    process.env.VITE_MODE === 'prod' &&
      removeConsole({
        external: ['warn', 'error'], // 제외할 console 메서드.
      }),
    dts({
      outDir: 'dist',
      insertTypesEntry: true,
    }),
    {
      name: 'add license',
      closeBundle() {
        // LICENSE를 dist로 복사
        const src = path.resolve(__dirname, 'LICENSE');
        const dest = path.resolve(__dirname, 'dist', 'LICENSE');
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, dest);
        }
      },
    },
  ],
  build: {
    minify: 'terser', // 'terser' or 'esbuild'
    lib: {
      name: pkg.name.replace(/^@.*\//, '').replace(/[^a-zA-Z0-9_$]/g, ''),
      fileName: (format) => (format === 'es' ? 'index.esm.js' : 'index.js'),
      entry: 'src/index.ts',
      formats: ['umd', 'es'],
    },
    sourcemap: false,
  },
  server: {
    port: 5173,
  },
});
