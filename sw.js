
const C = 'jiwacare-v1777430507004';
const A = ["./","./manifest.json","./icon-192.png","./icon-512.png","./index.html"];
self.addEventListener('install', e => e.waitUntil(caches.open(C).then(c => c.addAll(A))));
self.addEventListener('fetch', e => {
    if (e.request.url.includes('script.google.com')) return; // ANTI CACHE GAS
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});