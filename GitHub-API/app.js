const url = "https://api.github.com/users/";
const display = document.querySelector('.display');
const form = document.querySelector('.form__search');
const input = document.querySelector('.input__search');

async function apiCall(user) {
    const response = await fetch(`${url}${user}`);
    const data = await response.json();

    console.log(data);

    creationCarte(data);
}

apiCall("imat17");

function creationCarte(user) {
    const cardHTML = `
    <div class="card">
        <img src="${user.avatar_url}" alt="photo de profil" class="avatar">
        <h2>${user.name}</h2>
        <ul class="contain__info">
            <li class="followers">Followers : ${user.followers}</li>
            <li class="star">Repositories : ${user.public_repos}</li>
            <li class="bio">Bio: ${user.bio}</li>
        </ul>
    </div>   
    `;
    display.innerHTML = cardHTML;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (input.value.length > 0) {
        apiCall(input.value);
        input.value = "";
    }
})