import { JWT } from 'google-auth-library';

export default async function handler(req, res) {
  try {
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
    
    // Test basic JWT authentication without any Google APIs
    const auth = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/webmasters']
    });

    // Try to get an access token
    const accessToken = await auth.getAccessToken();

    return res.json({
      success: true,
      message: 'Service account authentication works',
      service_account: credentials.client_email,
      has_access_token: !!accessToken.token,
      token_type: typeof accessToken.token,
      scopes: ['https://www.googleapis.com/auth/webmasters']
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack,
      step: 'basic_auth_test'
    });
  }
}