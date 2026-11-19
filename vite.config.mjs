import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/cool-uncool/' : '/',
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    include: ['src/__tests__/**/*.test.jsx'],
  },
}));
