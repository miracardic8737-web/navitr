// Navitr Service Worker - Offline Cache
const CACHE = 'navitr-v3';
const STATIC = [
  '/',
  '/index.html',
  '/app.js',
  '/style.css',
  '/maplibre-gl.js',
  '/maplibre-gl.css',
  '/manifest.json'
];

// Çevrimdışı harita tile cache
const TILE_CACHE = 'navitr-tiles-v1';
const MAX_TILE_CACHE = 500; // max 500 tile

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(STATIC)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE && k !== TILE_CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Harita tile'larını cache'le - çevrimdışı çalışsın
  const isTile = url.hostname.includes('openfreemap') ||
                 url.hostname.includes('arcgisonline') ||
                 url.pathname.match(/\/\d+\/\d+\/\d+\.(png|jpg|pbf|mvt)/) ||
                 url.pathname.includes('/tiles/');

  if (isTile) {
    e.respondWith(
      caches.open(TILE_CACHE).then(async cache => {
        const cached = await cache.match(e.request);
        if (cached) return cached;
        try {
          const res = await fetch(e.request);
          if (res.ok) {
            // Cache boyutunu kontrol et
            const keys = await cache.keys();
            if (keys.length > MAX_TILE_CACHE) {
              // En eski tile'ı sil
              await cache.delete(keys[0]);
            }
            cache.put(e.request, res.clone());
          }
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
  if (e.request.method === 'GET' && STATIC.some(s => url.pathname === s || url.pathname.endsWith(s))) {
    e.respondWith(
      caches.match(e.request).then(cached => cached || fetch(e.request))
    );
    return;
  }

  // API istekleri - network first
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
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
