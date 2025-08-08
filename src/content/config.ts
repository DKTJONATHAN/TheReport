// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    author: z.string().optional().default("Jonathan Mwaniki"),
    image: z.string().url("Please provide a valid URL for the featured image").optional(),
    imageCaption: z.string().optional(),
    imageAlt: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false).optional(),
  }),
});

export const collections = {
  posts,
};