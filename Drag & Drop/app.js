let originPic = document.querySelector('.origin__pic');
let firstCase = document.getElementById('first');
const boxes = document.querySelectorAll('.whitesquare');
const bin = document.querySelector('.choise__delete');
const allCases = [];
const choise = [];
let actualPic;

let indexPic = 1;

originPic.style.backgroundImage = `url(https://loremflickr.com/320/240?random=${indexPic})`;
actualPic = `url(https://loremflickr.com/320/240?random=${indexPic})`;


// Stockage des boxes dans un tableau
for (i = 0; i < boxes.length; i++) {
	allCases.push(boxes[i]);
}
allCases.push(bin);

// Creation d'une nouvelle image
function newOrigin() {
	const newBase = document.createElement('div');
	newBase.setAttribute('class', 'whitesquare');
	newBase.setAttribute('draggable', 'true');
	indexPic++;
	newBase.style.backgroundImage = `url(https://loremflickr.com/320/240?random=${indexPic})`;
    actualPic = `url(https://loremflickr.com/320/240?random=${indexPic})`;
	firstCase.appendChild(newBase);
	originPic = newBase;
}

// Ajout de 3 addEventList sur chaques cases
for (const empty of allCases) {
	empty.addEventListener('dragover', dragOver);
	empty.addEventListener('dragenter', dragEnter);
	empty.addEventListener('drop', dragDrop);
}

function dragOver(e) {
	e.preventDefault();
}

function dragEnter(e) {
	e.preventDefault();
}


function dragDrop() {
	// Empeche de surposer les images sur la box first
	if (this.id === 'first') {
		return;
	}
	// Supprimer
	if (this.id === 'choise__delete') {
		originPic.remove();
		newOrigin();
		return;
	}

	// Verouillage
	this.removeEventListener('drop', dragDrop);
	this.removeEventListener('dragenter', dragEnter);
	this.removeEventListener('dragover', dragOver);

	this.appendChild(originPic);
	// On enlève le dragable de l'élement déjà choisi
	this.childNodes[0].setAttribute('draggable', false);
	newOrigin();

    choise.push(actualPic);
    if(choise.length === 3) {
        setTimeout(() => {
            alert('Sélection terminée !');
        }, 200)
    }
}

