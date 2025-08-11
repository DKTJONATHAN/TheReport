import type { APIRoute } from 'astro';
import { google } from 'googleapis';

// Google's daily limit (approx 200 URLs/day)
const DAILY_LIMIT = 50;

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
      credentials: JSON.parse(import.meta.env.GOOGLE_CREDENTIALS),
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const indexing = google.indexing({ 
      version: 'v3', 
      auth: await auth.getClient() 
    });

    // Process within daily limits
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
      stack: import.meta.env.DEV ? error.stack : undefined
    }), { status: 500 });
  }
};