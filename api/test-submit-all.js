import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import { parseStringPromise } from 'xml2js';

export default async function handler(req, res) {
  try {
    // Fetch sitemap
    const sitemapUrl = 'https://jonathanmwaniki.co.ke/sitemap-0.xml';
    const sitemapRes = await fetch(sitemapUrl);
    if (!sitemapRes.ok) {
      throw new Error(`Failed to fetch sitemap: ${sitemapRes.status}`);
    }
    const sitemapContent = await sitemapRes.text();

    // Setup auth
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
    const auth = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: [
        'https://www.googleapis.com/auth/webmasters',
        'https://www.googleapis.com/auth/indexing'
      ]
    });

    // Initialize APIs
    const searchconsole = google.searchconsole({ version: 'v1', auth });
    const indexing = google.indexing({ version: 'v3', auth });

    // Submit sitemap first
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

    // Extract ALL post URLs (no date filtering)
    const result = await parseStringPromise(sitemapContent);
    const allUrls = result.urlset.url.map(entry => ({
      url: entry.loc[0],
      lastmod: entry.lastmod ? new Date(entry.lastmod[0]) : null
    }));

    // Filter for posts only
    const postUrls = allUrls
      .filter(entry => entry.url.includes('/posts/'))
      .map(entry => entry.url)
      .slice(0, 5); // Test with first 5 posts only

    // Submit to Indexing API
    const results = [];
    for (const url of postUrls) {
      try {
        const result = await indexing.urlNotifications.publish({
          requestBody: { url, type: 'URL_UPDATED' }
        });
        console.log('✅ Successfully submitted:', url);
        results.push({ url, status: result.status, success: true });
        
        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.log('❌ Failed to submit:', url, error.message);
        results.push({ url, status: error.code || 500, error: error.message, success: false });
      }
    }

    return res.json({
      success: true,
      message: 'Test submission completed!',
      sitemap_submitted: true,
      posts_submitted: results.length,
      results: results,
      note: 'Check Google Search Console in 10-15 minutes to see the submissions'
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}