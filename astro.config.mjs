import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://www.jonathanmwaniki.co.ke',
  output: 'hybrid', // Best for mixed static+dynamic sites
  adapter: vercel({
    runtime: 'nodejs22.x',
    edgeMiddleware: false,
    functionPerRoute: true, // Better API route handling
    includeFiles: ['google-credentials.json'] // If using file-based auth
  }),
  integrations: [
    mdx(),
    sitemap({
      // Your existing sitemap configuration
    })
  ],
  vite: {
    define: {
      // Client-side fallback (if needed)
      'import.meta.env.GOOGLE_CREDENTIALS': JSON.stringify(''),
      // Server-side usage
      'process.env.GOOGLE_CREDENTIALS': JSON.stringify(
        process.env.GOOGLE_CREDENTIALS || ''
      ),
      'process.env.SITE_URL': JSON.stringify(
        process.env.SITE_URL || 'https://www.jonathanmwaniki.co.ke'
      )
    },
    plugins: [
      // Your existing plugins
    ]
  }
});