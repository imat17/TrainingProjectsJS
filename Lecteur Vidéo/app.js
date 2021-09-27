const video = document.querySelector('.video');
const btnPlayPause = document.getElementById('play__pause');
const img = document.querySelector('#play__pause img');
const progressBar = document.querySelector('.progress__bar');
const progress = document.querySelector('.progress');
const btnMute = document.getElementById('mute');
const fullScreen = document.getElementById('fullscreen');
const volumeSlider = document.getElementById('volume__slider');

btnPlayPause.addEventListener('click', togglePlayPause);
video.addEventListener('click', togglePlayPause);

function togglePlayPause(){
    if(video.paused) {
        img.src="ressources/pause.svg";
        video.play();
    } else {
        img.src="ressources/play.svg";
        video.pause();
    }
}

// Barre orange 

video.addEventListener('timeupdate', () => {
    let progressPos = video.currentTime / video.duration;
    progress.style.width = progressPos * 100 + "%";

    if (video.ended) {
        // Si on arrive à la fin , on remet l'icône play
        img.src= "ressources/play.svg"
    }
})

// Clic sur la barre orange 

// getBoundingClientRect > Permet de donner des dimensions et des positions par rapport à un élément
let rect = progressBar.getBoundingClientRect();
let width = rect.width;

progressBar.addEventListener('click', (e) => {
    let x = e.clientX - rect.left;
    let widthPercent = ((x*100/width));
    console.log(widthPercent);

    let durationVideo = video.duration;

    // Position en secondes par rapport au pourcentage
    video.currentTime = durationVideo * (widthPercent /100)
})

// Gerer le resize
window.addEventListener('resize', () => {
    let rect = progressBar.getBoundingClientRect();
    let width = rect.width;
})

video.addEventListener('dblclick', () => {
    video.requestFullscreen();
})
fullScreen.addEventListener('click', () => {
    video.requestFullscreen();
})


// Volume

volumeSlider.addEventListener('change', () => {
    video.volume = volumeSlider.value / 100;
})


// Mute 
btnMute.addEventListener('click', () => {
    if (video.muted) {
        video.muted = false;
        btnMute.innerHTML = 'Mute';
    } else {
        video.muted = true;
        btnMute.innerHTML = "Unmute";
    }
})
