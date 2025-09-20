
const CACHE_VERSION = 'v3';
const CACHE_NAME = `kingley-cache-${CACHE_VERSION}`;

// On install, the service worker will take over the page immediately.
self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});

// On activation, it will clean up old caches and take control of all open clients.
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// The fetch handler uses a network-first strategy.
self.addEventListener('fetch', event => {
  // We only cache GET requests.
  if (event.request.method !== 'GET') {
    return;
  }
  
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // If the network request is successful, cache the response and return it.
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });
        return response;
      })
      .catch(() => {
        // If the network fails (offline), try to serve the response from the cache.
        return caches.match(event.request).then(response => {
          // If we find it in the cache, return it. Otherwise, the request will fail.
          return response;
        });
      })
  );
});
