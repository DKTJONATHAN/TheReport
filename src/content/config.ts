// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    // Required fields
    title: z.string()
      .min(10, "Title should be at least 10 characters long")
      .max(120, "Title should not exceed 120 characters"),
    
    description: z.string()
      .min(50, "Description should be at least 50 characters long")
      .max(200, "Description should not exceed 200 characters"),
    
    date: z.date()
      .describe("Publication date of the article"),
    
    // Optional fields with defaults
    author: z.string()
      .default("Jonathan Mwaniki")
      .describe("Author of the article"),
    
    // Image fields with validation
    image: image()
      .refine(img => img.width >= 1200, {
        message: "Featured image should be at least 1200px wide"
      })
      .optional()
      .describe("Featured image URL for the article"),
    
    imageCaption: z.string()
      .max(120, "Caption should not exceed 120 characters")
      .optional()
      .describe("Caption for the featured image"),
    
    imageAlt: z.string()
      .max(120, "Alt text should not exceed 120 characters")
      .optional()
      .describe("Alternative text for the featured image"),
    
    // Category and tags
    category: z.string()
      .max(30, "Category should not exceed 30 characters")
      .optional()
      .describe("Primary category for the article"),
    
    tags: z.array(
      z.string()
        .max(20, "Each tag should not exceed 20 characters")
        .regex(/^[a-zA-Z0-9\s]+$/, "Tags should only contain letters, numbers and spaces")
    )
    .max(5, "Maximum of 5 tags allowed")
    .default([])
    .describe("Tags for categorizing the article"),
    
    // Flags
    featured: z.boolean()
      .default(false)
      .describe("Whether this post should be featured prominently"),
    
    draft: z.boolean()
      .default(false)
      .describe("Whether this post is a draft and should not be published"),
    
    // SEO fields (optional)
    seoTitle: z.string()
      .max(60, "SEO title should not exceed 60 characters")
      .optional()
      .describe("Custom SEO title (defaults to article title)"),
    
    seoDescription: z.string()
      .max(160, "SEO description should not exceed 160 characters")
      .optional()
      .describe("Custom SEO description (defaults to article description)"),
  })
});

export const collections = {
  posts,
};