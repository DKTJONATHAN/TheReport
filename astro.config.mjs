import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { remarkUnwrapImages } from 'remark-unwrap-images';

export default defineConfig({
  site: 'https://jonathanmwaniki.co.ke',
  integrations: [
    mdx(),
    sitemap({
      changefreq: 'weekly',
      priority: true,
      lastmod: new Date(),
    })
  ],
  markdown: {
    remarkPlugins: [
      // Remove image wrapper paragraphs while preserving frontmatter
      remarkUnwrapImages
    ],
    rehypePlugins: [],
    syntaxHighlight: 'prism',
    shikiConfig: {
      // Use default theme since you're using Prism
      theme: 'github-dark'
    }
  },
  image: {
    // Disable built-in image optimization since you're using external URLs
    service: {
      entrypoint: 'astro/assets/services/noop'
    }
  },
  vite: {
    build: {
      // Ensure external image URLs aren't processed
      assetsInlineLimit: 0
    }
  }
});