import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';  // ← ISR requires serverless
import indexJumpIntegration from './integrations/indexjump.js';

export default defineConfig({
  site: 'https://jonathanmwaniki.co.ke',
  output: 'hybrid',  // ← Enables ISR (static + dynamic)
  adapter: vercel({
    webAnalytics: { enabled: true },
    isr: true  // ← Vercel ISR
  }),

  trailingSlash: 'never',
  compressHTML: true,

  image: {
    domains: ['nation.africa', 'images.unsplash.com', 'via.placeholder.com', 'i.imgur.com'],
    remotePatterns: [{ protocol: 'https://' }]
  },

  integrations: [
    mdx(),
    sitemap({
      filter: (page) => {
        const url = new URL(page);
        const path = url.pathname;
        return path === '/' ||
               path.startsWith('/posts/') || 
               path === '/about' ||
               path === '/contact' ||
               path === '/privacy' ||
               path === '/terms';
      },
      changefreq: 'daily',
      priority: 0.7,
    }),
    indexJumpIntegration()
  ]
});

