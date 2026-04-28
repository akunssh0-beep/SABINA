const CACHE_NAME = 'sabina-v1777400460866';
const ASSETS = [
    "./",
    "./index.html",
    "./manifest.json",
    "./icon-512.png",
    "./sw.js",
    "./internal_assets/xlsx.full.min.js"
];

// Tahap Instalasi: Menyimpan aset ke dalam cache
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('SW: Membuka cache dan menyimpan aset');
            return cache.addAll(ASSETS);
        })
    );
    self.skipWaiting();
});

// Tahap Aktivasi: Membersihkan cache lama yang tidak relevan
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => {
                    console.log('SW: Menghapus cache lama', key);
                    return caches.delete(key);
                })
            );
        })
    );
    self.clients.claim();
});

// Tahap Fetch: Strategi Cache First, falling back to Network
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            // Mengembalikan dari cache jika ada, jika tidak maka ambil dari network
            return response || fetch(e.request).catch(() => {
                // Opsional: Jika network gagal dan tidak ada di cache, bisa berikan fallback tertentu
                console.log('SW: Fetch gagal (Offline)');
            });
        })
    );
});
