// Хранит все файлы калькулятора на телефоне, чтобы он открывался без интернета.
const CACHE = 'vektor-v1';
const FILES = [
  './',
  './index.html',
  './fonts.css',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png',
  "./fonts/GolosText-400-cyrillic.woff2",
  "./fonts/GolosText-400-latin.woff2",
  "./fonts/GolosText-500-cyrillic.woff2",
  "./fonts/GolosText-500-latin.woff2",
  "./fonts/GolosText-600-cyrillic.woff2",
  "./fonts/GolosText-600-latin.woff2",
  "./fonts/GolosText-700-cyrillic.woff2",
  "./fonts/GolosText-700-latin.woff2",
  "./fonts/PTMono-400-cyrillic.woff2",
  "./fonts/PTMono-400-latin.woff2",
  "./fonts/ShareTechMono-400-latin.woff2",
  "./fonts/Unbounded-600-cyrillic.woff2",
  "./fonts/Unbounded-600-latin.woff2",
  "./fonts/Unbounded-800-cyrillic.woff2",
  "./fonts/Unbounded-800-latin.woff2",
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request).catch(() => caches.match('./index.html')))
  );
});
