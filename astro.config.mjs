// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://jonathanmwaniki.co.ke',
  markdown: {
    // Minimal markdown config that only affects frontmatter
    frontmatter: {
      // Ensure all frontmatter keys are preserved
      strict: false,
      // Allow any custom frontmatter fields
      schema: {}
    },
    // Disable all content transformations
    remarkPlugins: [],
    rehypePlugins: [],
    syntaxHighlight: false,
    gfm: false
  }
});