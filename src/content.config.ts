// src/content/config.ts
import { defineCollection, z } from "astro:content";
import { rssSchema } from "@astrojs/rss";

function removeDupsAndLowerCase(array: string[]) {
  return [...new Set(array.map((str) => str.toLowerCase()))];
}

const titleSchema = z.string().min(1).max(60);

const baseSchema = z.object({
  title: titleSchema,
  // Ensure slug exists either from frontmatter or filename
  slug: z.string().optional().transform((val, ctx) => {
    if (val) return val;
    // Fallback to auto-generated from filename
    const filename = ctx.path.split('/').pop();
    if (!filename) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Could not generate slug from filename",
      });
      return z.NEVER;
    }
    return filename.replace(/\.mdx?$/, '');
  }),
});

const post = defineCollection({
  schema: ({ image }) =>
    baseSchema.extend({
      description: z.string().min(20).max(160),
      coverImage: z
        .object({
          alt: z.string(),
          src: image(),
          credit: z.string().optional(),
        })
        .optional(),
      draft: z.boolean().default(false),
      ogImage: image().optional(),
      tags: z.array(z.string().min(1))
             .default([])
             .transform(removeDupsAndLowerCase),
      publishDate: z.coerce.date({ required_error: "Publish date is required" }),
      updatedDate: z.coerce.date().optional(),
      // SEO fields
      canonicalUrl: z.string().url().optional(),
    }),
});

const note = defineCollection({
  schema: baseSchema.extend({
    description: z.string().max(120).optional(),
    publishDate: z.coerce.date({ required_error: "Publish date is required" }),
    mood: z.enum(["happy", "neutral", "sad"]).optional(),
  }),
});

const tag = defineCollection({
  schema: baseSchema.extend({
    description: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

// Content Security
const security = defineCollection({
  schema: rssSchema.extend({
    severity: z.enum(["low", "medium", "high"]),
  }),
});

export const collections = {
  post,
  note,
  tag,
  security,
};