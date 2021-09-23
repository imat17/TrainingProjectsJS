const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
let particuleArray;

// Creation d'une classe >>> Sert à creer des objets
class Particule {
	constructor(x, y, directionX, directionY, height, color) {
		this.x = x;
		this.y = y;
		this.directionX = directionX;
		this.directionY = directionY;
		this.height = height;
		this.color = color;
	}
	// Creation d'une méthode = fonction dans un objet
	draw() {
		ctx.beginPath(); //On commence le dessin
		ctx.arc(this.x, this.y, this.height, 0, Math.PI * 2, false); //Permet de faire des ronds
		ctx.fillStyle = this.color;
		ctx.fill(); // On rempli avec la couleur
	}
	MAJ() {
		// Si la particule a touché le canvas à droite ou à gauche
		if (this.x + this.height > canvas.width || this.x - this.height < 0) {
			// On change la direction
            this.directionX = -this.directionX;
		}
        // Même chose de haut en bas
        if (this.y + this.height > canvas.height || this.y - this.height < 0) {
            this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
	}
}

// Creation d'un objet à partir de la classe
const obj1 = new Particule(300, 300, 50, 50, 100, 'white');
console.log(obj1);
obj1.draw(); //On dessine l'objet

// Creation de plusieurs particules dans un tab
function init() {
	particuleArray = [];
	for (let i = 0; i < 100; i++) {
		let height = (Math.random() + 0.01) * 20;
		let x = Math.random() * (window.innerWidth - height * 2); //Evite d'apparaitre sur les bordures
		let y = Math.random() * (window.innerHeight - height * 2);
        // Donne des chiffres positifs ou négatifs , change la direction selon
		let directionX = Math.random() * 1.2 - 0.6;
        // -0.2 / 0.2
		let directionY = Math.random() * 1.2 - 0.6;
		let color = 'white';

		particuleArray.push(new Particule(x, y, directionX, directionY, height, color));
	}
}

// Animation
function animation() {
	requestAnimationFrame(animation); // Execute une fonction 60* fois par sec
	// clearRect = nettoie un rectangle , ici tout notre écran
	ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
	for (let i = 0; i < particuleArray.length; i++) {
		particuleArray[i].MAJ(); // Méthode de mise a jour
	}
}

init();
animation();
console.log(particuleArray);


// Resize

function resize() {
    init();
    animation();
}

// A chaque resize de l'écran >> TimeOut > Rappelle resize avec les nouvelles dimensions
let doIt;

window.addEventListener('resize', () => {
    clearTimeout(doIt);
    doIt = setTimeout(resize, 100);
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
})