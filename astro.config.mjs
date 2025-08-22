// astro.config.mjs
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/static';
import indexJumpIntegration from './integrations/indexjump.js';

export default defineConfig({
  site: 'https://jonathanmwaniki.co.ke',
  output: 'static',
  adapter: vercel(),
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => {
        // Only include posts and essential pages in sitemap
        return page.includes('/posts/') || 
               page.endsWith('/about/') ||
               page.endsWith('/contact/') ||
               page.endsWith('/privacy/') ||
               page.endsWith('/terms/') ||
               page === 'https://jonathanmwaniki.co.ke/';
      }
    }),
    indexJumpIntegration()
  ]
});