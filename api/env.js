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

    // Try to list ALL sites this service account has access to
    const sites = await searchconsole.sites.list();

    return res.json({
      success: true,
      service_account: credentials.client_email,
      accessible_sites: sites.data.siteEntry || [],
      total_sites: sites.data.siteEntry?.length || 0,
      raw_response: sites.data
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      code: error.code,
      service_account: JSON.parse(process.env.GOOGLE_CREDENTIALS).client_email
    });
  }
}