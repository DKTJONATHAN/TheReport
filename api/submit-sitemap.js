import type { APIRoute } from 'astro';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

export const POST: APIRoute = async () => {
  try {
    // 1. Get fresh sitemap content
    const sitemapUrl = 'https://jonathanmwaniki.co.ke/sitemap-0.xml';
    const sitemapRes = await fetch(sitemapUrl);
    
    if (!sitemapRes.ok) {
      throw new Error(`Failed to fetch sitemap: ${sitemapRes.status}`);
    }
    
    const sitemapContent = await sitemapRes.text();

    // 2. Initialize auth with proper typing
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS!);
    const auth = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/webmasters']
    });

    // 3. Initialize Search Console client
    const searchconsole = google.searchconsole({ 
      version: 'v1', 
      auth: auth
    });

    // 4. Update sitemap in Search Console
    try {
      await searchconsole.sitemaps.delete({
        siteUrl: 'https://jonathanmwaniki.co.ke',
        feedpath: '/sitemap-0.xml'
      });
    } catch (error) {
      console.log('No existing sitemap to delete');
    }

    await searchconsole.sitemaps.submit({
      siteUrl: 'https://jonathanmwaniki.co.ke',
      feedpath: '/sitemap-0.xml'
    });

    // 5. Find new URLs (improved date matching)
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    const newUrls = extractUrlsFromSitemap(sitemapContent).filter(url => {
      const urlDate = new Date(url.split('/').slice(-3).join('-'));
      return urlDate >= lastWeek;
    });

    // 6. Index new URLs
    if (newUrls.length > 0) {
      await fetch(`${process.env.SITE_URL}/api/indexing`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls: newUrls.slice(0, 200) }) // Google's actual daily limit
      });
    }

    return new Response(JSON.stringify({
      success: true,
      sitemap_updated: true,
      urls_in_sitemap: newUrls.length,
      new_urls_found: newUrls.length,
      new_urls_indexed: Math.min(newUrls.length, 200)
    }));

  } catch (error: any) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }), { status: 500 });
  }
};

function extractUrlsFromSitemap(xmlContent: string): string[] {
  const urlPattern = /<loc>(.*?)<\/loc>/g;
  const matches = xmlContent.match(urlPattern) || [];
  return matches.map(match => match.replace(/<\/?loc>/g, ''));
}
