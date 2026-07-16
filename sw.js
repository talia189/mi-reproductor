const CACHE_NAME = 'vinyl-cache-v2'; 

// 2. Lista completa de tus archivos para que el celular los guarde en su memoria
const ASSETS = [
  './',
  './index.html',
  './music.js',
  './Styles/music.css',
  './Images/music_rhythm_icon_155090.ico',
  
  // --- AGREGA AQUÍ LAS RUTAS DE TUS CANCIONES E IMÁGENES LOCALES ---
  // Ejemplos (cámbialos por los tuyos):
  './Images/summer eyes portada.jpg',
  './music/OHYUL of LNGSHOT - [Summer Eyes] Official Audio - LNGSHOT.mp3'
];

// Instalar el Service Worker y guardar todo en la memoria del teléfono
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Descargando archivos para uso sin internet...');
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Borrar archivos viejos cuando actualices la versión de la app
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('Limpiando caché antiguo...');
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Interceptar las peticiones del teléfono: si no hay señal, usa la memoria interna
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      // Si el archivo está guardado en el celular lo usa, si no, lo busca en internet
      return cachedResponse || fetch(e.request);
    })
  );
});
