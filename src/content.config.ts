// src/content/config.ts
import { defineCollection, z } from "astro:content";

function removeDupsAndLowerCase(array: string[]) {
  return [...new Set(array.map((str) => str.toLowerCase()))];
}

const titleSchema = z.string().min(1).max(60);

const post = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: titleSchema,
      slug: z.string().optional(),
      description: z.string().min(20).max(160),
      coverImage: z.object({
        alt: z.string(),
        src: image(),
      }).optional(),
      draft: z.boolean().default(false),
      tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
      publishDate: z.coerce.date(),
    }),
});

const tag = defineCollection({
  schema: z.object({
    title: titleSchema.optional(), // Make optional to match your image.md
    description: z.string().optional(),
  }),
});

export const collections = { post, tag };