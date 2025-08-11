import { google } from 'googleapis';

export const post = async ({ request }) => {
  try {
    const { url, type = 'URL_UPDATED' } = await request.json();

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(import.meta.env.GOOGLE_CREDENTIALS),
      scopes: ['https://www.googleapis.com/auth/indexing']
    });

    const indexing = google.indexing({ version: 'v3', auth });
    const response = await indexing.urlNotifications.publish({
      requestBody: { url, type }
    });

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }), {
      status: 500
    });
  }
};