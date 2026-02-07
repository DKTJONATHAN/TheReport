import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  schema: z.object({
    title: z.string(),

    // RESTORED: Your original flexible date logic
    date: z.string().or(z.date()).transform((val) => new Date(val)),

    // SEO Tip: Keep description validation to avoid truncation in search results
    description: z.string().max(160, "Description allows max 160 chars for SEO"),

    author: z.string().default("Jonathan Mwaniki"),

    image: z.string().optional(),
    imageAlt: z.string().optional(),
    imageCaption: z.string().optional(),

    category: z.string().default("General"),
    tags: z.array(z.string()).default([]),

    // Defaults prevent build errors if these are missing in frontmatter
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  posts: postsCollection,
};