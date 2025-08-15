const CACHE_NAME = 'news-cache-v1';
const urlsToCache = [
  '/',
  '/styles.css',
  '/logo.png',
  '/default-og-image.jpg',
  '/author-jonathan-mwaniki.jpg',
  '/fonts/ReithSans.woff2',
  '/fonts/ReithSerif.woff2',
];

// Install event: Cache critical assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Activate event: Clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event: Serve from cache, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }
      return fetch(event.request).then(networkResponse => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      });
    })
  );
});

// Background Sync (for analytics or form submissions)
self.addEventListener('sync', event => {
  if (event.tag === 'sync-analytics') {
    event.waitUntil(
      // Simulate sending analytics data
      console.log('Background sync: Sending analytics data')
    );
  }
});