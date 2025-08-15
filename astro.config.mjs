import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://www.jonathanmwaniki.co.ke',
  output: 'server',
  adapter: vercel({
    runtime: 'nodejs22.x',  // Updated to Node 22
    edgeMiddleware: false
  }),
  integrations: [
    mdx(),
    sitemap({
      // Your existing sitemap config
    })
  ],
  vite: {
    define: {
      'import.meta.env.GOOGLE_CREDENTIALS': JSON.stringify(
        process.env.GOOGLE_CREDENTIALS || ''
      )
    },
    plugins: [
      // Your existing plugins
    ]
  }
});