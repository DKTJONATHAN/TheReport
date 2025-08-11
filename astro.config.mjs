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
    },
    // Explicit runtime configuration
    runtime: 'nodejs18.x',
    // Additional Vercel optimizations
    includeFiles: ['src/pages/api/**/*'],
    excludeFiles: ['src/pages/api/**/*.test.*']
  }),
  integrations: [
    mdx(),
    sitemap({
      // Sitemap configuration
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date()
    })
  ],
  markdown: {
    syntaxHighlight: 'prism',
    // Markdown extensions
    extendDefaultPlugins: true
  },
  // Build optimizations
  vite: {
    build: {
      minify: 'terser'
    }
  }
});