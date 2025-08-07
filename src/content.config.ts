// /src/content.config.ts
import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Anonymous'),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }).optional(),
    // SEO fields
    canonical: z.string().url().optional(),
    noindex: z.boolean().default(false),
  }),
});

const note = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    brief: z.boolean().default(true),
  }),
});

// Also define the tag collection that's being auto-generated
const tag = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = {
  posts,
  note,
  tag,
};