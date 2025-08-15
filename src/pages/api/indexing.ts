import type { APIRoute } from 'astro';
import { google } from 'googleapis';

// Configuration
const DAILY_LIMIT = 200; // Google's actual daily limit
const SITEMAP_URL = 'https://www.jonathanmwaniki.co.ke/sitemap-0.xml';

export const POST: APIRoute = async () => {
  try {
    // 1. Fetch sitemap
    const sitemapRes = await fetch(SITEMAP_URL);
    if (!sitemapRes.ok) throw new Error(`Failed to fetch sitemap: ${sitemapRes.status}`);
    const sitemapContent = await sitemapRes.text();

    // 2. Extract URLs from sitemap
    const urls = extractUrlsFromSitemap(sitemapContent);
    if (!urls.length) throw new Error('No URLs found in sitemap');

    // 3. Authenticate with Google
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(import.meta.env.GOOGLE_CREDENTIALS),
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });
    const indexing = google.indexing({ version: 'v3', auth: await auth.getClient() });

    // 4. Submit URLs in batches
    const results = [];
    const batch = urls.slice(0, DAILY_LIMIT);
    
    for (const url of batch) {
      try {
        const res = await indexing.urlNotifications.publish({
          requestBody: { url, type: 'URL_UPDATED' }
        });
        results.push({ url, status: res.status, success: true });
        await new Promise(resolve => setTimeout(resolve, 500)); // Rate limiting
      } catch (error) {
        results.push({
          url,
          status: error.code || 500,
          error: error.message,
          success: false
        });
      }
    }

    return new Response(JSON.stringify({
      success: true,
      sitemap: SITEMAP_URL,
      urls_found: urls.length,
      urls_processed: results.length,
      results
    }));

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      sitemap: SITEMAP_URL,
      stack: import.meta.env.DEV ? error.stack : undefined
    }), { status: 500 });
  }
};

// Helper to extract URLs from sitemap XML
function extractUrlsFromSitemap(xmlContent: string): string[] {
  const urlMatches = xmlContent.match(/<loc>(.*?)<\/loc>/g) || [];
  return urlMatches.map(url => url.replace(/<\/?loc>/g, ''));
}