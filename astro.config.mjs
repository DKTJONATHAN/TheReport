import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://jonathanmwaniki.co.ke',
  output: 'server',
  adapter: vercel({
    webAnalytics: { enabled: false },
    runtime: 'nodejs18.x', // Explicit runtime declaration
    functions: {
      // Fixes the invalid runtime error
      'render/*': { memory: 3008, maxDuration: 30 }
    }
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
      minify: 'esbuild' // Ensures no terser dependency needed
    }
  }
});