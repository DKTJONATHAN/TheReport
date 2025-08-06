import { type APIRoute } from "astro";

export const post: APIRoute = async ({ request, cookies }) => {
  const formData = await request.formData();
  
  // 1. Verify auth
  const authCookie = cookies.get('astro_admin');
  if (authCookie?.value !== "astro123") {
    return new Response("Unauthorized", { status: 401 });
  }

  // 2. Validate form
  const title = formData.get("title")?.toString() || "Untitled";
  const content = formData.get("content")?.toString() || "";

  // 3. Prepare markdown
  const markdownContent = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${new Date().toISOString()}"
---

${content}
`;

  // 4. Log for now (GitHub integration next)
  console.log("New post:", { title, content: markdownContent });

  return new Response(null, {
    status: 303,
    headers: { Location: "/admin" }
  });
};