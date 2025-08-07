import { getCollection } from 'astro:content';

export const GET = async () => {
  const posts = await getCollection('posts');
  
  const items = posts.map(post => `
    <item>
      <title>${post.data.title}</title>
      <link>https://jonathanmwaniki.co.ke/posts/${post.slug}</link>
      <description>${post.data.description}</description>
      <pubDate>${new Date(post.data.date).toUTCString()}</pubDate>
    </item>
  `).join('');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>The Mwaniki's Report</title>
        <link>https://jonathanmwaniki.co.ke</link>
        <description>Latest posts from Jonathan Mwaniki</description>
        ${items}
      </channel>
    </rss>`,
    {
      headers: {
        'Content-Type': 'application/xml'
      }
    }
  );
};