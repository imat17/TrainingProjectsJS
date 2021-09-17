const today = new Date();
const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); // +1 semaine en ms
const display = document.querySelector('.cookie__show');
const btns = document.querySelectorAll('button');
const inputs = document.querySelectorAll('input');
const infoTxt = document.querySelector('.cookie__info');
let alreadyDone = false;

// on extrait les données souhaitée
let day = ('0' + nextWeek).slice(9, 11); // Converti la date en chaine de caractères
let month = ('0' + (nextWeek.getMonth() + 1)).slice(-2);
let year = today.getFullYear();
document.querySelector('input[type=date]').value = `${year}-${month}-${day}`;

console.log(month);

// Au clic sur les boutons
btns.forEach((btn) => {
	btn.addEventListener('click', btnAction);
});

function btnAction(e) {
	let newObject = {};

	inputs.forEach((input) => {
		let attriName = input.getAttribute('name');
		// Est ce que l'attribut est différent de cookiedate? Si oui > input.value ; Si non > input.valueAsDate
		// Si ce n'est pas l'input de la date , on prend la valeur de l'input et on stocke dans l'objet
		let attriValue = attriName !== 'cookieExpire' ? input.value : input.valueAsDate;
		newObject[attriName] = attriValue;
	});
	//console.log(newObject);
	let description = e.target.getAttribute('data-cookie');

	// Clic sur Créer >>> Créer un cookie
	if (description === 'create') {
		createCookie(newObject.cookieName, newObject.cookieValue, newObject.cookieExpire);
	}
	// Clic sur montrer >>> Montre la liste des cookies
	else if (description === 'show') {
		listCookies();
	}
}

// Création des fonctions createCookie et listCookies
function createCookie(name, value, exp) {
	infoTxt.innerText = '';
	display.innerHTML = "";
	
	// Si le cookie a le même nom
	let cookies = document.cookie.split(';');
	cookies.forEach((cookie) => {
		cookie = cookie.trim(); //Enlève les espaces au début/fin d'un élément
		//console.log(cookie);
		let formatCookie = cookie.split('=');
		console.log(formatCookie);
		if (formatCookie[0] === encodeURIComponent(name)) {
			alreadyDone = true;
		}
	});

	if (alreadyDone) {
		infoTxt.innerText = 'Ce nom existe déjà.';
		alreadyDone = false;
		return;
	}

	// Si le cookie n'a pas de nom
	if (name.length === 0) {
		infoTxt.innerText = 'Veuillez nommer votre cookie';
		return; // n'éxécute pas la suite du code
	}

	// Création du cookie
	//EncodeURIComponent = Encode les caractères spéciaux
	// toUTCString = Format date en chaine de caractère
	document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
		value
	)};expires=${exp.toUTCString()}`;

	let info = document.createElement('li');
	info.innerText = `Cookie ${name} créé !`;
	display.appendChild(info);
	setTimeout(() => {
		info.remove();
	}, 1500);
}

function listCookies() {
	let cookies = document.cookie.split(';');
	if (cookies.join() === '') {
		// Transforme le tab en chaine de caractère / Si chaine vide = pas de cookies
		infoTxt.innerText = `Aucun cookie n'a été créé`;
		return;
	}

	cookies.forEach((cookie) => {
		cookie = cookie.trim();
		let formatCookie = cookie.split('=');
		//console.log(formatCookie);
		let cookieItem = document.createElement('li');
		infoTxt.innerText = 'Cliquez sur un cookie dans la liste pour le supprimer';
		cookieItem.innerText = `Nom : ${decodeURIComponent(formatCookie[0])}
		, Valeur : ${decodeURIComponent(formatCookie[1])}`;
		display.appendChild(cookieItem);

		// Suppression d'un cookie
		cookieItem.addEventListener('click', () => {
			document.cookie = `${formatCookie[0]}=; expires=${new Date(0)}`; //on donne une date passée
			cookieItem.innerText = `Cookie ${formatCookie[0]} supprimé.`;
			setTimeout(() => {
				cookieItem.remove();
			}, 1000);
		});
	});
}
