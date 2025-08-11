import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node'; // Add this

export default defineConfig({
  site: 'https://jonathanmwaniki.co.ke',
  output: 'server', // Enable SSR
  adapter: node({
    mode: 'standalone' // For Vercel deployment
  }),
  integrations: [
    mdx(),
    sitemap()
  ],
  markdown: {
    syntaxHighlight: 'prism'
  },
  vite: {
    build: {
      rollupOptions: {
        external: ['googleapis'] // Prevent bundling issues
      }
    }
  }
});