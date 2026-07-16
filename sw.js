const CACHE_NAME = 'vinyl-cache-v2'; 

// Lista simplificada para asegurar que el diseño cargue 100% sin internet
const ASSETS = [
  './',
  './index.html',
  './music.js',
  './Styles/music.css'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Guardando estructura en la memoria...');
      // Usamos un método más seguro que no rompe la app si un archivo falla
      return Promise.all(
        ASSETS.map(url => {
          return cache.add(url).catch(err => console.log('No se pudo guardar la ruta:', url, err));
        })
      );
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
