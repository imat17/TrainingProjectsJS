const info = document.querySelector('.info');
const cells = document.querySelectorAll('.cell');

let locked = true;
let actualPlayer = "X";


info.innerHTML = `Au tour de : ${actualPlayer}`;

let winCombine = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let actualGame = ['','','','','','','','',''];


// Au clic sur chaque cellules
cells.forEach(cell => {
    cell.addEventListener('click', clickOnCell); 
})

function clickOnCell(e) {
    // Met dans une constante la case au click + l'index
    const cellClicked = e.target;
    const cellIndex = cellClicked.getAttribute('data-index');

    // Pour empêcher de re-cliquer sur une case déjà cliquée 
    if (actualGame[cellIndex] !== "" || !locked) {
        return;
    }

    // On rempli le tableau
    actualGame[cellIndex] = actualPlayer;
    cellClicked.innerHTML = actualPlayer;
    console.log(actualGame)

    validResults()
}

// Validation des résultats
function validResults() {
    let endOfTheGame = false;

    for (let i = 0; i < winCombine.length; i++) {
        // Vérif de la première rangée du tableauWin etc...  [0,1,2]
        const checkWin = winCombine[i];
        // On cherche 3*X ou 3*O
        let a = actualGame[checkWin[0]];
        let b = actualGame[checkWin[1]];
        let c = actualGame[checkWin[2]];
        
        if (a === '' || b === '' || c === '') {
            continue; // On continue de chercher car pas de combinaisons gagnantes
        }
        if ( a === b && b === c) { // Victoire car a = b = c
            endOfTheGame = true;
            break;
        }
    }
    if (endOfTheGame) {
        info.innerText = `Le joueur ${actualPlayer} a gagné !`;
        locked = false;
        return;
    }
    // Match nul
    // Si il n'y a pas de chaines de caractères vides 
    let nulGame = !actualGame.includes('');
    if (nulGame) {
        info.innerText = 'Match nul !'
        locked = false;
        return;
    }

    playerChange();
}

// Changement de joueur

function playerChange() {
    // Est-ce que le joueur en cours est la X ? > Si oui au de tour "O" > Sinon "X"
    actualPlayer = actualPlayer === 'X' ? "O" : "X";
    info.innerHTML = `Au tour de : ${actualPlayer}`;
}