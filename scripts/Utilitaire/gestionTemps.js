const dayWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

let today = new Date();
let options = { weekday: 'long' };
let actualDay = today.toLocaleDateString('fr-FR', options);

// Première lettre du jour en maj ( m ) + reste du mot ( ardi )
actualDay = actualDay.charAt(0).toUpperCase() + actualDay.slice(1);

// On coupe un morceau du tableau à partir de Mardi (Mardi>Dimanche)
// Puis on rajoute le morceau coupé ( Lundi > Mardi non inclu).
let arrayInOrder = dayWeek
	.slice(dayWeek.indexOf(actualDay))
	.concat(dayWeek.slice(0, dayWeek.indexOf(actualDay)));

export default arrayInOrder;
