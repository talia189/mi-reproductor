const CACHE_NAME = 'vinyl-cache-v5'; 

// Lista absoluta de tus 12 archivos reales para guardar en caché
const ASSETS = [
  './',
  './index.html',
  './music.js',
  './Styles/music.css',
  './Images/music_record_3843.ico',
  
  // Portadas
  './Images/summer eyes portada.jpg',
  './Images/descarga (3).jpg',
  './Images/run.jpg',
  './Images/flores.jpg',
  './Images/descarga (10).jpg',
  './Images/love birds.jpg.jpg',
  './Images/descarga (5).jpg',
  './Images/descarga (6).jpg',
  './Images/descarga (9).jpg',
  './Images/descarga (7).jpg',
  './Images/Gis De Maeyer, 1942 _ Figurative sculptor.jpg',
  './Images/audifopare.jpg',

  // Audios
  './music/OHYUL of LNGSHOT - [Summer Eyes] Official Audio - LNGSHOT.mp3',
  './music/As The World Falls Down - David Bowie.mp3',
  './music/Bon Jovi -  I\'d Die For You.mp3',
  './music/Bon Jovi - Bed Of Roses.mp3',
  './music/Bon Jovi - In These Arms.mp3',
  './music/Galantis - Do You Mind.mp3',
  './music/HUMBE - AMOR DE CINE.mp3',
  './music/Judas Priest - Prisoner of your eyes.mp3',
  './music/Rachael Yamagata  Something in the rain (sub español).mp3',
  './music/scary_ my god, you\'re divine prt 2  diet mountain dew demo lana del rey (español).mp3',
  './music/The 1975 - About You (Sub. español).mp3',
  './music/Dear Me - (JUNGWON).mp3'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Almacenando tu música en memoria local...');
      return Promise.all(
        ASSETS.map(url => {
          return cache.add(url).catch(err => console.log('No se pudo guardar en caché:', url, err));
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
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
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
