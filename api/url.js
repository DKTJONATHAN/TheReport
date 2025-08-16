import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

export default async function handler(req, res) {
  try {
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
    const auth = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/webmasters']
    });

    const searchconsole = google.searchconsole({ version: 'v1', auth });

    // Test different URL formats
    const urlsToTest = [
      'https://jonathanmwaniki.co.ke',
      'https://www.jonathanmwaniki.co.ke',
      'sc-domain:jonathanmwaniki.co.ke',
      'http://jonathanmwaniki.co.ke',
      'http://www.jonathanmwaniki.co.ke'
    ];

    const results = [];

    for (const siteUrl of urlsToTest) {
      try {
        const sitemaps = await searchconsole.sitemaps.list({ siteUrl });
        results.push({
          siteUrl,
          status: 'SUCCESS',
          sitemapCount: sitemaps.data.sitemap?.length || 0,
          sitemaps: sitemaps.data.sitemap?.map(s => s.path) || []
        });
      } catch (error) {
        results.push({
          siteUrl,
          status: 'ERROR',
          error: error.message,
          code: error.code
        });
      }
    }

    return res.json({
      success: true,
      message: 'Tested different URL formats',
      results,
      working_urls: results.filter(r => r.status === 'SUCCESS'),
      note: 'Use the working URL format in your API calls'
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}