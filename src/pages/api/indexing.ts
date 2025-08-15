import type { APIRoute } from 'astro';
import { google } from 'googleapis';

const DAILY_LIMIT = 200;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { urls = [], type = 'URL_UPDATED' } = await request.json();

    if (!urls.length) {
      return new Response(JSON.stringify({ 
        error: 'No URLs provided',
        hint: 'Include URLs array in request body'
      }), { status: 400 });
    }

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),  // Changed from import.meta.env
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const client = await auth.getClient();
    const indexing = google.indexing({ 
      version: 'v3',
      auth: client
    });

    const batch = urls.slice(0, DAILY_LIMIT);
    const results = await Promise.all(
      batch.map(async url => {
        try {
          const res = await indexing.urlNotifications.publish({
            requestBody: { url, type }
          });
          return { url, status: res.status, success: true };
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

    return new Response(JSON.stringify({
      success: true,
      limit: DAILY_LIMIT,
      processed: results.length,
      results
    }));

  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Indexing failed',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }), { status: 500 });
  }
};