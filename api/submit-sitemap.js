import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import { parseStringPromise } from 'xml2js';
import pino from 'pino';

const logger = pino();

export default async function handler(req, res) {
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Fetch sitemap
    const sitemapUrl = 'https://www.jonathanmwaniki.co.ke/sitemap-0.xml';
    const sitemapRes = await fetch(sitemapUrl);
    if (!sitemapRes.ok) {
      throw new Error(`Failed to fetch sitemap: ${sitemapRes.status}`);
    }
    const sitemapContent = await sitemapRes.text();

    // Validate credentials
    let credentials;
    try {
      credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
      if (!credentials.client_email || !credentials.private_key) {
        throw new Error('Missing client_email or private_key');
      }
    } catch (error) {
      logger.error({ error }, 'Invalid Google credentials');
      return res.status(500).json({ success: false, error: 'Invalid Google credentials' });
    }

    // Initialize auth
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

    // Update sitemap
    try {
      await searchconsole.sitemaps.delete({
        siteUrl: 'https://www.jonathanmwaniki.co.ke',
        feedpath: '/sitemap-0.xml'
      });
    } catch (error) {
      if (error.code !== 404) {
        logger.warn({ error }, 'Sitemap deletion failed');
      }
    }

    await searchconsole.sitemaps.submit({
      siteUrl: 'https://www.jonathanmwaniki.co.ke',
      feedpath: '/sitemap-0.xml'
    });

    // Extract and filter URLs
    const allUrls = await extractUrlsFromSitemap(sitemapContent);
    
    // Filter for POSTS ONLY
    const postUrls = allUrls.filter(entry => {
      return entry.url.includes('/posts/');
    });

    // Filter for recent posts (last 7 days)
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const newPostUrls = postUrls
      .filter(entry => entry.lastmod && entry.lastmod >= lastWeek)
      .map(entry => entry.url);

    // Submit to Indexing API
    let results = [];
    if (newPostUrls.length > 0) {
      results = await Promise.all(
        newPostUrls.slice(0, 200).map(async (url, index) => {
          try {
            const result = await indexing.urlNotifications.publish({
              requestBody: { url, type: 'URL_UPDATED' }
            });
            logger.info({ url }, 'Successfully indexed post');
            return { url, status: result.status, success: true };
          } catch (error) {
            if (error.code === 429) {
              await new Promise(resolve => setTimeout(resolve, 1000 * (index + 1)));
              return { url, status: 429, error: 'Rate limit exceeded', success: false };
            }
            logger.error({ error, url }, 'Indexing failed');
            return { url, status: error.code || 500, error: error.message, success: false };
          }
        })
      );
    }

    return res.json({
      success: true,
      sitemap_updated: true,
      total_urls_in_sitemap: allUrls.length,
      total_post_urls: postUrls.length,
      new_posts_found: newPostUrls.length,
      new_posts_indexed: results.length,
      results,
      filtered_out: {
        categories: allUrls.filter(entry => entry.url.includes('/category/')).length,
        tags: allUrls.filter(entry => entry.url.includes('/tags/')).length,
        pages: allUrls.filter(entry => !entry.url.includes('/posts/') && !entry.url.includes('/category/') && !entry.url.includes('/tags/')).length
      }
    });
  } catch (error) {
    logger.error({ error }, 'Cron job failed');
    return res.status(500).json({ success: false, error: error.message });
  }
}

async function extractUrlsFromSitemap(xmlContent) {
  try {
    const result = await parseStringPromise(xmlContent);
    return result.urlset.url.map(entry => ({
      url: entry.loc[0],
      lastmod: entry.lastmod ? new Date(entry.lastmod[0]) : null
    }));
  } catch (error) {
    throw new Error(`Failed to parse sitemap XML: ${error.message}`);
  }
}