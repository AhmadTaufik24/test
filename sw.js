// Nama cache unik untuk versimu. Jika kamu update website, ganti v1 menjadi v2, dst.
const CACHE_NAME = 'taufik-portfolio-cache-v1';

// Daftar file/aset inti yang ingin kamu simpan (cache) saat pertama kali user berkunjung.
const urlsToCache = [
  '/', // Ini merujuk ke root, seringkali sama dengan index.html
  'index.html',
  'index-id.html',
  'manifest.json',
  'assets/css/style.css',
  'assets/js/main.js',
  'assets/img/icon.png',
  // Kamu bisa tambahkan path gambar profilmu di sini agar ikut tersimpan
  // Contoh: 'assets/img/profile1.png', 
  // Contoh: 'assets/img/profile2.png',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap',
  'https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLEj6Z1xlEA.woff2' // Font file
];

// EVENT 1: 'install'
// Terjadi saat service worker pertama kali di-download.
// Kode ini membuka cache dan menyimpan semua file dari `urlsToCache`.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_ALE)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// EVENT 2: 'fetch'
// Terjadi setiap kali browser mencoba mengambil sebuah file (misal: gambar, css, js).
// Kode ini akan mencegat permintaan tersebut.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika file yang diminta ADA di dalam cache...
        if (response) {
          // ...langsung kembalikan dari cache (super cepat!).
          return response;
        }
        // Jika TIDAK ADA di cache...
        // ...lanjutkan permintaan ke network seperti biasa.
        return fetch(event.request);
      }
    )
  );
});

// EVENT 3: 'activate'
// Terjadi setelah service worker baru diaktifkan.
// Kode ini berguna untuk membersihkan cache lama jika kamu mengupdate versi cache (misal dari v1 ke v2).
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
