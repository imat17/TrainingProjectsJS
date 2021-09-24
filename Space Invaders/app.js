const containerGrid = document.querySelector('.grid');
let alienInvaders = [];
let shooterPos = 229;
let allDivs;
let direction = 1;
let width = 20;
let score = document.querySelector('h3');
let totalScore = 0;

function createGridAndAliens() {
	// Dire au aliens de descendre d'un cran
	let indexAttr = 0;

	for (i = 0; i < 240; i++) {
		// 500/25 = 20  / 20x20 = 240 >> Total des carrés
		if (indexAttr === 0) {
			const bloc = document.createElement('div');
			bloc.setAttribute('data-left', 'true');
			containerGrid.appendChild(bloc);
			indexAttr++;
		} else if (indexAttr === 19) {
			const bloc = document.createElement('div');
			bloc.setAttribute('data-right', 'true');
			containerGrid.appendChild(bloc);
			indexAttr = 0;
		} else {
			const bloc = document.createElement('div');
			containerGrid.appendChild(bloc);
			indexAttr++;
		}
	}
	for (i = 1; i < 53; i++) {
		if (i === 13) {
			i = 21;
			alienInvaders.push(i);
		} else if (i === 33) {
			i = 41;
			alienInvaders.push(i);
		} else {
			alienInvaders.push(i);
		}
	}
	console.log(alienInvaders);

	allDivs = document.querySelectorAll('.grid div');
	alienInvaders.forEach((invader) => {
		allDivs[invader].classList.add('alien');
	});

	allDivs[shooterPos].classList.add('shooter');
}

createGridAndAliens();

// Deplacement du tireur
function moveShooter(e) {
	// On fait disparaitre l'élement
	allDivs[shooterPos].classList.remove('shooter');
	// On le déplace
	if (e.keyCode === 37) {
		if (shooterPos > 220)
			// 220 = bord gauche
			shooterPos -= 1;
	} else if (e.keyCode === 39) {
		if (shooterPos < 239) {
			// Bord droit
			shooterPos += 1;
		}
	}
	// On le fait réapparaitre
	allDivs[shooterPos].classList.add('shooter');
}
document.addEventListener('keydown', moveShooter);

// Deplacement des aliens

let downRight = true;
let downLeft = true;

function moveAliens() {
	// Faire descendre les aliens d'une ligne
	for (let i = 0; i < alienInvaders.length; i++) {
		if (allDivs[alienInvaders[i]].getAttribute('data-right') === 'true') {
			if (downRight) {
				direction = 20; // Longueur d'une ligne
				setTimeout(() => {
					downRight = false;
				}, 50);
				// Repartir en sens inverse
			} else if (downRight === false) {
				direction = -1;
			}
			downLeft = true;
			// Pareil dans l'autre sens
		} else if (allDivs[alienInvaders[i]].getAttribute('data-left') === 'true') {
			if (downLeft) {
				direction = 20;
				setTimeout(() => {
					downLeft = false;
				}, 50);
			} else if (downLeft === false) {
				direction = 1;
			}
			downRight = true;
		}
	}
	// On les fait disparaitre
	for (let i = 0; i < alienInvaders.length; i++) {
		allDivs[alienInvaders[i]].classList.remove('alien');
	}
	// On les déplaces
	for (let i = 0; i < alienInvaders.length; i++) {
		alienInvaders[i] += direction;
	}
	// Réapparition
	for (let i = 0; i < alienInvaders.length; i++) {
		allDivs[alienInvaders[i]].classList.add('alien');
	}
    // Fin de partie
    // Si alien touche le tireur
    if(allDivs[shooterPos].classList.contains('alien', 'shooter')) {
        score.innerText = 'Game Over 💀';
        allDivs[shooterPos].classList.add('boom');
        clearInterval(invaderId);
    }
    // Si alien derriere nous
    for (let i = 0; i < alienInvaders.length; i++) {
        if (alien[i] > allDivs.length - width) {
            score.innerText = 'Game Over 💀';
            clearInterval(invaderId);
        }
    }
}
invaderId = setInterval(moveAliens, 500);

// Création du laser

function shoot(e) {
	let laserId;
	let laserIsShooting = shooterPos;

	function moveLaser() {
		allDivs[laserIsShooting].classList.remove('laser');
		// Monte sur l'axe Y
		laserIsShooting -= width;
		allDivs[laserIsShooting].classList.add('laser');

        // Tuer les aliens
        if (allDivs[laserIsShooting].classList.contains('alien')) {
            allDivs[laserIsShooting].classList.remove('laser');
            allDivs[laserIsShooting].classList.remove('alien');
            allDivs[laserIsShooting].classList.add('boom');

            alienInvaders = alienInvaders.filter(el => el !== laserIsShooting);

            setTimeout(() => 
                allDivs[laserIsShooting].classList.remove('boom'), 250)
                clearInterval(laserId);
                totalScore ++;
                if (totalScore === 36) {
                    score.innerText = "Félicitation jeune bot !";
                    clearInterval(invaderId);
                } else {
                    score.innerText = `Score total : ${totalScore}`;
                }
             

        }

        // On supprime la classe laser après le shoot
        if (laserIsShooting < width) {
            clearInterval(laserId);
            setTimeout(() => {
                allDivs[laserIsShooting].classList.remove('laser');
            }, 100)
        }
	}

	if (e.keyCode === 32) {
		laserId = setInterval(() => {
			moveLaser();
		}, 100);
	}
}

document.addEventListener('keyup', shoot);
