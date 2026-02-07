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
  
  // 1. SEO FIX: Enforce URL consistency to prevent duplicate content
  trailingSlash: 'never', 

  // 2. PERFORMANCE: Minify HTML output automatically
  compressHTML: true,

  integrations: [
    mdx(),
    sitemap({
      filter: (page) => {
        // Normalize the URL for safer checking
        const url = new URL(page);
        const path = url.pathname;

        // 3. ROBUST FILTERING
        // Check for homepage, posts, or specific paths without worrying about slashes
        return path === '/' ||
               path.startsWith('/posts/') || 
               path === '/about' ||
               path === '/contact' ||
               path === '/privacy' ||
               path === '/terms';
      },
      // Optional: specific change frequencies for news sites
      changefreq: 'daily',
      priority: 0.7,
    }),
    indexJumpIntegration()
  ]
});