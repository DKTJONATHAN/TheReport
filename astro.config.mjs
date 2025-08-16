import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://www.jonathanmwaniki.co.ke',
  output: 'hybrid',
  adapter: vercel({
    runtime: 'nodejs18.x',
    edgeMiddleware: false
  }),
  integrations: [
    mdx(),
    sitemap()
  ],
  vite: {
    define: {
      'import.meta.env.GOOGLE_CREDENTIALS': JSON.stringify(''),
      'process.env.GOOGLE_CREDENTIALS': JSON.stringify(
        process.env.GOOGLE_CREDENTIALS || ''
      ),
      'process.env.SITE_URL': JSON.stringify(
        process.env.SITE_URL || 'https://www.jonathanmwaniki.co.ke'
      )
    },
    plugins: []
  }
});