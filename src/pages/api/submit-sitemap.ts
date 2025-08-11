import { google } from 'googleapis';
import { parseStringPromise } from 'xml2js';

export const POST = async () => {
  try {
    // Fetch sitemap
    const sitemapUrl = 'https://jonathanmwaniki.co.ke/sitemap-index.xml';
    const response = await fetch(sitemapUrl);
    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch sitemap' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const sitemapXml = await response.text();
    const parsed = await parseStringPromise(sitemapXml);

    // Extract URLs (handle both sitemapindex and urlset formats)
    let urls = [];
    if (parsed.sitemapindex?.sitemap) {
      urls = parsed.sitemapindex.sitemap.map((entry) => entry.loc[0]);
    } else if (parsed.urlset?.url) {
      urls = parsed.urlset.url.map((entry) => entry.loc[0]);
    }

    if (!urls.length) {
      return new Response(JSON.stringify({ error: 'No URLs found in sitemap' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Process URLs here (add your logic for what to do with the URLs)
    // Example: submit to Google Search Console
    // const auth = new google.auth.GoogleAuth({...});
    // const searchconsole = google.searchconsole({...});
    // await searchconsole.urlInspection.index.inspect({...});

    return new Response(JSON.stringify({ success: true, urls }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error submitting sitemap:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};