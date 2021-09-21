const btn = document.querySelector('.btn');
let allFace = document.querySelectorAll('.double-face');
const cards = document.querySelectorAll('.carte');

let cardIsBack = false;
let firstCard, secondCard;
let locked = false;

cards.forEach((card) => {
	card.addEventListener('click', back);
});

function back() {
    if(locked) return;
	this.childNodes[1].classList.toggle('active');
// stocker les correspondances
	if (!cardIsBack) {
		cardIsBack = true;
		firstCard = this;
		return;
	}

    cardIsBack = false;
    secondCard = this;
   // console.log(firstCard, secondCard)
   correspondance();
}

function correspondance() {
    // Si les images correspondents , on verrouille le retournement des 2 cartes
    if (firstCard.getAttribute('data-attr') === secondCard.getAttribute('data-attr')) {
        firstCard.removeEventListener('click', back);
        secondCard.removeEventListener('click', back);
    // Sinon , on laisse 1.5s pour mémoriser
    } else {
        locked = true;
        setTimeout(() => {
            firstCard.childNodes[1].classList.remove('active');
            secondCard.childNodes[1].classList.remove('active');
            locked = false;
        }, 1500)
    }
}

// Placement aléatoire
function random() {
    cards.forEach(card => {
        // Pour avoir des entiers entre 0 et 11
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    })
}

random();

// Nouvelle partie
btn.addEventListener('click', (e) => {
    e.preventDefault();
    location.reload();
})