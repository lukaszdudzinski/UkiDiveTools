const CACHE_NAME = 'uki-dive-tools-v1';
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './src/main.js',
    './src/modules/ui/AppUI.js',
    './src/modules/ui/QuizUI.js',
    './src/modules/ui/LecturesUI.js',
    './src/modules/data/LecturesData.js',
    './img/logo.jpg'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});
