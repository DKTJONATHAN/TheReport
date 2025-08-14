import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/static';

export default defineConfig({
  site: 'https://www.jonathanmwaniki.co.ke',
  output: 'static',
  adapter: vercel(),
  integrations: [
    mdx(),
    sitemap({
      canonicalURL: 'https://www.jonathanmwaniki.co.ke',
      // Customize for news website (hourly updates)
      transform: (entry) => {
        return {
          loc: entry.loc,
          lastmod: new Date().toISOString(), // Current timestamp
          changefreq: 'hourly', // For breaking news
          priority: entry.loc === 'https://www.jonathanmwaniki.co.ke/' ? 1.0 : 0.9, // Homepage gets highest priority
        };
      },
    }),
  ],
  markdown: { syntaxHighlight: 'prism' },
  trailingSlash: 'ignore',
});