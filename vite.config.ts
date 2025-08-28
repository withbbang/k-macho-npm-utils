import pkg from './package.json';
import { defineConfig } from 'vite';
import removeConsole from 'vite-plugin-remove-console';

export default defineConfig({
  base: './',
  plugins: [
    process.env.VITE_MODE === 'prod' &&
      removeConsole({
        external: ['warn', 'error'], // 제외할 console 메서드.
      }),
  ],
  build: {
    minify: 'terser', // 'terser' or 'esbuild'
    lib: {
      name: pkg.name,
      fileName: (format) => {
        if (format === 'umd') {
          return 'index.js';
        } else if (format === 'es') {
          return 'index.esm.js';
        } else {
          return 'index.js';
        }
      },
      entry: 'src/index.ts',
      formats: ['umd', 'es'],
    },
    sourcemap: false,
  },
  server: {
    port: 5173,
  },
});
