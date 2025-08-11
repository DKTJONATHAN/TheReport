import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  // YOUR EXISTING CONFIG (unchanged)
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
  },

  // ONLY NEW ADDITION (fixes build error)
  vite: {
    build: {
      minify: 'esbuild' // Uses built-in esbuild instead of missing terser
    }
  }
});