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
    sitemap()
  ]
});