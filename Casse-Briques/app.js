const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const displayScore = document.querySelector('.score');

const rayonBall = 10,
	barreHeight = 10,
	barreWidth = 75,
	nbCol = 8,
	nbRow = 5,
	brickWidth = 75,
	brickHeight = 20;
    

let x = canvas.width / 2,
	y = canvas.height - 30,
	barreX = (canvas.width - barreWidth) / 2,
	end = false,
	speedX = 2,
	speedY = -2,
    score = 0;

//---------------------Creation de la balle---------------------
// Explications drawnBall
// beginPath = On commence le dessin
// arc = Dessin de la balle
// Couleur + ajout

function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, rayonBall, 0, Math.PI * 2);
	ctx.fillStyle = '#333';
	ctx.fill();
	ctx.closePath;
}

//drawBall();

//------------------Creation de la barre-------------------

function drawBarre() {
	ctx.beginPath();
	ctx.rect(barreX, canvas.height - barreHeight, barreWidth, barreHeight);
	ctx.fillStyle = '#333';
	ctx.fill();
	ctx.closePath;
}

//drawBarre();

// -----------------Création d'un tableau avec toutes les briques--------------
const bricks = [];
// Pour chaques row , on crée un tableau vide
for (let i = 0; i < nbRow; i++) {
	bricks[i] = [];
	// Une fois le tableau crée, on refait une boucle pour les colonnes
	for (let j = 0; j < nbCol; j++) {
		// Chaque brick va être un objet
		bricks[i][j] = { x: 0, y: 0, statut: 1 };
	}
}

function drawBrick() {
	for (let i = 0; i < nbRow; i++) {
		for (let j = 0; j < nbCol; j++) {
			if (bricks[i][j].statut === 1) {
				// 75 * 8 + 10 * 8 + 35 = 750
				let brickX = j * (brickWidth + 10) + 35;
				let brickY = i * (brickHeight + 10) + 30;

				bricks[i][j].x = brickX;
				bricks[i][j].y = brickY;

				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = '#333';
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}

//drawBrick();

//-------------------Animation-------------

function draw() {
	if (end === false) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawBall();
		drawBarre();
		drawBrick();
        collisionDetection();

		//Si touche mur droit ou mur gauche >> Rebond
		if (x + speedX > canvas.width - rayonBall || x + speedX < rayonBall) {
			speedX = -speedX; // On part dans le sens inverse
		}
		// Si touche le plafond
		if (y + speedY < rayonBall) {
			speedY = -speedY;
		}

		// Si touche le sol >> Perdu sauf si barre
		if (y + speedY > canvas.height - rayonBall + 10) {
			// Intervalle de 0-75 (dimensions de la barre) On touche la barre
			if (x > barreX && x < barreX + barreWidth) {
				speedX = speedX + 0.1; // Légère accélération
				speedY = speedY + 0.1; // Légère accélération
				speedY = -speedY;
				// Si on touche le sol
			} else {
				end = true;
				displayScore.innerHTML = `Perdu ! <br> Clique sur le Casse-Briques pour recommencer.`;
			}
		}

		x += speedX;
		y += speedY;
		requestAnimationFrame(draw); // Efface et affiche 60/sec
	}
}

draw();

//---------------------- Mouvement de la barre ---------------------------
document.addEventListener('mousemove', mooveMouse);

function mooveMouse(e) {
	// e.clientX = De la gauche jusqu'a la souris (notre position)
	// offsetLeft = Décalage par rapport à la gauche
	let posXBarreCanvas = e.clientX - canvas.offsetLeft;
	//console.log(posXBarreCanvas);
	if (posXBarreCanvas > 35 && posXBarreCanvas < canvas.width - 35) {
		barreX = posXBarreCanvas - barreWidth / 2;
	}
}

//--------------Collision------------------
function collisionDetection() {
	for (let i = 0; i < nbRow; i++) {
		for (let j = 0; j < nbCol; j++) {
			let b = bricks[i][j]; // briques [0][0] colonnes/rangées
			if (b.statut === 1) {
				// Brique pas encore détruite
				// Si on touche une brique
				if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
					speedY = -speedY;
					b.statut = 0;
					score++;
					displayScore.innerHTML = `Score : ${score}`;

					if (score === nbCol * nbRow) {
						// Victoire
						displayScore.innerHTML = `Félicitation ! <br> Clique sur le Casse-Briques pour recommencer.`;
                        end = true;
					}
				}
			}
		}
	}
}

collisionDetection();

// Rejouer
canvas.addEventListener('click', () => {
	if (end === true) {
		end = false;
		document.location.reload();
	}
});
