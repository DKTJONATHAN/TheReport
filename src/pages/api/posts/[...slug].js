import { getCollection } from 'astro:content';
import fs from 'fs/promises';
import path from 'path';

export async function POST({ request }) {
  const formData = await request.formData();
  const title = formData.get('title');
  const category = formData.get('category') === 'new' ? formData.get('new-category') : formData.get('category');
  const description = formData.get('description');
  const content = formData.get('content');
  const image = formData.get('image');
  const imageAlt = formData.get('imageAlt');
  const date = formData.get('date');
  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  let imagePath = '';
  if (image && image.size > 0) {
    const filePath = path.join(process.cwd(), 'public', 'uploads', `${slug}.${image.name.split('.').pop()}`);
    await fs.writeFile(filePath, Buffer.from(await image.arrayBuffer()));
    imagePath = `/uploads/${slug}.${image.name.split('.').pop()}`;
  }

  const postContent = `---
title: ${title}
category: ${category}
description: ${description || ''}
image: ${imagePath}
imageAlt: ${imageAlt || ''}
date: ${date}
---
${content}
`;
  await fs.writeFile(path.join(process.cwd(), 'src', 'content', 'posts', `${slug}.md`), postContent);

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}

export async function PUT({ request, params }) {
  const formData = await request.formData();
  const slug = params.slug;
  const title = formData.get('title');
  const category = formData.get('category') === 'new' ? formData.get('new-category') : formData.get('category');
  const description = formData.get('description');
  const content = formData.get('content');
  const image = formData.get('image');
  const imageAlt = formData.get('imageAlt');
  const date = formData.get('date');

  const posts = await getCollection('posts');
  const post = posts.find(p => p.slug === slug);
  if (!post) {
    return new Response(JSON.stringify({ error: 'Post not found' }), { status: 404 });
  }

  let imagePath = post.data.image || '';
  if (image && image.size > 0) {
    const filePath = path.join(process.cwd(), 'public', 'uploads', `${slug}.${image.name.split('.').pop()}`);
    await fs.writeFile(filePath, Buffer.from(await image.arrayBuffer()));
    imagePath = `/uploads/${slug}.${image.name.split('.').pop()}`;
  }

  const postContent = `---
title: ${title}
category: ${category}
description: ${description || ''}
image: ${imagePath}
imageAlt: ${imageAlt || ''}
date: ${date}
---
${content}
`;
  await fs.writeFile(path.join(process.cwd(), 'src', 'content', 'posts', `${slug}.md`), postContent);

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}

export async function DELETE({ params }) {
  const slug = params.slug;
  try {
    await fs.unlink(path.join(process.cwd(), 'src', 'content', 'posts', `${slug}.md`));
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Post not found' }), { status: 404 });
  }
}