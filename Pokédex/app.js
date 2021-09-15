const searchInput = document.querySelector('.poke__search input');
let allPoke = [];
let lastArray = [];
const poke__list = document.querySelector('.poke__list');

const types = {
	grass: '#78c850',
	ground: '#E2BF65',
	dragon: '#6F35FC',
	fire: '#F58271',
	electric: '#F7D02C',
	fairy: '#D685AD',
	poison: '#966DA3',
	bug: '#B3F594',
	water: '#6390F0',
	normal: '#D9D5D8',
	psychic: '#F95587',
	flying: '#A98FF3',
	fighting: '#C25956',
	rock: '#B6A136',
	ghost: '#735797',
	ice: '#96D9D6',
};

function fetchPokemon() {
	// 1er appel pour récuperer la liste des poké + lien infos
	fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			//console.log(data);
			pokeList = data;
			pokeList.results.forEach((pokemon) => {
				fetchFullPoke(pokemon);
			});
		});
}
fetchPokemon();

function fetchFullPoke(pokemon) {
	//2ème appel pour récuperer les infos sur chaques poké
	let objFullPoke = {};
	let url = pokemon.url;
	let pokeName = pokemon.name;

	fetch(url)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			//console.log(data);
			pokeData = data;
			objFullPoke.pic = pokeData.sprites.front_default;
			objFullPoke.type = pokeData.types[0].type.name;
			objFullPoke.id = pokeData.id;

			fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeName}`)
				.then((response) => {
					return response.json();
				})
				.then((pokeData) => {
					//console.log(pokeData);
					objFullPoke.name = pokeData.names[4].name;
					allPoke.push(objFullPoke);
					//console.log(objFullPoke);

					if (allPoke.length === 151) {
						lastArray = allPoke
							.sort((a, b) => {
								return a.id - b.id;
							})
							.slice(0, 21); //On prend les 21° pour les cards
						console.log(lastArray);
						createCard(lastArray);
					}
				});
		});
}

// Création des cards
function createCard(array) {
	for (let i = 0; i < array.length; i++) {
		const card = document.createElement('li');
		let color = types[array[i].type];
		card.style.background = color;
		const txtCard = document.createElement('h5');
		txtCard.innerText = array[i].name;
		const idCard = document.createElement('p');
		idCard.innerText = `ID:${array[i].id}`;
		const imgCard = document.createElement('img');
		imgCard.src = array[i].pic;

		card.appendChild(imgCard);
		card.appendChild(txtCard);
		card.appendChild(idCard);

		poke__list.appendChild(card);
	}
}

// Scroll infini
window.addEventListener('scroll', () => {
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
	// scrollTop = scroll depuis le top
	// scrollHeight = scroll total
	// clientHeight = hauteur de la fenêtre, partie visible.
	console.log(scrollTop, scrollHeight, clientHeight);

	if (clientHeight + scrollTop >= scrollHeight - 20) {
		addPoke(6);
	}
});

let index = 21;

function addPoke(nb) {
	if (index > 151) {
		return;
	}
	const arrayToAdd = allPoke.slice(index, index + nb);
	createCard(arrayToAdd);
	index += nb;
}

// Animation Input
searchInput.addEventListener('input', function (e) {
	if (e.target.value !== '') {
		// Si strictement différent de vide
		e.target.parentNode.classList.add('active-input'); // ParentNode = form
	} else if (e.target.value === '') {
		// Si vide
		e.target.parentNode.classList.remove('active-input');
	}
});
