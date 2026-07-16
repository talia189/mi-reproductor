const musica = document.getElementById('musica');
const disco = document.getElementById('discoCont');
const btnPlay = document.getElementById('btnPlay');
const tituloC = document.getElementById('tituloC');
const artistaC = document.getElementById('artistaC');
const portada = document.getElementById('portada');
const estado = document.getElementById('estado');

// --- PLAYLIST CONFIGURABLE ---
const playlist = [
    {
        titulo: "SUMMER EYES",
        artista: "OHYUL",
        archivo: "music/OHYUL of LNGSHOT - [Summer Eyes] Official Audio - LNGSHOT.mp3",
        imagen: "Images/summer eyes portada.jpg"
    },
    {
        titulo: "DAWN",
        artista: "OHYUL",
        archivo: "https://youtu.be/8FR6cDdINHM?si=oiFTzednAX2SfqWI",
        imagen: "https://via.placeholder.com/400x400/ff4757/ffffff?text=Dawn"
    },
    {
        titulo: "NIGHT CITY",
        artista: "LO-FI BEATS",
        archivo: "link_cancion3.mp3",
        imagen: "https://via.placeholder.com/400x400/2f3542/ffffff?text=Lo-Fi"
    }
];

let indiceActual = 0;

function cargarCancion(idx) {
    const c = playlist[idx];
    tituloC.innerText = c.titulo;
    artistaC.innerText = c.artista;
    portada.src = c.imagen;
    musica.src = c.archivo;
}

// Carga la primera canción al iniciar
cargarCancion(indiceActual);

function cambiarCancion(direccion) {
    // 1. Iniciamos animación de salida
    disco.classList.add('deslizar-fuera');
    
    setTimeout(() => {
        // 2. Cambiamos de track internamente
        if (direccion === 'next') {
            indiceActual = (indiceActual + 1) % playlist.length;
        } else {
            indiceActual = (indiceActual - 1 + playlist.length) % playlist.length;
        }
        
        cargarCancion(indiceActual);

        // 3. Reseteamos posición para que entre desde el otro lado
        disco.classList.remove('deslizar-fuera');
        disco.classList.add('deslizar-dentro');

        // 4. Animación de entrada
        setTimeout(() => {
            disco.classList.remove('deslizar-dentro');
            
            // Si el reproductor estaba activo, sigue sonando automáticamente
            if (btnPlay.innerText === "PAUSE") {
                musica.play();
                disco.classList.add('girando');
            }
        }, 50);

    }, 600); // 600ms coincide con la transición del CSS
}

btnPlay.addEventListener('click', () => {
    if (musica.paused) {
        musica.play();
        disco.classList.add('girando');
        btnPlay.innerText = "PAUSE";
        estado.innerText = "PLAYING NOW";
        estado.style.color = "#00d2ff";
    } else {
        musica.pause();
        disco.classList.remove('girando');
        btnPlay.innerText = "PLAY";
        estado.innerText = "STOPPED";
        estado.style.color = "#666";
    }
});

// Al terminar una canción, pasa a la siguiente
musica.onended = () => cambiarCancion('next');
