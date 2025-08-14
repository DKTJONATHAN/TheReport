import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/static';

export default defineConfig({
  site: 'https://www.jonathanmwaniki.co.ke', // Changed to www version
  output: 'static',
  adapter: vercel(),
  integrations: [mdx(), sitemap({
    canonicalURL: 'https://www.jonathanmwaniki.co.ke' // Added canonical URL for sitemap
  })],
  markdown: { syntaxHighlight: 'prism' },
  trailingSlash: 'ignore', // Recommended for consistency
});