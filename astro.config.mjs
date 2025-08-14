import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/static';
import { statSync } from 'node:fs';
import { execSync } from 'node:child_process';
import pkg from 'glob';
const { glob } = pkg;  // Proper CommonJS destructuring

export default defineConfig({
  site: 'https://www.jonathanmwaniki.co.ke',
  output: 'static',
  adapter: vercel(),
  integrations: [
    mdx(),
    sitemap({
      canonicalURL: 'https://www.jonathanmwaniki.co.ke',
      entries: async () => {
        const postFiles = await glob('./src/content/posts/**/*.{md,mdx}');
        return postFiles.map((filePath) => ({
          loc: filePath
            .replace('./src/content/posts/', '/posts/')
            .replace(/\.(md|mdx)$/, '/'),
          lastmod: statSync(filePath).mtime.toISOString(),
          changefreq: 'daily',
          priority: 0.9,
        }));
      },
    }),
  ],
  markdown: { syntaxHighlight: 'prism' },
  trailingSlash: 'ignore',
});