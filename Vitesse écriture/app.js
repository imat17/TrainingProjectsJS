const APICALL = `http://api.quotable.io/random`;

const displayTime = document.querySelector('.time');
const displayScore = document.querySelector('.score');

const sentenceToWrote = document.querySelector('.sentence__towrote');
const sentenceText = document.querySelector('.sentence__text');


let time = 60;
let score = 0;
let sentenceScore;

displayTime.innerText = `Temps : ${time}`;
displayScore.innerText = `Score : ${score}`;

let timer = setInterval(calTime, 1000);

function calTime() {
	time--;
	displayTime.innerText = `Temps : ${time}`;
	displayScore.innerText = `Score : ${score}`;
	if (time === 0) {
		clearInterval(timer);
	}
}

// Prendre une phrase API

async function displayNewSentence() {
	const call = await fetch(APICALL);
	const results = await call.json();
	const sentence = results.content;

    sentenceScore = sentence.length;
	//console.log(results);
	sentenceToWrote.innerHTML = ''; // Au cas ou une phrase est déjà chargée
	// On met la phrase dans un tableau ou chaque case = une lettre
	sentence.split('').forEach((carac) => {
		// Creation des span pour chaques lettres
		const caracSpan = document.createElement('span');
		// Affichage de chaque lettre dans son span
		caracSpan.innerText = carac;
		// On rajoute le span a notre phrase
		sentenceToWrote.appendChild(caracSpan);
	});
    
	sentenceText.value = null;
}

displayNewSentence();

// Verification texte > phrase

sentenceText.addEventListener('input', () => {
	const tabSentence = sentenceToWrote.querySelectorAll('span');
	const tabTest = sentenceText.value.split('');
	let correct = true;

    //Pour chaque lettre que l'on écrit > forEach test chaque lettre de la phrase écrire (tabTest);
	tabSentence.forEach((caracSpan, index) => {
       // console.log(caracSpan);
		const caractere = tabTest[index];

		if (caractere === undefined) {
			caracSpan.classList.remove('correct');
			caracSpan.classList.remove('wrong');
			correct = false;
		} else if (caractere === caracSpan.innerText) {
			caracSpan.classList.add('correct');
			caracSpan.classList.remove('wrong');
		} else {
			caracSpan.classList.remove('correct');
			caracSpan.classList.add('wrong');
			correct = false;
		}
	});
	if (correct) {
		displayNewSentence();
        score += sentenceScore;
	}
});
