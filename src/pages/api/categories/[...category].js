// Note: This is a simplified implementation assuming categories are derived from posts
// For a proper category management system, consider using a database or JSON file
export async function POST({ request }) {
  const { name } = await request.json();
  // For simplicity, we assume adding a category means ensuring it's valid for posts
  // In a real system, store categories in a separate collection or database
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function DELETE({ params, request }) {
  const category = params.category;
  const posts = await getCollection('posts');
  const hasPosts = posts.some(post => post.data.category === category);
  if (hasPosts) {
    return new Response(JSON.stringify({ error: 'Cannot delete category with associated posts' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  // In a real system, remove the category from storage
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
