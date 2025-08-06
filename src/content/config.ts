import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  schema: z.object({
    // Required fields
    title: z.string(),
    pubDate: z.union([z.string(), z.date()]).transform(val => new Date(val)),
    // Optional fields with maximum flexibility
    description: z.string().optional(),
    author: z.string().optional(),
    tags: z.array(z.string()).default([]),
    
    // Flexible image handling - accepts any string (path or URL)
    image: z.union([
      z.string(),
      z.object({
        src: z.string(),
        alt: z.string().optional(),
        width: z.number().optional(),
        height: z.number().optional()
      })
    ]).optional(),
    
    // Catch-all for any custom frontmatter
    extra: z.record(z.any()).optional()
  })
});

export const collections = {
  posts
};