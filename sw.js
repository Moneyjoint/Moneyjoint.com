const CACHE_NAME = 'money-joint-v2';
const ASSETS = [
  './',
  './index.html',
  './learning.html',
  './lessons.html',
  './quiz.html',
  './donate.html',
  './start-trading.html',
  './community.html',
  './nav.css',
  './style.css',
  './style.css',
  './logo.png',
  './logo64.png',
  './favicon.png',
  './app_icon.png',
  './app_icon_192.png',
  './app_icon_512.png',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).then((response) => {
        // Optional: cache new requests
        return response;
      }).catch(() => {
        // Offline fallback
        if (event.request.destination === 'document') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
