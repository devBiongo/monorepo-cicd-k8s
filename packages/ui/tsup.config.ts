import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/Button/index.ts', 'src/TextField/index.ts'],
  dts: true,
  format: ['esm'],
  outDir: 'dist',
  clean: true
});
