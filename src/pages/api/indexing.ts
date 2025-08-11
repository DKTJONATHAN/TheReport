import { google } from 'googleapis';

export async function post({ request }) {
  const { url } = await request.json();

  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(import.meta.env.GOOGLE_CREDENTIALS),
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });

  const indexing = google.indexing({ version: 'v3', auth });

  const response = await indexing.urlNotifications.publish({
    requestBody: { url, type: 'URL_UPDATED' },
  });

  return new Response(JSON.stringify(response.data), { status: 200 });
}