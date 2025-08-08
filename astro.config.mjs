import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkGfm from 'remark-gfm';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';

export default defineConfig({
  site: 'https://jonathanmwaniki.co.ke',
  output: 'static',
  build: {
    assets: '_assets',
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
      remarkGfm
    ],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, {
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
    }
  },
  integrations: [
    mdx(),
    sitemap()
  ]
});