const inputUser = document.querySelector('.form__group:nth-child(1) input');
const inputMail = document.querySelector('.form__group:nth-child(2) input');
const inputPassword = document.querySelector('.form__group:nth-child(3) input');
const inputConfirm = document.querySelector('.form__group:nth-child(4) input');
const allImg = document.querySelectorAll('.valid__icon');
const allSpan = document.querySelectorAll('span');
const allLines = document.querySelectorAll('.list div');

// Input User
inputUser.addEventListener('input', (e) => {
	if (e.target.value.length >= 3) {
		allImg[0].style.display = 'inline';
		allImg[0].src = 'ressources/check.svg';
		allSpan[0].style.display = 'none';
	} else {
		allImg[0].style.display = 'inline';
		allSpan[0].style.display = 'inline';
		allImg[0].src = 'ressources/error.svg';
	}
});

// Input Email
inputMail.addEventListener('input', (e) => {
	const regexEmail = /\S+@\S+\.\S+/;
	if (e.target.value.search(regexEmail) === 0) {
		// 0 = match   -1=erreur
		allImg[1].style.display = 'inline';
		allImg[1].src = 'ressources/check.svg';
		allSpan[1].style.display = 'none';
	} else {
		allImg[1].style.display = 'inline';
		allSpan[1].style.display = 'inline';
		allImg[1].src = 'ressources/error.svg';
	}
});

// Input MDP
let inputValue;
// Uniquement les caractères spéciaux
const specialCaract = /[^a-zA-Z0-9]/;
// Uniquement les lettres
const alphabet = /[a-z]/i;
//Uniquement les chiffres
const chiffres = /[0-9]/;

let objValid = {
	symbol: 0,
	letter: 0,
	chiffre: 0,
};

inputPassword.addEventListener('input', (e) => {
	inputValue = e.target.value;

	if (inputValue.search(specialCaract) !== -1) {
		objValid.symbol = 1;
	}
	if (inputValue.search(alphabet) !== -1) {
		objValid.letter = 1;
	}
	if (inputValue.search(chiffres) !== -1) {
		objValid.chiffre = 1;
	}
	//console.log(objValid);

	// Prendre en compte le fait d'effacer des éléments
	// Si l'un des conditions est égale à -1 , un chiffre/symbole/lettre aura été supprimé
	if ((e.inputType = 'deleteContentBackward')) {
		if (inputValue.search(specialCaract) === -1) {
			objValid.symbol = 0;
		}
		if (inputValue.search(alphabet) === -1) {
			objValid.letter = 0;
		}
		if (inputValue.search(chiffres) === -1) {
			objValid.chiffre = 0;
		}
		console.log(objValid);
	}

	let testAll = 0;
	// Boucle for in ; permet d'itérer à l'intérieur d'un objet
	for (const property in objValid) {
		if (objValid[property] > 0) {
			testAll++;
		}
	}
	if (testAll < 3) {
		allSpan[2].style.display = 'inline';
		allImg[2].style.display = 'inline';
		allImg[2].src = 'ressources/error.svg';
	} else {
		allImg[2].src = 'ressources/check.svg';
		allSpan[2].style.display = 'none';
	}

	// Force du mdp
	if (inputValue.length <= 6 && inputValue.length > 0) {
		allLines[0].style.display = 'block';
	} else if (inputValue.length <= 9 && inputValue.length > 6) {
		allLines[1].style.display = 'block';
	} else if (inputValue.length <= 12 && inputValue.length > 9) {
		allLines[2].style.display = 'block';
	} else if (inputValue.length === 0) {
		allLines[0].style.display = 'none';
		allLines[1].style.display = 'none';
		allLines[2].style.display = 'none';
	}
});

// Confirmation du mot de passe

inputConfirm.addEventListener('input', (e) => {
	if (e.target.value.length === 0) {
		allImg[3].style.display = 'inline';
		allImg[3].src = 'ressources/error.svg';
	} else if (e.target.value === inputValue) {
		allImg[3].style.display = 'inline';
		allImg[3].src = 'ressources/check.svg';
	} else {
		allImg[3].src = 'ressources/error.svg';
		allImg[3].style.display = 'inline';
        allSpan[3].style.display = 'inline';
		
	}
});
