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
      entryLimit: 50000,
      serialize(item) {
        return {
          url: item.url,
          lastmod: new Date().toISOString(),
          changefreq: 'hourly',
          priority: item.url === '/' ? 1.0 : 0.9,
        };
      }
    })
  ],
  markdown: { syntaxHighlight: 'prism' },
  trailingSlash: 'ignore',
});