const CACHE_NAME = 'mindthekids-cache-v4';

const FLAG_CODES = [
  'GR', 'CY', 'IT', 'FR', 'DE', 'JP', 'GB', 'US', 'BR', 'ES', 'CH', 'SE',
  'CA', 'UA', 'FI', 'DK', 'NL', 'BE', 'AR', 'CN', 'IN', 'AU', 'AT', 'IE',
  'PT', 'NO', 'PL', 'RO', 'BG', 'TR', 'EG', 'ZA', 'KE', 'NG', 'MA', 'MX',
  'CU', 'JM', 'CL', 'CO', 'PE', 'UY', 'KR', 'TH', 'VN', 'ID', 'IL', 'NZ',
];

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/icons/icon.svg',
  '/css/style.css',
  '/js/main.js',
  '/js/i18n.js',
  '/js/audio.js',
  '/js/storage.js',
  '/js/flagsData.js',
  '/js/gamesPart1.js',
  '/js/gamesPart2.js',
  ...FLAG_CODES.map((c) => `/audio/el/${c}.mp3`),
  ...FLAG_CODES.map((c) => `/audio/en/${c}.mp3`),
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
          return null;
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        fetch(event.request)
          .then((netRes) => {
            if (netRes && netRes.status === 200) {
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, netRes));
            }
          })
          .catch(() => {});
        return cached;
      }

      return fetch(event.request)
        .then((netRes) => {
          if (netRes && netRes.status === 200) {
            const copy = netRes.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return netRes;
        })
        .catch(() => caches.match('/index.html'));
    })
  );
});
