// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://kassarl.github.io',
  base: '/daydragons-personal-website',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
});
