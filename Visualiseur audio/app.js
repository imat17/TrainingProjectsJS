const audioPlayer = document.querySelector('audio');

audioPlayer.addEventListener('play', () => {

    // Propose des méthodes/propriétées liées au son
    const contextAudio = new AudioContext(); 

    // Creation d'une source depuis le fichier audio , permet de la manipuler
    const src = contextAudio.createMediaElementSource(audioPlayer);

    // Permet de faire des représentation de données audio
    const analyser = contextAudio.createAnalyser();

    const canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    // On connecte la source à l'analyser puis à la sortie son
    src.connect(analyser);
    analyser.connect(contextAudio.destination);

    // Traite le signal numérique pour fournir une fréquence
    analyser.fftSize = 1024;

    const audioFrequencies = analyser.frequencyBinCount;
    console.log(audioFrequencies);

    // Création d'un tableau qui va contenir toutes les fréquences du son
    const arrayFrequencies = new Uint8Array(audioFrequencies);

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    // Largeur / Nb de fréquences dans le tab
    const widthBar = (WIDTH / arrayFrequencies.length) + 2; //+2 car pas assez de sons aigus
    let heightBar;
    let x;

    function drawBar() {
        requestAnimationFrame(drawBar)

        x = 0;

        // Retourne une valeur entre 0 et 255 par rapport à une fréquence (rgb = 255 max)
        analyser.getByteFrequencyData(arrayFrequencies);
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        for (let i = 0; i < audioFrequencies; i++) {
            heightBar = arrayFrequencies[i];
            
            let r = 250;
            let g = 50;
            let b = i;

            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            ctx.fillRect(x, HEIGHT, widthBar, - heightBar)

            // Pour que les barres soient les une à côté des autres
            x += widthBar + 1;
        }
    }
    drawBar();
})