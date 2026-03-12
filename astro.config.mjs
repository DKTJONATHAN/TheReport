
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/static';
import indexJumpIntegration from './integrations/indexjump.js';

export default defineConfig({
  site: 'https://jonathanmwaniki.co.ke',
  output: 'static',
  adapter: vercel(),

  // 1. SEO FIX: Enforce URL consistency to prevent duplicate content
  trailingSlash: 'never', 

  // 2. PERFORMANCE: Minify HTML output automatically
  compressHTML: true,

  // 3. PAGE SPEED FIX: Image optimization for remote images (Nation Africa, etc.)
  image: {
    domains: ['nation.africa', 'images.unsplash.com', 'via.placeholder.com', 'i.imgur.com'],
    remotePatterns: [
      {
        protocol: 'https://'
      }
    ]
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

