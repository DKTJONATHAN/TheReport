// src/pages/rss.xml.js - Automatically proxies your rss.app feed
export async function get() {
  try {
    const response = await fetch('https://rss.app/feeds/QcLNMreXGcRH8ykn.xml', {
      headers: {
        'User-Agent': 'JonathanMwanikiBot/1.0 (https://www.jonathanmwaniki.co.ke)'
      }
    });
    
    if (!response.ok) {
      throw new Error('RSS feed unavailable');
    }
    
    const rssContent = await response.text();
    
    return {
      body: rssContent,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=1800, stale-while-revalidate=3600', // 30min cache
        'Access-Control-Allow-Origin': '*'
      }
    };
  } catch (error) {
    // Fallback RSS with error message
    const fallbackRss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Breaking News Kenya | Jonathan Mwaniki</title>
    <link>https://www.jonathanmwaniki.co.ke</link>
    <description>Latest breaking news from Kenya.</description>
    <item>
      <title>RSS Feed Temporarily Unavailable</title>
      <link>https://www.jonathanmwaniki.co.ke</link>
      <description>Feed service temporarily down. Check back soon or visit jonathanmwaniki.co.ke for latest news.</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>
  </channel>
</rss>`;
    
    return {
      body: fallbackRss,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8'
      }
    };
  }
}