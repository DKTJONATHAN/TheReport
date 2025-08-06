// src/content/config.ts
import { defineCollection, z } from "astro:content";

function removeDupsAndLowerCase(array: string[]) {
  return [...new Set(array.map((str) => str.toLowerCase()))];
}

const titleSchema = z.string().min(1).max(60);

const baseSchema = z.object({
  title: titleSchema,
  // Simplified slug handling
  slug: z.string().optional()
});

const post = defineCollection({
  schema: ({ image }) =>
    baseSchema.extend({
      description: z.string().min(20).max(160),
      coverImage: z
        .object({
          alt: z.string(),
          src: image(),
        })
        .optional(),
      draft: z.boolean().default(false),
      ogImage: z.string().optional(),
      tags: z.array(z.string().min(1))
             .default([])
             .transform(removeDupsAndLowerCase),
      publishDate: z.coerce.date({ required_error: "Publish date is required" }),
      updatedDate: z.coerce.date().optional(),
    }),
});

const note = defineCollection({
  schema: baseSchema.extend({
    description: z.string().max(120).optional(),
    publishDate: z.coerce.date({ required_error: "Publish date is required" }),
  }),
});

const tag = defineCollection({
  schema: baseSchema.extend({
    description: z.string().optional(),
  }),
});

// Remove the security collection if you're not using it
export const collections = {
  post,
  note,
  tag,
};