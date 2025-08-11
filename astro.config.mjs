import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://jonathanmwaniki.co.ke',
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: false
    }
  }),
  integrations: [
    mdx(),
    sitemap()
  ],
  markdown: {
    syntaxHighlight: 'prism'
  }
});