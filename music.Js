// Lista de canciones oficiales para uso local y offline
const playlist = [
  {
    title: "SUMMER EYES",
    artist: "OHYUL",
    src: "./music/OHYUL of LNGSHOT - [Summer Eyes] Official Audio - LNGSHOT.mp3",
    cover: "./Images/summer eyes portada.jpg"
  },
  {
    title: "As The World Falls Down",
    artist: "David Bowie",
    src: "./music/As The World Falls Down - David Bowie.mp3",
    cover: "./Images/descarga (3).jpg"
  },
  {
    title: "I'd Die For You",
    artist: "Bon Jovi",
    src: "./music/Bon Jovi -  I'd Die For You.mp3",
    cover: "./Images/run.jpg"
  },
  {
    title: "Bed Of Roses",
    artist: "Bon Jovi",
    src: "./music/Bon Jovi - Bed Of Roses.mp3",
    cover: "./Images/flores.jpg",
  },
  {
    title: "In These Arms",
    artist: "Bon Jovi",
    src: "./music/Bon Jovi - In These Arms.mp3",
    cover: "./Images/descarga (10).jpg"
  },
  {
    title: "Do You Mind",
    artist: "Galantis",
    src: "./music/Galantis - Do You Mind.mp3",
    cover: "./Images/love birds.jpg.jpg"
  },
  {
    title: "AMOR DE CINE",
    artist: "HUMBE",
    src: "./music/HUMBE - AMOR DE CINE.mp3",
    cover: "./Images/descarga (5).jpg"
  },
  {
    title: "Prisoner of your eyes",
    artist: "Judas Priest",
    src: "./music/Judas Priest - Prisoner of your eyes.mp3",
    cover: "./Images/descarga (6).jpg"
  },
  {
    title: "Something in the rain",
    artist: "Rachael Yamagata",
    src: "./music/Rachael Yamagata  Something in the rain (sub español).mp3",
    cover: "./Images/descarga (9).jpg"
  },
  {
    title: "Diet mountain dew demo",
    artist: "lana del rey",
    src: "./music/scary_ my god, you're divine prt 2  diet mountain dew demo lana del rey (español).mp3",
    cover: "./Images/descarga (7).jpg"
  },
  {
    title: "About You",
    artist: "The 1975",
    src: "./music/The 1975 - About You (Sub. español).mp3",
    cover: "./Images/Gis De Maeyer, 1942 _ Figurative sculptor.jpg"
  },
  {
    title: "Dear Me",
    artist: "JUNGWON",
    src: "./music/Dear Me - (JUNGWON).mp3",
    cover: "./Images/audifopare.jpg"
  }
];

let currentTrackIndex = 0;
let isPlaying = false;
const audio = new Audio();

// Capturar los elementos HTML del reproductor
const discoCont = document.getElementById('discoCont');
const btnPlay = document.getElementById('btn-play');
const btnNext = document.getElementById('btn-next');
const btnPrev = document.getElementById('btn-prev');
const srcPortada = document.getElementById('portada');
const txtTitulo = document.getElementById('titulo-cancion');
const txtArtista = document.getElementById('artista-cancion');

// Función para cargar la información de la pista
function loadTrack(index) {
    const track = playlist[index];
    audio.src = track.src;
    srcPortada.src = track.cover;
    txtTitulo.textContent = track.title;
    txtArtista.textContent = track.artist;
}

// Función para alternar entre Reproducir y Pausar
function togglePlay() {
    if (isPlaying) {
        audio.pause();
        discoCont.classList.remove('girando');
        btnPlay.textContent = 'PLAY';
    } else {
        audio.play().catch(err => console.log("Error al reproducir audio:", err));
        discoCont.classList.add('girando');
        btnPlay.textContent = 'PAUSE';
    }
    isPlaying = !isPlaying;
}

// Eventos de los botones de control
btnPlay.addEventListener('click', togglePlay);

btnNext.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) {
        audio.play().catch(err => console.log(err));
    }
});

btnPrev.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) {
        audio.play().catch(err => console.log(err));
    }
});

// Cargar la primera pista automáticamente al iniciar
loadTrack(currentTrackIndex);
