import { defineCollection, z } from 'astro:content';

const notes = defineCollection({
  schema: z.object({
    pubDate: z.union([
      z.date(),
      z.string().transform(str => new Date(str))
    ]).refine(date => !isNaN(date.getTime())),
    articleDate: z.date().optional().default(new Date())
  })
});

const posts = defineCollection({
  schema: z.object({
    pubDate: z.union([
      z.date(),
      z.string().transform(str => new Date(str))
    ]).refine(date => !isNaN(date.getTime())),
    articleDate: z.date().optional().default(new Date())
  })
});

export const collections = {
  posts,
  notes
};