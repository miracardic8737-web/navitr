// Navitr Service Worker - Offline Cache
const CACHE = 'navitr-v2';  // versiyon artırıldı - eski cache temizlenir
const STATIC = [
  '/',
  '/index.html',
  '/app.js',
  '/style.css',
  'https://unpkg.com/maplibre-gl@4.1.3/dist/maplibre-gl.js',
  'https://unpkg.com/maplibre-gl@4.1.3/dist/maplibre-gl.css'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(STATIC)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Harita tile'larını cache'le (openfreemap, arcgis)
  const isTile = url.hostname.includes('openfreemap') ||
                 url.hostname.includes('arcgisonline') ||
                 url.hostname.includes('openstreetmap') ||
                 url.pathname.includes('/tiles/');

  if (isTile) {
    e.respondWith(
      caches.open(CACHE).then(async cache => {
        const cached = await cache.match(e.request);
        if (cached) return cached;
        try {
          const res = await fetch(e.request);
          if (res.ok) cache.put(e.request, res.clone());
          return res;
        } catch {
          return cached || new Response('', { status: 503 });
        }
      })
    );
    return;
  }

  // Ses dosyaları cache'le
  if (url.pathname.includes('/audio/')) {
    e.respondWith(
      caches.open(CACHE).then(async cache => {
        const cached = await cache.match(e.request);
        if (cached) return cached;
        try {
          const res = await fetch(e.request);
          if (res.ok) cache.put(e.request, res.clone());
          return res;
        } catch {
          return cached || new Response('', { status: 503 });
        }
      })
    );
    return;
  }

  // Statik dosyalar - cache first
  if (STATIC.some(s => e.request.url.includes(s.replace('/', '')))) {
    e.respondWith(
      caches.match(e.request).then(cached => cached || fetch(e.request))
    );
    return;
  }

  // API istekleri - network first, cache fallback
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
