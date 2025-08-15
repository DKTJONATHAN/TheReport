import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/static';

export default defineConfig({
  site: 'https://www.jonathanmwaniki.co.ke',
  output: 'static',
  adapter: vercel(),
  integrations: [
    mdx(),
    sitemap({
      canonicalURL: 'https://www.jonathanmwaniki.co.ke',
      entryLimit: 50000,
      filter: (page) => !page.includes('/tags/') && !page.includes('/category/'), // Exclude tags and categories
      serialize(item) {
        return {
          url: item.url,
          lastmod: item.lastmod || new Date().toISOString(),
          changefreq: this.getChangeFreq(item.url), // Dynamic change frequency
          priority: this.getPriority(item.url), // Dynamic priority
        };
      },
      customPages: [
        'https://www.jonathanmwaniki.co.ke/',
        'https://www.jonathanmwaniki.co.ke/about',
        'https://www.jonathanmwaniki.co.ke/contact'
      ]
    })
  ],
  markdown: { 
    syntaxHighlight: 'prism',
    shikiConfig: {
      theme: 'github-dark'
    }
  },
  trailingSlash: 'ignore',
  vite: {
    plugins: [
      {
        name: 'noindex-tag-pages',
        transform(code, id) {
          if (id.includes('tags/') || id.includes('category/')) {
            return code.replace(
              /<Layout(.*?)>/,
              `<Layout$1 meta={[{ name: 'robots', content: 'noindex, follow' }, ...(props.meta || [])]}>`
            );
          }
          return code;
        }
      }
    ]
  }
});

// Helper functions for dynamic sitemap values
function getChangeFreq(url) {
  if (url === '/') return 'hourly';
  if (url.includes('/posts/')) return 'daily';
  return 'weekly';
}

function getPriority(url) {
  if (url === '/') return 1.0;
  if (url.includes('/posts/')) return 0.9;
  if (url.includes('/about') || url.includes('/contact')) return 0.8;
  return 0.7;
}