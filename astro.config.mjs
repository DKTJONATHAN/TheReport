// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://jonathanmwaniki.co.ke',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true
    }
  }
});