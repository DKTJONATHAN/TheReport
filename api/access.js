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

    // Test 1: List all sites the service account has access to
    const sites = await searchconsole.sites.list();

    return res.json({
      success: true,
      service_account: credentials.client_email,
      sites_with_access: sites.data.siteEntry || [],
      total_sites: sites.data.siteEntry?.length || 0,
      note: "If this list is empty, the service account hasn't been added to any GSC properties"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      code: error.code,
      service_account: JSON.parse(process.env.GOOGLE_CREDENTIALS).client_email,
      troubleshooting: {
        check_1: "Is gsc-automation@jonathanmwaniki.iam.gserviceaccount.com added to GSC?",
        check_2: "Is Google Search Console API enabled in Google Cloud?",
        check_3: "Does the service account have Owner permission in GSC?"
      }
    });
  }
}