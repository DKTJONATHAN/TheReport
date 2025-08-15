import type { APIRoute } from 'astro';
import { google } from 'googleapis';

export const POST: APIRoute = async () => {
  try {
    // 1. Get fresh sitemap content
    const sitemapUrl = 'https://jonathanmwaniki.co.ke/sitemap-0.xml';
    const sitemapRes = await fetch(sitemapUrl);
    const sitemapContent = await sitemapRes.text();

    // 2. Submit to Google Search Console
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(import.meta.env.GOOGLE_CREDENTIALS),
      scopes: ['https://www.googleapis.com/auth/webmasters']
    });

    const searchconsole = google.searchconsole({ 
      version: 'v1', 
      auth: await auth.getClient() 
    });

    // Delete old sitemap first
    await searchconsole.sitemaps.delete({
      siteUrl: 'https://jonathanmwaniki.co.ke',
      feedpath: '/sitemap-0.xml'
    }).catch(() => {}); // Ignore if not exists

    // Submit new sitemap
    await searchconsole.sitemaps.submit({
      siteUrl: 'https://jonathanmwaniki.co.ke',
      feedpath: '/sitemap-0.xml'
    });

    // 3. Find today's new URLs (example logic)
    const today = new Date().toISOString().split('T')[0];
    const newUrls = extractUrlsFromSitemap(sitemapContent)
      .filter(url => url.includes(today));

    // 4. Index new URLs
    if (newUrls.length > 0) {
      await fetch(`${import.meta.env.SITE_URL}/api/indexing`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls: newUrls.slice(0, 50) }) // Google's daily limit
      });
    }

    return new Response(JSON.stringify({
      success: true,
      sitemap_updated: true,
      new_urls_indexed: newUrls.length
    }));

  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Submission failed',
      details: error.message
    }), { status: 500 });
  }
};

// Helper function (add to separate utils file if preferred)
function extractUrlsFromSitemap(xmlContent: string): string[] {
  const urlPattern = /<loc>(.*?)<\/loc>/g;
  const matches = xmlContent.match(urlPattern) || [];
  return matches.map(match => match.replace(/<\/?loc>/g, ''));
}