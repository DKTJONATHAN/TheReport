import { defineCollection, z } from "astro:content";

function removeDupsAndLowerCase(array: string[]) {
  if (!Array.isArray(array)) return [];
  return [...new Set(array.map((str) => str.toLowerCase()))];
}

const titleSchema = z.string().min(1).max(60);

const dateSchema = z.union([
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
  z.string().regex(/^[A-Za-z]{3} \d{1,2}, \d{4}$/), // MMM DD, YYYY
  z.string().regex(/^\d{1,2} [A-Za-z]{3} \d{4}$/), // DD MMM YYYY
  z.coerce.date()
]).transform((val) => {
  const date = new Date(val);
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date: ${val}`);
  }
  return date;
});

const basePostSchema = z.object({
  title: titleSchema,
  description: z.string().min(20).max(160),
  publishDate: dateSchema,
  updatedDate: dateSchema.optional(),
  draft: z.boolean().default(false),
  slug: z.string().optional()
});

const post = defineCollection({
  schema: ({ image }) =>
    basePostSchema.extend({
      coverImage: z.object({
        src: image(),
        alt: z.string()
      }).optional(),
      tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
      ogImage: z.string().optional()
    })
});

// Define other collections explicitly to prevent auto-generation
const note = defineCollection({
  schema: basePostSchema.omit({ coverImage: true, tags: true })
});

const tag = defineCollection({
  schema: z.object({
    title: titleSchema,
    description: z.string().optional()
  })
});

export const collections = {
  post,
  note,
  tag
};