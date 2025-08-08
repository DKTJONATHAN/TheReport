// astro.config.mjs
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkGfm from 'remark-gfm';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import { remarkReadingTime } from './src/utils/remark-reading-time.mjs';

export default defineConfig({
  site: 'https://jonathanmwaniki.co.ke',
  output: 'static',
  build: {
    assets: '_assets',  // Better for cache busting
    inlineStylesheets: 'auto',
    format: 'file'
  },
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
      langs: ['bash', 'json', 'javascript', 'typescript', 'html', 'css']
    },
    remarkPlugins: [
      remarkGfm,  // GitHub Flavored Markdown support
      remarkReadingTime  // Custom plugin for reading time estimates
    ],
    rehypePlugins: [
      rehypeSlug,  // Adds IDs to headings
      [rehypeAutolinkHeadings, {  // Adds anchor links to headings
        behavior: 'append',
        properties: {
          class: 'heading-anchor',
          ariaHidden: true
        }
      }]
    ],
    syntaxHighlight: 'shiki',
    gfm: true
  },
  vite: {
    css: {
      transformer: 'postcss',
      devSourcemap: true
    },
    build: {
      cssMinify: true,
      minify: 'terser',
      chunkSizeWarningLimit: 1600
    },
    optimizeDeps: {
      include: ['@astrojs/mdx']
    }
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        quality: 80
      }
    }
  },
  integrations: [
    mdx(),  // MDX support
    sitemap()  // Automatic sitemap generation
  ],
  experimental: {
    assets: true,  // Opt-in to the new assets handling
    inlineStylesheets: 'auto'
  }
});