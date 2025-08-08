import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkGfm from 'remark-gfm';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';

// Explicitly configure remark-gfm to avoid table parsing issues
const gfm = remarkGfm({
  singleTilde: false,
  tablePipeAlign: true,
  tableCellPadding: true
});

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
      [gfm]  // Use the configured version
    ],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, {
        behavior: 'append',
        properties: {
          class: 'heading-anchor',
          ariaHidden: true,
          tabIndex: -1
        },
        content: {
          type: 'element',
          tagName: 'span',
          properties: {
            ariaHidden: true
          },
          children: [{
            type: 'text',
            value: '#'
          }]
        }
      }]
    ],
    syntaxHighlight: 'shiki',
    gfm: true,
    // Add these to prevent markdown parsing errors
    remarkRehype: {
      allowDangerousHtml: true,
      handlers: {
        // Custom table handler to prevent 'this.setData' errors
        table: (h, node) => {
          return h(node, 'table', { className: ['table-auto'] }, node.children);
        }
      }
    }
  },
  integrations: [
    mdx(),
    sitemap()
  ],
  vite: {
    optimizeDeps: {
      include: [
        'remark-gfm',
        'rehype-autolink-headings',
        'rehype-slug'
      ],
      exclude: ['@astrojs/mdx']
    }
  }
});