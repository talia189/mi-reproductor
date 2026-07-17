const CACHE_NAME = 'vinyl-cache-v4'; 

// Lista absoluta de archivos guardados directamente en el almacenamiento interno del móvil
const ASSETS = [
  './',
  './index.html',
  './music.js',
  './Styles/music.css',
  './Images/music_rhythm_icon_155090.ico',
  './Images/summer eyes portada.jpg',
  './music/OHYUL of LNGSHOT - [Summer Eyes] Official Audio - LNGSHOT.mp3',
  './Images/dawn.jpg',
  './music/dawn.mp3',
  './Images/night_city.jpg',
  './music/night_city.mp3'
];

// Instala el Service Worker y guarda todos los archivos locales en caché
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Almacenando caché para uso sin conexión...');
      return Promise.all(
        ASSETS.map(url => {
          return cache.add(url).catch(err => console.log('Error al registrar en caché local:', url, err));
        })
      );
    }).then(() => self.skipWaiting())
  );
});

// Activa el nuevo Service Worker borrando las versiones obsoletas
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('Borrando caché antigua...');
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Intercepta las solicitudes del navegador para cargar los archivos directo de la memoria interna
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});