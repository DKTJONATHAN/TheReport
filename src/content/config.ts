import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string(),
    author: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    imageCaption: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional()
  }),
});

export const collections = {
  posts: postsCollection,
};
