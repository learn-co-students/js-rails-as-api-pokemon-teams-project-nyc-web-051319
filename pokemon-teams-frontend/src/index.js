const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')

function getTrainers() {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => {
        json.forEach(element => {
            main.innerHTML += `
            <div class="card" id="trainer-${element.id}"><p>${element.name}</p>
                <button class="addButton" data-trainer-id="${element.id}">Add Pokemon</button>
                <ul id="list-${element.id}">
                </ul>
            </div>`
            element.pokemons.forEach(pokemon => {
                const card = document.querySelector(`#trainer-${element.id}`)
                const list = document.querySelector(`#list-${element.id}`)
                if (card.id === `trainer-${pokemon.trainer_id}`) {
                    list.innerHTML += `
                    <li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
                }
            })
        })
    })
}

getTrainers()

main.addEventListener('click', function(e) {
    if (e.target.className === "addButton") {
        if (e.target.nextElementSibling.getElementsByTagName("li").length < 6) {
            fetch(POKEMONS_URL, {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    "trainer_id": e.target.dataset.trainerId
                })
            })
            .then(resp => resp.json())
            .then(json => {
                e.target.parentElement.childNodes[4].innerHTML += `
                <li>${json.nickname} (${json.species}) <button class="release" data-pokemon-id="${json.id}">Release</button></li>
                `
            })
        }
    }
})

main.addEventListener('click', function(e) {
    debugger;
    if (e.target.className === "release") {
        fetch(`${POKEMONS_URL}/${e.target.dataset.pokemonId}`, {
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(json => {
            e.target.parentElement.remove()
        })
    }
})