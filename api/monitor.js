import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

export default async function handler(req, res) {
  try {
    // Setup auth
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
    const auth = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/webmasters']
    });

    const searchconsole = google.searchconsole({ version: 'v1', auth });

    // Check sitemap status
    const sitemaps = await searchconsole.sitemaps.list({
      siteUrl: 'https://www.jonathanmwaniki.co.ke'
    });

    // Check specific URL indexing status (example with your homepage)
    const urlInspection = await searchconsole.urlInspection.index.inspect({
      requestBody: {
        inspectionUrl: 'https://www.jonathanmwaniki.co.ke/',
        siteUrl: 'https://www.jonathanmwaniki.co.ke'
      }
    });

    return res.json({
      success: true,
      timestamp: new Date().toISOString(),
      sitemap_status: {
        total_sitemaps: sitemaps.data.sitemap?.length || 0,
        sitemaps: sitemaps.data.sitemap?.map(s => ({
          path: s.path,
          lastSubmitted: s.lastSubmitted,
          lastDownloaded: s.lastDownloaded,
          isPending: s.isPending,
          isSitemapsIndex: s.isSitemapsIndex
        })) || []
      },
      url_inspection_sample: {
        inspectionUrl: urlInspection.data.inspectionResult?.inspectionUrl,
        indexStatusResult: {
          verdict: urlInspection.data.inspectionResult?.indexStatusResult?.verdict,
          lastCrawlTime: urlInspection.data.inspectionResult?.indexStatusResult?.lastCrawlTime,
          pageFetchState: urlInspection.data.inspectionResult?.indexStatusResult?.pageFetchState
        }
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      code: error.code
    });
  }
}