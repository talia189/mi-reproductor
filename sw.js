const CACHE_NAME = 'vinyl-cache-v1'; 

// Esta es la lista de tus archivos que el celular guardará en su memoria
const ASSETS = [
  './',
  './index.html',
  './music.js',
  './Styles/music.css'
];

// Instala la aplicación en la memoria del teléfono
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activa el modo sin internet
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

// Escucha cuando no tienes conexión y reproduce lo guardado
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});
