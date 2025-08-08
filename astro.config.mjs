import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://jonathanmwaniki.co.ke',
  integrations: [
    mdx(),
    sitemap()
  ],
  markdown: {
    // Disable all transformations
    remarkPlugins: [],
    rehypePlugins: [],
    // Basic syntax highlighting
    syntaxHighlight: 'prism'
  }
});