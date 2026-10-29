const CACHE_NAME = 'ukis-dive-tools-v2026.10.29.01'; // Release v2026.8.25.2
// wszystkie historyczne prefiksy Dive Tools; cache innych aplikacji Uki w tej samej domenie zostają
const OWN_CACHE_PREFIXES = ['ukis-dive-tools-', 'uki-dive-tools-', 'dive-tools-'];
const isOwnCacheName = (name) => OWN_CACHE_PREFIXES.some((p) => name.startsWith(p));
// Core assets that MUST be cached immediately
const CORE_ASSETS = [
    './',
    './index.html',
    './style.css',
    './src/main.js',
    './pwa-updater.js',
    './src/modules/ui/AppUI.js',
    './src/modules/ui/ChangelogUI.js',
    './img/logo.png',
    './img/logo_lunar.svg',
    './img/bg/background_uki.jpg',
    './manifest.json'
];

self.addEventListener('install', (e) => {
    // ABSOLUTNY ZAKAZ UŻYWANIA self.skipWaiting() TUTAJ!
    // Worker musi grzecznie czekać w stanie 'installed' aż użytkownik kliknie "Zaktualizuj" w banerze.
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return Promise.all(CORE_ASSETS.map(url => 
                fetch(new Request(url + '?_t=' + Date.now(), { cache: 'no-store' }))
                .then(r => { 
                    if(!r.ok) throw new Error('Fetch failed for ' + url); 
                    return cache.put(new Request(url), r); 
                })
            ));
        })
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME && isOwnCacheName(key)) {
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim(); // Take control of all clients immediately
});

self.addEventListener('fetch', (e) => {
    // Only cache http/https requests
    if (!e.request.url.startsWith('http')) {
        return;
    }

    e.respondWith(
        caches.match(e.request).then((response) => {
            if (response) {
                return response; // Hit cache
            }
            return fetch(e.request).then((fetchResponse) => {
                // Return if not valid
                if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
                    return fetchResponse;
                }

                // Clone response to cache it dynamically
                const responseToCache = fetchResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(e.request, responseToCache);
                });

                return fetchResponse;
            }).catch(err => {
                console.warn('[SW] Fetch Failed (Offline):', err);
            });
        })
    );
});

self.addEventListener('message', (event) => {
    if (event.data === 'SKIP_WAITING' || (event.data && event.data.type === 'SKIP_WAITING')) {
        self.skipWaiting();
    }
});
