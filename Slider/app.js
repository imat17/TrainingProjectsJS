const imgs = document.querySelectorAll('.img__slider img');
const previous = document.querySelector('.left');
const next = document.querySelector('.right');
const circles = document.querySelectorAll('.circle');
let index = 0;

next.addEventListener('click', nextImg);

function nextImg() {
	if (index < 2) {
		imgs[index].classList.remove('active');
		index++;
		imgs[index].classList.add('active');
	} else if (index === 2) {
		imgs[index].classList.remove('active');
		index = 0;
		imgs[index].classList.add('active');
	}
	// Actualise les cercles par rapport à l'image
	for (i = 0; i < circles.length; i++) {
		if (circles[i].getAttribute('data-clic') - 1 === index) {
			circles[i].classList.add('active__circle');
		} else {
			circles[i].classList.remove('active__circle');
		}
	}
}

previous.addEventListener('click', previousImg);

function previousImg() {
	if (index > 0) {
		imgs[index].classList.remove('active');
		index--;
		imgs[index].classList.add('active');
	} else if (index === 0) {
		imgs[index].classList.remove('active');
		index = 2;
		imgs[index].classList.add('active');
	}
	for (i = 0; i < circles.length; i++) {
		if (circles[i].getAttribute('data-clic') - 1 === index) {
			circles[i].classList.add('active__circle');
		} else {
			circles[i].classList.remove('active__circle');
		}
	}
}

// Avec le clavier

document.addEventListener('keydown', keyPressed);

function keyPressed(e) {
	if (e.keyCode === 37) {
		previousImg();
	} else if (e.keyCode === 39) {
		nextImg();
	}
}

// Cercles

circles.forEach((circle) => {
	circle.addEventListener('click', function () {
		for (i = 0; i < circles.length; i++) {
			// Enlève la classe active-circle si elle existe
			circles[i].classList.remove('active__circle');
		}
		this.classList.add('active__circle');
		imgs[index].classList.remove('active');
		index = this.getAttribute('data-clic') - 1;
		imgs[index].classList.add('active');
	});
});
