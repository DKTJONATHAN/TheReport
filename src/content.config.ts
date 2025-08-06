import { defineCollection, z } from "astro:content";

function removeDupsAndLowerCase(array: string[]) {
  return [...new Set(array.map((str) => str.toLowerCase()))];
}

const titleSchema = z.string().min(1).max(60);

const flexibleDateSchema = z.union([
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "YYYY-MM-DD format"), // ISO format
  z.string().regex(/^[A-Za-z]{3} \d{1,2}, \d{4}$/, "MMM DD, YYYY format"), // "Aug 1, 2025"
  z.string().regex(/^\d{1,2} [A-Za-z]{3} \d{4}$/, "DD MMM YYYY format"), // "1 Aug 2025"
  z.coerce.date() // Fallback to Date constructor
]).transform((val) => {
  const date = new Date(val);
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date format: ${val}`);
  }
  return date;
});

const baseSchema = z.object({
  title: titleSchema,
  description: z.string().min(20).max(160),
  slug: z.string().optional()
});

const post = defineCollection({
  schema: ({ image }) =>
    baseSchema.extend({
      publishDate: flexibleDateSchema.describe("Required. Accepts: YYYY-MM-DD, MMM DD, YYYY, or DD MMM YYYY"),
      updatedDate: flexibleDateSchema.optional(),
      coverImage: z
        .object({
          alt: z.string().min(1),
          src: image()
        })
        .optional(),
      draft: z.boolean().default(false),
      ogImage: z.string().optional(),
      tags: z.array(z.string().min(1))
        .default([])
        .transform(removeDupsAndLowerCase)
    })
});

export const collections = {
  post
};