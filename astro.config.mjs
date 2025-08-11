import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/static'; // Changed to static adapter

export default defineConfig({
  site: 'https://jonathanmwaniki.co.ke',
  output: 'static', // Changed to static output
  adapter: vercel(),
  integrations: [mdx(), sitemap()],
  markdown: { syntaxHighlight: 'prism' }
});