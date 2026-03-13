// src/pages/api/revalidate.js
export const prerender = false;

export async function POST({ request }) {
  try {
    const { slug } = await request.json();

    // Revalidate specific post
    await fetch(`https://jonathanmwaniki.co.ke/api/revalidate?tag=posts-${slug}`, {
      method: 'POST',
      headers: { 'Cache-Control': 'no-cache' }
    });

    return new Response(JSON.stringify({ revalidated: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Revalidation failed' }), { status: 500 });
  }
}
