const CACHE_NAME = 'mindthekids-cache-v12';

const FLAG_CODES = [
  'GR', 'CY', 'IT', 'FR', 'DE', 'JP', 'GB', 'US', 'BR', 'ES', 'CH', 'SE',
  'CA', 'UA', 'FI', 'DK', 'NL', 'BE', 'AR', 'CN', 'IN', 'AU', 'AT', 'IE',
  'PT', 'NO', 'PL', 'RO', 'BG', 'TR', 'EG', 'ZA', 'KE', 'NG', 'MA', 'MX',
  'CU', 'JM', 'CL', 'CO', 'PE', 'UY', 'KR', 'TH', 'VN', 'ID', 'IL', 'NZ',
  'AL', 'AD', 'BY', 'BA', 'HR', 'CZ', 'EE', 'HU', 'IS', 'LV', 'LI', 'LT',
  'LU', 'MT', 'MD', 'MC', 'ME', 'MK', 'RU', 'SM', 'RS', 'SK', 'SI', 'AG',
  'BS', 'BB', 'BZ', 'BO', 'CR', 'DM', 'DO', 'EC', 'SV', 'GD', 'GT', 'GY',
  'HT', 'HN', 'NI', 'PA', 'PY', 'KN', 'LC', 'VC', 'SR', 'TT', 'VE', 'AF',
  'AM', 'AZ', 'BH', 'BD', 'BT', 'BN', 'KH', 'GE', 'IR', 'IQ', 'JO', 'KZ',
  'KW', 'KG', 'LA', 'LB', 'MY', 'MV', 'MN', 'MM', 'NP', 'KP', 'OM', 'PK',
  'PH', 'QA', 'SA', 'SG', 'LK', 'SY', 'TJ', 'TL', 'TM', 'AE', 'UZ', 'YE',
  'DZ', 'AO', 'BJ', 'BW', 'BF', 'BI', 'CV', 'CM', 'CF', 'TD', 'KM', 'CG',
  'CD', 'CI', 'DJ', 'GQ', 'ER', 'SZ', 'ET', 'GA', 'GM', 'GH', 'GN', 'GW',
  'LS', 'LR', 'LY', 'MG', 'MW', 'ML', 'MR', 'MU', 'MZ', 'NA', 'NE', 'RW',
  'ST', 'SN', 'SC', 'SL', 'SO', 'SS', 'SD', 'TZ', 'TG', 'TN', 'UG', 'ZM',
  'ZW', 'FJ', 'KI', 'MH', 'FM', 'NR', 'PW', 'PG', 'WS', 'SB', 'TO', 'TV',
  'VU',
];

const GAME_IDS = [
  'memoryPairs', 'sequenceMemory', 'melodyMemory', 'flagsWorld',
  'targetTap', 'whackAMole', 'schulteTable', 'emojiMahjong',
  'numberMatch', 'visualMath', 'colorSudoku', 'marbleJump',
  'patternTrain', 'oddOneOut', 'towerHanoi', 'mazeExplorer',
  'mentalRotation', 'shapeSorting', 'patternCopy',
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
  ...GAME_IDS.map((id) => `/audio/help-el/${id}.mp3`),
  ...GAME_IDS.map((id) => `/audio/help-en/${id}.mp3`),
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(
        PRECACHE_ASSETS.map((url) =>
          fetch(url, { cache: 'reload' }).then((res) => {
            if (res.ok) return cache.put(url, res);
          })
        )
      )
    )
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
