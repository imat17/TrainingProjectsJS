const form = document.querySelector('form');
const list = document.querySelector('ul');
const input = document.querySelector('form input');
let toDo = [];

form.addEventListener('submit', (event) => {
	event.preventDefault();

	const text = input.value.trim();
	if (text !== '') {
		plusOne(text);
		input.value = ''; //reset de l'input
	}
});

function plusOne(text) {
	const newObjToDo = {
		text,
		// Date.now renvoie le nb de ms depuis 01/01/1970
		id: Date.now(),
	};
	showList(newObjToDo);
}

function showList(newObjToDo) {
	const item = document.createElement('li');
	item.setAttribute('data-key', newObjToDo.id);

	const input = document.createElement('input');
	input.setAttribute('type', 'checkbox');
	input.addEventListener('click', itsDone);
	item.appendChild(input);

	const txt = document.createElement('span');
	txt.innerText = newObjToDo.text;
	item.appendChild(txt);

	const btn = document.createElement('button');
	btn.addEventListener('click', deleteThing);
	const img = document.createElement('img');
	img.setAttribute('src', 'ressources/fermer.svg');
	btn.appendChild(img);
	item.appendChild(btn);

	list.appendChild(item);
	toDo.push(item);
}

function itsDone(e) {
	e.target.parentNode.classList.toggle('finDeTache');
}

function deleteThing(e) {
	toDo.forEach((element) => {
		// On attrape le parent du button (li) car c'est lui qui à l'id
		//si les ids sont similaires (li et tableau toDo), on supprime l'élément du DOM
		if (e.target.parentNode.getAttribute('data-key') === element.getAttribute('data-key')) {
			// Garde tout les li on un id differents de celui qui vient d'être enlevé dans le tab
			element.remove();
			toDo = toDo.filter((li) => li.dataset.key !== element.dataset.key);
		}
	});
}
