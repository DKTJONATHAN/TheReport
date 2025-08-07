// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://jonathanmwaniki.co.ke',
  integrations: [tailwind()],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true
    }
  }
});