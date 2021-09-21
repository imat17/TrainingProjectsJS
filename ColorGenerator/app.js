const inputsColor = document.querySelectorAll('.color__input');
const inputRange = document.querySelector('.input__range');
const buttons = document.querySelectorAll('button');
const colorContainer = document.querySelector('.color__container');
const span = document.querySelector('span');
const background = document.body;
const btnRandom = document.querySelector('.random');

// Valeurs du dégradé

let valColors = ['#BA5370', '#F4E2D8'];
let inclinaison = 45;
let index = 3;

// Couleurs dans inputs
inputsColor[0].value = valColors[0];
inputsColor[1].value = valColors[1];

inputsColor[0].style.background = valColors[0];
inputsColor[1].style.background = valColors[1];

// Couleurs du body
background.style.background = `linear-gradient(${inclinaison}deg, ${valColors})`;

// Inclinaison
inputRange.addEventListener('input', (e) => {
	inclinaison = e.target.value * 3.6; // (car 360deg max)
	background.style.background = `linear-gradient(${inclinaison}deg, ${valColors})`;
});

// Rajout et suppression de couleurs
buttons.forEach((button) => {
	button.addEventListener('click', oneOrLess);
});

function oneOrLess(e) {
    span.innerText = '';
	// On re-sélectionne les inputs car on va en ajouter/supprimer
	const allInputs = document.querySelectorAll('.color__input');
	// Entier sous le nb a virgule / Chiffre entre 0 et .99 / *16 (converti en héxa)
	const randomColor = Math.floor(Math.random() * 16777215).toString(16);
	console.log(randomColor);

	// clic sur +
	if (e.target.className === 'plus') {
		// 8 couleurs max
		if (allInputs.length > 8) {
			return;
		}
		const newColor = document.createElement('input');
		newColor.setAttribute('class', 'color__input');
		newColor.setAttribute('data-index', index);
		newColor.setAttribute('max-length', 7);
		newColor.value = `#${randomColor.toUpperCase()}`;
		newColor.style.background = `#${randomColor}`;
		colorContainer.appendChild(newColor);
		valColors.push(`#${randomColor.toUpperCase()}`);
		//Maj du background
		background.style.background = `linear-gradient(${inclinaison}deg, ${valColors})`;
		index++;
	} else if (e.target.className === 'minus') {
		if (valColors.length === 2) {
			span.innerText = 'Pour un dégradé, il faut au moins deux couleurs!';
		} else {
			valColors.pop(); // Enlève la derniere valeur d'un tableau
			allInputs[allInputs.length - 1].remove(); // accès au dernier élément du tableau et supprime
            index --;
			background.style.background = `linear-gradient(${inclinaison}deg, ${valColors})`;
		}
	}

    // Inputs de base // Maj des inputs
    allInputs.forEach(input => {
        input.addEventListener('input', MAJCOLORS);
    });
}
    
    // Inputs de base // Changer manuellement les inputs
    inputsColor.forEach(input => {
        input.addEventListener('input', MAJCOLORS);
    });

    function MAJCOLORS(e) {
        // On récupère l'index de l'input que l'on est en train de modifier
        let actualIndex = e.target.getAttribute('data-index');
        e.target.value = e.target.value.toUpperCase();
        valColors[actualIndex - 1] = e.target.value.toUpperCase();
        e.target.style.background = valColors[actualIndex - 1];
        background.style.background = `linear-gradient(${inclinaison}deg, ${valColors})`;
    }


// Random color
btnRandom.addEventListener('click', () => {
    // On re-sélectionne tout les inputs
    const allInputs = document.querySelectorAll('.color__input');
    for (i=0; i < valColors.length; i++) {
        valColors[i] = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        allInputs[i].value = valColors[i].toUpperCase();
        allInputs[i].style.background = valColors[i].toUpperCase();
        background.style.background = `linear-gradient(${inclinaison}deg, ${valColors})`;
    }
})


