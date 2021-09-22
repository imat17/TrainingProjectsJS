const btnRegister = document.querySelector('.btn__register');
const btnConnect = document.querySelector('.btn__connect');
const btnLogout = document.querySelector('.btn__logout');

const formRegister = document.querySelector('.form__register');
const formConnect = document.querySelector('.form__connect');

const emailRegister = document.querySelector('.email__register');
const pswRegister = document.querySelector('.password__register');

const emailConnect = document.querySelector('.email__connect');
const pswConnect = document.querySelector('.password__connect');

const info = document.querySelector('.info');
const h1 = document.querySelector('h1');

// Gestion du clic des boutons

btnRegister.addEventListener('click', () => {
	if (formConnect.classList.contains('appear')) {
		formConnect.classList.remove('appear');
	}
	formRegister.classList.toggle('appear');
});

btnConnect.addEventListener('click', () => {
	if (formRegister.classList.contains('appear')) {
		formRegister.classList.remove('appear');
	}
	formConnect.classList.toggle('appear');
});

// Au clic sur inscription

formRegister.addEventListener('submit', (e) => {
	e.preventDefault();
	const emailValue = emailRegister.value;
	const pswRegisterValue = pswRegister.value;

	auth.createUserWithEmailAndPassword(emailValue, pswRegisterValue).then((cred) => {
		console.log(cred);
		formRegister.reset();
		formRegister.classList.toggle('appear');
	});
});

// Au clic sur déconnection

btnLogout.addEventListener('click', (e) => {
	e.preventDefault();
	auth.signOut().then(() => {
		console.log('Vous êtes déconnecté');
	});
});

// Au clic sur connexion

formConnect.addEventListener('click', (e) => {
	e.preventDefault();
	const emailValue = emailConnect.value;
	const pswConnectValue = pswConnect.value;

	auth.signInWithEmailAndPassword(emailValue, pswConnectValue).then((cred) => {
		console.log('Je suis connecté!', cred.user);
		formConnect.reset();
		formConnect.classList.toggle('appear');
	});
});

// Gerer le contenu

auth.onAuthStateChanged((user) => {
	if (user) {
		info.innerText = 'Contenu privé 🔞';
		h1.innerText = 'De retour parmi nous 😀';
	} else {
		console.log('Utilisateur déconnecté');
		info.innerText = 'Contenu public';
		h1.innerText = 'Incrivez-vous ou connectez-vous';
	}
});
