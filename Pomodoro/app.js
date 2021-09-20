const displayWork = document.querySelector('.time__left');
const displayRest = document.querySelector('.time__right');
const btnStart = document.querySelector('.start');
const btnPause = document.querySelector('.pause');
const btnReset = document.querySelector('.reset');
const cycle = document.querySelector('h2');

let checkInterval = false;
let initialTime = 1800; //60 = 30 soit 30min
let restTime = 300; //60 = 5 soit 5min
let pause = false;
let nbOfCycles = 0;

cycle.innerText = `Nombre de cycles : ${nbOfCycles}`;

displayWork.innerText = `${Math.trunc(initialTime / 60)} : ${
	initialTime % 60 < 10 ? `0${initialTime % 60}` : initialTime % 60
}`;

displayRest.innerText = `${Math.trunc(restTime / 60)} : ${
	restTime % 60 < 10 ? `0${restTime % 60}` : restTime % 60
}`;

btnStart.addEventListener('click', () => {
	// Permet d'éviter le spam du bouton car checkinterval est sur true
	if (checkInterval === false) {
		checkInterval = true;
		// Commence directement en faisant -- pour éviter un décalage d'une seconde
		initialTime--;
		displayWork.innerText = `${Math.trunc(initialTime / 60)} : ${
			initialTime % 60 < 10 ? `0${initialTime % 60}` : initialTime % 60
		}`;

		let timer = setInterval(() => {
			if (pause === false && initialTime > 0) {
				initialTime--;
				displayWork.innerText = `${Math.trunc(initialTime / 60)} : ${
					initialTime % 60 < 10 ? `0${initialTime % 60}` : initialTime % 60
				}`;
			} else if (pause === false && restTime === 0 && initialTime === 0) {
				initialTime = 1800;
				restTime = 300;
				nbOfCycles++;
				cycle.innerText = `Nombre de cycles : ${nbOfCycles}`;
				displayWork.innerText = `${Math.trunc(initialTime / 60)} : ${
					initialTime % 60 < 10 ? `0${initialTime % 60}` : initialTime % 60
				}`;

				displayRest.innerText = `${Math.trunc(restTime / 60)} : ${
					restTime % 60 < 10 ? `0${restTime % 60}` : restTime % 60
				}`;
			} else if (pause === false && initialTime === 0) {
				restTime--;
				displayRest.innerText = `${Math.trunc(restTime / 60)} : ${
					restTime % 60 < 10 ? `0${restTime % 60}` : restTime % 60
				}`;
			}
		}, 1000); // répétition toutes les secondes

        // Bouton Reset
		btnReset.addEventListener('click', () => {
			clearInterval(timer);
			checkInterval = false;
			initialTime = 1800;
			restTime = 300;
            displayWork.innerText = `${Math.trunc(initialTime / 60)} : ${
                initialTime % 60 < 10 ? `0${initialTime % 60}` : initialTime % 60
            }`;
            
            displayRest.innerText = `${Math.trunc(restTime / 60)} : ${
                restTime % 60 < 10 ? `0${restTime % 60}` : restTime % 60
            }`;
		});

	} else {
		return;
	}
});

// Bouton de pause
btnPause.addEventListener('click', () => {
	if (pause === false) {
		btnPause.innerText = 'Play';
	} else if (pause === true) {
		btnPause.innerText = 'Pause';
	}
	pause = !pause;
});
