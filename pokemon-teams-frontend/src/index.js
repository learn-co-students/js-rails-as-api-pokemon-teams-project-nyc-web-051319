const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetch(TRAINERS_URL)
.then(resp => resp.json())
.then(json => addTrainerCard(json))

function addTrainerCard(json) {
    const mainSection = document.querySelector("main")
    json.data.forEach (element=> {
        const cardDiv = document.createElement("div")
        cardDiv.className = "card"
        cardDiv.dataset.id = element.id
        const trainerName = document.createElement("p")
        trainerName.innerText = element.attributes.name
        cardDiv.appendChild(trainerName)
        mainSection.appendChild(cardDiv)

        const addBtn = document.createElement("button")
        addBtn.setAttribute('data-trainer-id', element.id)
        addBtn.innerText = "Add Pokemon"
        addBtn.addEventListener('click', function(e){
            fetch(POKEMONS_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({trainer_id: element.id})
            })
            .then(resp => resp.json())
            .then(function(pokemon) {
                const newPokeLI = document.createElement("li")
                newPokeLI.innerHTML = `${pokemon.data.attributes.nickname} (${pokemon.data.attributes.species})`

                const releaseBtn = document.createElement("button")
                releaseBtn.className = "release"
                releaseBtn.setAttribute("data-pokemon-id", pokemon.data.attributes.id)
                releaseBtn.innerText = "Release"
                releaseBtn.addEventListener('click', function(e) {
                    fetch(`${POKEMONS_URL}/${pokemon.data.attributes.id}`,{
                        method: 'DELETE',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({pokemon_id: pokemon.data.attributes.id})
                    })
                    .then(() => {
                        document.querySelector(`[data-pokemon-id="${pokemon.data.attributes.id}"]`).parentElement.remove()
                    })
                })
                newPokeLI.appendChild(releaseBtn)
                pokeUL.appendChild(newPokeLI)
            })
            .catch(e => alert("Cannot have more than 6 pokemons."))
        })
        cardDiv.appendChild(addBtn)

        const pokeUL = document.createElement("ul")
        fetch(`${TRAINERS_URL}/${element.id}`)
        .then(resp => resp.json())
        .then(json => addPokemons(pokeUL, json))
        cardDiv.appendChild(pokeUL)

    })
}

function addPokemons(pokeUL, json) {
    json.included.forEach(pokemon => {
        const pokeLI = document.createElement("li")
        pokeLI.innerHTML = `${pokemon.attributes.nickname} (${pokemon.attributes.species})`

        const releaseBtn = document.createElement("button")
                releaseBtn.className = "release"
                releaseBtn.setAttribute("data-pokemon-id", pokemon.attributes.id)
                releaseBtn.innerText = "Release"
                releaseBtn.addEventListener('click', function(e) {
                    fetch(`${POKEMONS_URL}/${pokemon.attributes.id}`,{
                        method: 'DELETE',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({pokemon_id: pokemon.attributes.id})
                    })
                    .then(() => {
                        document.querySelector(`[data-pokemon-id="${pokemon.attributes.id}"]`).parentElement.remove()
                    })
                })
        pokeLI.appendChild(releaseBtn)
        pokeUL.appendChild(pokeLI)
    })
}