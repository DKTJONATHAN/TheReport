import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/static';
import { statSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { glob } from 'glob'; // For batch file processing

// Helper: Get last Git commit date (or fallback to filesystem mtime)
const getLastmod = (filePath) => {
  try {
    // Try Git first (more accurate)
    const gitDate = execSync(`git log -1 --pretty="%aI" -- "${filePath}"`).toString().trim();
    if (gitDate) return gitDate;
  } catch {}
  // Fallback to filesystem modified time
  return statSync(filePath).mtime.toISOString();
};

export default defineConfig({
  site: 'https://www.jonathanmwaniki.co.ke',
  output: 'static',
  adapter: vercel(),
  integrations: [
    mdx(),
    sitemap({
      canonicalURL: 'https://www.jonathanmwaniki.co.ke',
      entries: async () => {
        // Get all posts from src/content/posts/
        const postFiles = await glob('./src/content/posts/**/*.{md,mdx}');
        return postFiles.map((filePath) => {
          const urlPath = filePath
            .replace('./src/content/posts/', '/posts/')
            .replace(/\.(md|mdx)$/, '/');
          return {
            loc: urlPath,
            lastmod: getLastmod(filePath),
            changefreq: 'daily', // Default for news (adjust as needed)
            priority: 0.9,       // High priority for articles
          };
        });
      },
    }),
  ],
  markdown: { syntaxHighlight: 'prism' },
  trailingSlash: 'ignore',
});