import { type APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  // 1. Verify password from environment variable
  const authHeader = request.headers.get("Authorization");
  if (authHeader !== `Bearer ${import.meta.env.ADMIN_PASSWORD}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  // 2. Process content
  const { content } = await request.json();
  console.log("New post content:", content); // For debugging

  // 3. Here you would add GitHub saving logic later
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};