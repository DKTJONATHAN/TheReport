import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.string().or(z.date()).transform((val) => new Date(val)),
    author: z.string().default('Anonymous'),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    image: z.object({
      src: z.string(),
      alt: z.string(),
      credit: z.string().optional(),
    }).optional(),
    draft: z.boolean().default(false),
  })
});

export const collections = { posts };