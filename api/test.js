import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import { parseStringPromise } from 'xml2js';

export default async function handler(req, res) {
  try {
    // Test sitemap fetch
    const sitemapUrl = 'https://jonathanmwaniki.co.ke/sitemap-0.xml';
    const sitemapRes = await fetch(sitemapUrl);
    
    if (!sitemapRes.ok) {
      return res.status(500).json({ 
        error: `Failed to fetch sitemap: ${sitemapRes.status}`,
        step: 'sitemap_fetch' 
      });
    }

    const sitemapContent = await sitemapRes.text();

    // Test credentials
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
    
    // Test auth
    const auth = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: [
        'https://www.googleapis.com/auth/webmasters',
        'https://www.googleapis.com/auth/indexing'
      ]
    });

    // Test API initialization
    const searchconsole = google.searchconsole({ version: 'v1', auth });
    const indexing = google.indexing({ version: 'v3', auth });

    // Test sitemap parsing
    const result = await parseStringPromise(sitemapContent);
    const urls = result.urlset.url.map(entry => ({
      url: entry.loc[0],
      lastmod: entry.lastmod ? new Date(entry.lastmod[0]) : null
    }));

    return res.json({
      success: true,
      message: 'All GSC components working!',
      sitemap_urls: urls.length,
      recent_urls: urls.filter(entry => {
        if (!entry.lastmod) return false;
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        return entry.lastmod >= lastWeek;
      }).length,
      sample_url: urls[0]
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message,
      stack: error.stack
    });
  }
}