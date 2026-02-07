import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    // Accepts "2024-02-07" (string) or standard date objects
    date: z.coerce.date(), 
    
    // SEO: Google prefers updated dates for news
    updatedDate: z.coerce.date().optional(),

    // SEO: Warns if description is too long (Google truncates ~160 chars)
    description: z.string().max(160, "Description allows max 160 chars for SEO"),

    author: z.string().default("Jonathan Mwaniki"),

    // Images
    image: z.string().optional(), // If using local images later, change to: image()
    imageAlt: z.string().optional(),
    imageCaption: z.string().optional(),

    // Taxonomy
    category: z.string().default("General"),
    tags: z.array(z.string()).default([]),

    // Status
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  posts: postsCollection,
};