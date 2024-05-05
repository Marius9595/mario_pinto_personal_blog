/// <reference types="vitest" />
import {getViteConfig} from 'astro/config';

export default getViteConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ['./setupTests.ts'],
    include: ['./**/*.test.tsx'],
  },
});