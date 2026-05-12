// src/pages/sitemap.xml.js
// Place this file at: src/pages/sitemap.xml.js
// This replaces the broken @astrojs/sitemap integration.

export const prerender = true;

const site = 'https://jonathanmwaniki.co.ke';

const staticPages = [
  '/',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/cookies',
  '/guidelines',
  '/search',
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map(
    (page) => `  <url>
    <loc>${site}${page}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

export async function GET() {
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
