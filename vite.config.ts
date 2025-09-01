import pkg from './package.json';
import { defineConfig } from 'vite';
import removeConsole from 'vite-plugin-remove-console';
import dts from 'vite-plugin-dts';

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
  ],
  build: {
    minify: 'terser', // 'terser' or 'esbuild'
    lib: {
      name: pkg.name,
      formats: ['es', 'cjs', 'umd'], // ESM, CJS, UMD 동시에 빌드
      fileName: (format) => {
        switch (format) {
          case 'es':
            return 'index.esm.js';
          case 'cjs':
            return 'index.cjs.js';
          case 'umd':
            return 'index.umd.js';
          default:
            return 'index.js';
        }
      },
      entry: 'src/index.ts',
    },
    sourcemap: false,
  },
});
