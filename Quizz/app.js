const form = document.querySelector('.questions__container');
let tabResults = [];
const goodAnswer = ['a', 'c', 'b', 'c', 'c'];
const emojis = ['✔️','✨','👀','😭','👎'];
const titleResult = document.querySelector('.results h3');
const noteResult = document.querySelector('.results__help');
const helpResult = document.querySelector('.results__note');
const allQuestions = document.querySelectorAll('.questions__bloc');
let checkTable = [];

form.addEventListener('submit', (e) => {
	e.preventDefault();

	for (i = 1; i < 6; i++) {
		tabResults.push(
			document.querySelector(`input[name="q${i}"]:checked`).value
		);
	}
	console.log(tabResults);
    checkFunct(tabResults);
	tabResults = []; //On vide le tableau pour pouvoir le relog
})

function checkFunct(arrayResult) {
    for (let a = 0; a < 5; a++) {
        if (arrayResult[a] === goodAnswer[a]) {
            checkTable.push(true);
        } else {
            checkTable.push(false);
        }
    }

    console.log(checkTable);
    showResult(checkTable);
    colorFunction(checkTable);
    checkTable = [];

    // On affiche les résultats 
    function showResult(tableComp) {
        const nbOfFaults = tableComp.filter( el => el !== true).length; //On filtre le tab tableComp et on retourne les éléments filtrés
        console.log(nbOfFaults); // el = élément / On filtre chaque éléments différents de true >>> Reste les falses

        switch(nbOfFaults) {
            case 0:
                titleResult.innerText = `${emojis[0]} Félicitation ! C'est un sans faute ✔️`
                helpResult.innerText = '';
                noteResult.innerText = '5/5';
            break;
            case 1:
                titleResult.innerText = `${emojis[1]} Vous y êtes presque ! ${emojis[1]}`
                helpResult.innerText = 'Retentez une autre réponse dans la case rouge, puis re-validez !';
                noteResult.innerText = '4/5';
            break;
            case 2:
                titleResult.innerText = `${emojis[2]} Encore un effort! ${emojis[2]}`
                helpResult.innerText = 'Retentez une autre réponse dans la case rouge, puis re-validez !';
                noteResult.innerText = '3/5';
            break;
            case 3:
                titleResult.innerText = `${emojis[2]} Encore un effort! ${emojis[2]}`
                helpResult.innerText = 'Retentez une autre réponse dans la case rouge, puis re-validez !';
                noteResult.innerText = '2/5';
            break;
            case 4:
                titleResult.innerText = `${emojis[3]} Vous pouvez mieux faire ${emojis[3]}`
                helpResult.innerText = 'Retentez une autre réponse dans la case rouge, puis re-validez !';
                noteResult.innerText = '1/5';
            break;
            case 5:
                titleResult.innerText = `${emojis[4]} Huuum...Retentez le quizz ${emojis[4]}`
                helpResult.innerText = 'Retentez une autre réponse dans la case rouge, puis re-validez !';
                noteResult.innerText = '0/5';
            break;
            default: 'Oups, un problème est survenu';
        }
    }
}

// Appliquer les couleurs + l'effet

function colorFunction(tabValBool) {
    for (let j = 0; j < tabValBool.length; j++) {

        if(tabValBool[j] === true) {
            allQuestions[j].style.background = 'lightgreen';
        } else {
            allQuestions[j].style.background = '#ffb8b8';
            allQuestions[j].classList.add('fail');

            setTimeout(() => { // On applique l'effet echec pour 500ms , puis on le retire
                allQuestions[j].classList.remove('fail');
            },500)
        }
    }
}

// Reset les couleurs

allQuestions.forEach(bloc => { //On prend tout les blocs , pour chaque bloc on écoute le click , qui change la couleur en blanc
    bloc.addEventListener('click', () => {
        bloc.style.background = 'white';
    })
});