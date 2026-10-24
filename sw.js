/**
 * MORBAGH - SERVICE WORKER (PWA)
 * Wear the Authentic Legacy | Indore, Madhya Pradesh
 * Version: 1.0.0
 * Strategy: Intelligent Offline Caching with Stale-While-Revalidate & Network Fallback
 */

const CACHE_NAME = 'morbagh-pwa-v1.0.0';

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/styles.css',
  './js/data.js',
  './js/app.js',
  './images/logo.jpeg',
  './images/icons/icon-192x192.png',
  './images/icons/icon-512x512.png',
  './images/icons/icon-maskable-192x192.png',
  './images/icons/icon-maskable-512x512.png',
  './images/icons/apple-touch-icon.png',
  './images/icons/favicon-32x32.png',
  './images/icons/favicon-16x16.png',
  // Key catalog photos
  './images/farsi-set-outdoor.jpeg',
  './images/farsi-pink-flatlay.jpeg',
  './images/farsi-cuff-detail.jpeg',
  './images/ira-asymmetric-kurti.jpeg',
  './images/ira-indigo-closeup.jpeg',
  './images/ira-duo-casual.jpeg',
  './images/farshi-suits-twinning.jpeg',
  './images/farshi-suits-candid.jpeg',
  './images/ivory-blue-vest-flatlay.jpeg',
  './images/everyday-work-kurti.jpeg',
  './images/sleeveless-asymmetric-kurti.jpeg',
  './images/navy-floral-suit-flatlay.jpeg',
  './images/magenta-floral-kurti-flatlay.jpeg',
  './images/olive-coral-kurti-flatlay.jpeg',
  './images/olive-coral-kurti-outdoor.jpeg',
  './images/sage-green-suit-outdoor.jpeg'
];

// 1. INSTALL EVENT - Pre-cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Pre-caching Morbagh assets');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
      .catch((err) => {
        console.warn('[Service Worker] Pre-cache warning:', err);
      })
  );
});

// 2. ACTIVATE EVENT - Clean up outdated caches & claim clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache:', name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. FETCH EVENT - Smart caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignore non-GET and chrome-extension / non-http requests
  if (request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // Strategy A: HTML Navigation Requests (Network First with Cache Fallback)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(request);
          if (cachedResponse) return cachedResponse;
          // Fallback to cached index.html
          return caches.match('./index.html') || caches.match('/');
        })
    );
    return;
  }

  // Strategy B: Google Fonts & Static CDNs (Stale-While-Revalidate)
  if (url.origin.includes('fonts.googleapis.com') || url.origin.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          const fetchPromise = fetch(request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => cachedResponse);

          return cachedResponse || fetchPromise;
        });
      })
    );
    return;
  }

  // Strategy C: Local Images & Media (Cache First with Network Fallback)
  if (request.destination === 'image' || url.pathname.match(/\.(jpeg|jpg|png|webp|svg|ico)$/i)) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;

        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        }).catch(() => {
          // Fallback placeholder or icon if image fails
          return caches.match('./images/logo.jpeg');
        });
      })
    );
    return;
  }

  // Strategy D: Scripts, Stylesheets & Data (Stale-While-Revalidate)
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
        }
        return networkResponse;
      }).catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
