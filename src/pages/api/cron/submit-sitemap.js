import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

export default async function handler(req, res) {
  // Verify this is a cron request
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // 1. Get fresh sitemap content
    const sitemapUrl = 'https://www.jonathanmwaniki.co.ke/sitemap-0.xml';
    const sitemapRes = await fetch(sitemapUrl);
    
    if (!sitemapRes.ok) {
      throw new Error(`Failed to fetch sitemap: ${sitemapRes.status}`);
    }

    const sitemapContent = await sitemapRes.text();

    // 2. Initialize auth
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
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
        siteUrl: 'https://www.jonathanmwaniki.co.ke',
        feedpath: '/sitemap-0.xml'
      });
    } catch (error) {
      console.log('No existing sitemap to delete');
    }

    await searchconsole.sitemaps.submit({
      siteUrl: 'https://www.jonathanmwaniki.co.ke',
      feedpath: '/sitemap-0.xml'
    });

    // 5. Extract and index new URLs
    const urls = extractUrlsFromSitemap(sitemapContent);
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    
    const newUrls = urls.filter(url => {
      // Adjust this logic based on your URL structure
      const urlDate = new Date(url.split('/').slice(-3).join('-'));
      return urlDate >= lastWeek;
    });

    // 6. Submit to Google Indexing API
    if (newUrls.length > 0) {
      const indexing = google.indexing({ 
        version: 'v3',
        auth: auth
      });

      const results = await Promise.all(
        newUrls.slice(0, 200).map(async url => {
          try {
            const result = await indexing.urlNotifications.publish({
              requestBody: { 
                url, 
                type: 'URL_UPDATED' 
              }
            });
            return { url, status: result.status, success: true };
          } catch (error) {
            return { 
              url, 
              status: error.code || 500, 
              error: error.message,
              success: false 
            };
          }
        })
      );

      return res.json({
        success: true,
        sitemap_updated: true,
        urls_in_sitemap: urls.length,
        new_urls_found: newUrls.length,
        new_urls_indexed: results.length,
        results
      });
    }

    return res.json({
      success: true,
      sitemap_updated: true,
      urls_in_sitemap: urls.length,
      new_urls_found: 0,
      new_urls_indexed: 0
    });

  } catch (error) {
    console.error('Cron job error:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

function extractUrlsFromSitemap(xmlContent) {
  const urlPattern = /<loc>(.*?)<\/loc>/g;
  const matches = xmlContent.match(urlPattern) || [];
  return matches.map(match => match.replace(/<\/?loc>/g, ''));
}