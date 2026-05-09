import { defineConfig, passthroughImageService } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://jonathanmwaniki.co.ke',

  output: 'hybrid',
  adapter: cloudflare(),

  trailingSlash: 'never',
  compressHTML: true,

  image: {
    service: passthroughImageService()
  },

  integrations: [
    mdx()
  ],
  vite: {
    ssr: {
      // Externalize child_process so Vite doesn't crash if it's imported in server routes
      external: ['child_process']
    }
  },
  experimental: {
    contentCollectionCache: true
  }
});
