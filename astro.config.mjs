import { defineConfig, passthroughImageService } from 'astro/config';
import mdx from '@astrojs/mdx';
import indexJumpIntegration from './integrations/indexjump.js';

export default defineConfig({
  site: 'https://jonathanmwaniki.co.ke',

  trailingSlash: 'never',
  compressHTML: true,

  image: {
    service: passthroughImageService()
  },

  integrations: [
    mdx(),
    // sitemap removed — replaced by src/pages/sitemap.xml.js below
    indexJumpIntegration()
  ]
});
