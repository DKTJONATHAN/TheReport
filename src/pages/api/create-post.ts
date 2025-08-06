import { type APIRoute } from "astro";

export const post: APIRoute = async ({ request }) => {
  // Verify password
  const formData = await request.formData();
  if (formData.get("password") !== "admin123") {
    return new Response("Unauthorized", { status: 401 });
  }

  // Create slug from title
  const title = formData.get("title")?.toString() || "untitled";
  const slug = title
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, "-");

  // Format as markdown
  const content = `---
title: "${title}"
publishDate: "${new Date().toISOString()}"
draft: false
tags: []
---

${formData.get("content")}
`;

  // Save to GitHub (we'll implement this in Step 4)
  console.log("Would save:", { slug, content });

  return new Response(null, {
    status: 303,
    headers: { Location: `/admin?password=admin123` }
  });
};