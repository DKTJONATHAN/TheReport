// /src/content/config.ts
import { z, defineCollection } from "astro:content";

const postsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    publishDate: z.date(),
    description: z.string().optional(),
    author: z.string().optional().default("Anonymous"),
    category: z.string().optional(),
    tags: z.array(z.string()).optional().default([]),
    featured: z.boolean().optional().default(false),
    draft: z.boolean().optional().default(false),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }).optional(),
  }),
});

export const collections = {
  posts: postsCollection,
};