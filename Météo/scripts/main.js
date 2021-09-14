const keyAPI = 'd404df465bd354374deef86a980be1b2';
let resultsAPI;
const temp = document.querySelector('.weather__temp');
const text = document.querySelector('.weather__text');
const loc = document.querySelector('.weather__loc');
const time = document.querySelectorAll('.weather__time');
const prev = document.querySelectorAll('.weather__prevision');
const day = document.querySelectorAll('.weather__day');
const prevTemp = document.querySelectorAll('.weather__prevtemp');

// Géolocalisation
if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(
		(position) => {
			//console.log(position);
			let long = position.coords.longitude;
			let lat = position.coords.latitude;
			callAPI(long, lat); // création appel api avec pour paramètres long et lat
		},
		() => {
			alert(
				`Vous avez refusé la géolocalisation, l'application ne peux pas fonctionner.`
			);
		}
	);
}

// Création de la fonction d'appel à l'api

function callAPI(long, lat) {
	fetch(
		`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${keyAPI}`
	)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			console.log(data);
			resultsAPI = data;
			text.innerText = resultsAPI.current.weather[0].description;
			temp.innerText = `${Math.trunc(resultsAPI.current.temp)}°`;
			loc.innerText = resultsAPI.timezone;
			// Heures par tranches avec leurs températures
			// Heures
			let actualTime = new Date().getHours();
			for (let i = 0; i < time.length; i++) {
				let heureIncr = actualTime + i * 3;

				if (heureIncr > 24) {
					time[i].innerText = `${heureIncr - 24} h `;
				} else if (heureIncr === 24) {
					time[i].innerText = '00h';
				} else {
					time[i].innerText = `${heureIncr} h`;
				}
			}
			//Températures
			for (let j = 0; j < prev.length; j++) {
				prev[j].innerText = `${Math.trunc(resultsAPI.hourly[j * 3].temp)}°`;
			}
		});
	// Second Row
	/*for (let i = 0; i < 7; i++) {
				prevTemp.innerText = `${Math.trunc(resultsAPI.daily[i].temp.day)}°`;
			}*/
}
