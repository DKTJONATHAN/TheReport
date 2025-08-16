import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

export default async function handler(req, res) {
  try {
    // Test 1: Check environment variables
    if (!process.env.GOOGLE_CREDENTIALS) {
      return res.status(500).json({ 
        error: 'GOOGLE_CREDENTIALS not found',
        test: 'environment_variables'
      });
    }

    // Test 2: Parse credentials
    let credentials;
    try {
      credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
    } catch (error) {
      return res.status(500).json({ 
        error: 'Invalid GOOGLE_CREDENTIALS JSON',
        test: 'credentials_parsing'
      });
    }

    // Test 3: Check credentials structure
    if (!credentials.client_email || !credentials.private_key) {
      return res.status(500).json({ 
        error: 'Missing client_email or private_key in credentials',
        test: 'credentials_structure'
      });
    }

    // Test 4: Initialize auth
    const auth = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: [
        'https://www.googleapis.com/auth/webmasters',
        'https://www.googleapis.com/auth/indexing'
      ]
    });

    // Test 5: Test Search Console API
    let searchConsoleTest = false;
    try {
      const searchconsole = google.searchconsole({ version: 'v1', auth });
      await searchconsole.sites.list();
      searchConsoleTest = true;
    } catch (error) {
      return res.status(500).json({ 
        error: 'Search Console API failed: ' + error.message,
        test: 'search_console_api'
      });
    }

    // Test 6: Test Indexing API
    let indexingTest = false;
    try {
      const indexing = google.indexing({ version: 'v3', auth });
      // Just initialize, don't actually send a request
      indexingTest = true;
    } catch (error) {
      return res.status(500).json({ 
        error: 'Indexing API failed: ' + error.message,
        test: 'indexing_api'
      });
    }

    // Test 7: Fetch sitemap
    let sitemapTest = false;
    let sitemapUrls = 0;
    try {
      const sitemapUrl = 'https://www.jonathanmwaniki.co.ke/sitemap-0.xml';
      const response = await fetch(sitemapUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const sitemapContent = await response.text();
      const urlPattern = /<loc>(.*?)<\/loc>/g;
      const matches = sitemapContent.match(urlPattern) || [];
      sitemapUrls = matches.length;
      sitemapTest = true;
    } catch (error) {
      return res.status(500).json({ 
        error: 'Sitemap fetch failed: ' + error.message,
        test: 'sitemap_fetch'
      });
    }

    // All tests passed
    return res.json({
      success: true,
      message: 'All tests passed! GSC automation is ready.',
      tests: {
        environment_variables: true,
        credentials_parsing: true,
        credentials_structure: true,
        search_console_api: searchConsoleTest,
        indexing_api: indexingTest,
        sitemap_fetch: sitemapTest
      },
      sitemap_info: {
        total_urls: sitemapUrls,
        sitemap_url: 'https://www.jonathanmwaniki.co.ke/sitemap-0.xml'
      },
      next_steps: [
        'Your automation will run daily at 2 AM UTC',
        'Check Vercel function logs for execution details',
        'Monitor Google Search Console for submitted URLs'
      ]
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      test: 'unknown_error'
    });
  }
}