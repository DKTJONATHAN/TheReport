// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://jonathanmwaniki.co.ke',
  output: 'static',
  build: {
    assets: 'assets'
  },
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true
    },
    remarkPlugins: [],
    rehypePlugins: []
  },
  vite: {
    css: {
      transformer: 'postcss'
    }
  }
});