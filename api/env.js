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

    // Test DOMAIN property format for DNS-verified domains
    const domainProperty = 'sc-domain:jonathanmwaniki.co.ke';
    
    try {
      const sitemaps = await searchconsole.sitemaps.list({
        siteUrl: domainProperty
      });
      
      return res.json({
        success: true,
        message: 'DNS domain property works!',
        property_format: domainProperty,
        sitemaps: sitemaps.data.sitemap || [],
        note: 'Use sc-domain: format for DNS-verified domains'
      });
      
    } catch (error) {
      return res.json({
        success: false,
        error: error.message,
        code: error.code,
        tested_format: domainProperty,
        suggestion: 'DNS-verified domains may need different property format'
      });
    }

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      step: 'domain_property_test'
    });
  }
}