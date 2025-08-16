import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://www.jonathanmwaniki.co.ke',
  output: 'hybrid',
  adapter: vercel({
    maxDuration: 60
  }),
  integrations: [
    mdx(),
    sitemap()
  ]
});