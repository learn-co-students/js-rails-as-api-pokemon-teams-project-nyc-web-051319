const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


const main = document.querySelector('main')

document.addEventListener('DOMContentLoaded', function() {
  getPokemons()
})

main.addEventListener('click', function(e) {
  if (e.target.tagName === 'BUTTON') {
    if (e.target.className === 'release') {
      let pokemonId = e.target.dataset.pokemonId
      releasePokemon(pokemonId)
    } else {
      let trainerId = e.target.dataset.trainerId
      addPokemon(trainerId)
    }
  }
})

function getPokemons() {
  fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(trainers => {
      trainers.forEach(trainer => renderTrainer(trainer))
    })
}

function addPokemon(trainerId) {
  fetch(POKEMONS_URL, {
    method: "POST",
    headers: {
      "Content-Type": 'application/json',
      "Accept": 'application/json'
    },
    body: JSON.stringify({
      trainer_id: trainerId
    })
  })
  .then(response => response.json())
  .then(pokemon => {
    if (pokemon.id) {
      return renderPokemon(pokemon)
    } else {
      alert(pokemon.error)
    }
  })
}

function releasePokemon(pokemonId) {
  fetch(`${POKEMONS_URL}/${pokemonId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": 'application/json',
      "Accept": 'application/json'
    },
  })
  .then(response => response.json())
  .then(pokemon => console.log(pokemon))
  const pokemon = document.querySelector(`[data-pokemon-id="${pokemonId}"]`)
  pokemon.parentNode.remove()
}

function renderPokemon(pokemon) {
  const trainerDiv = document.querySelector(`[data-id="${pokemon.trainer_id}"]`)
  const trainerList = trainerDiv.querySelector('ul')
  const pokemonList = document.createElement('li')
  pokemonList.innerHTML = `
    ${pokemon.nickname} (${pokemon.species})
    <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
  `
  trainerList.appendChild(pokemonList)
}

function renderTrainer(trainer) {
  const trainerCard = document.createElement('div')
  trainerCard.className = 'card'
  trainerCard.dataset.id = trainer.id
  trainerCard.innerHTML = `<p>${trainer.name}</p>`
  const addBtn = document.createElement('button')
  addBtn.dataset.trainerId = trainer.id
  addBtn.innerText = 'Add Pokemon'
  trainerCard.appendChild(addBtn)
  const trainerUl = document.createElement('ul')
  trainer.pokemons.forEach(function(pokemon) {
    const pokemonLi = document.createElement('li')
    pokemonLi.innerHTML = `
      ${pokemon.nickname} (${pokemon.species})
      <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
    `
    trainerUl.appendChild(pokemonLi)
  })
  trainerCard.appendChild(trainerUl)
  main.appendChild(trainerCard)
}
