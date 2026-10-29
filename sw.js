const CACHE_NAME = 'borrowed-shell-v94';
const APP_SHELL = ['./', './index.html', './styles.css?v=empty-centered-1', './theme-worlds.css?v=worlds-10', './stark-theme.css?v=stark-interface-5', './app.js?v=common-page-transition-2', './theme-worlds.js?v=worlds-7', './community.js?v=spider-verse-3', './campus-board.js?v=3', './map.js?v=real-map-10', './account-features.js', './stark-theme.js?v=stark-startup-1', './irene-easter-egg.js?v=3', './assets/irene-photo.jpg', './manifest.webmanifest', './icon.svg', './friends-cast-sheet.png', './assets/friends-cast-sheet.png', './supabase-config.js', './supabase-client.js'];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))); self.skipWaiting(); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))); self.clients.claim(); });
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    if (response.ok) { const copy = response.clone(); caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy)); }
    return response;
  }).catch(() => caches.match('./index.html'))));
});
