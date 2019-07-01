const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', getEverything)

const mainSection = document.querySelector('main')

function getEverything() {
  //Fetch all the trainers
  //make some cards for the trainers
  //put each card on the page
  //fetch the pokemon
  //put them on the trainer cards

  fetch(TRAINERS_URL)
  .then(resp => resp.json())
  .then(trainerObjects => renderTrainers(trainerObjects))
  .then(addEventListenersToPage)
}

function renderTrainers(trainers) {
  trainers.forEach(trainer => addSingleTrainerToPage(trainer))
}

function addSingleTrainerToPage(trainerObj) {
  mainSection.innerHTML +=  `
  <div class="card" data-id="${trainerObj.id}">
    <p>${trainerObj.name}</p>
    <button data-trainer-id="${trainerObj.id}">Add Pokemon</button>
    <ul>
      ${getTrainersPokemonAndDisplayOnPage(trainerObj.pokemons)}
    </ul>
  </div>
  `
}

function getTrainersPokemonAndDisplayOnPage(pokemonsArr) {
  const newArr = pokemonsArr.map(pokemon => {
    return `
    <li>
      ${pokemon.nickname} (${pokemon.species})
      <button class="release" data-pokemon-id="${pokemon.id}">
        Release
      </button>
    </li>
    `
  })
  return newArr.join('')
}

function addEventListenersToPage() {
  mainSection.addEventListener('click', (e) => {
    if (e.target.innerText === 'Add Pokemon') {
      getAndAddPokemonToPage(e.target.dataset.trainerId, e)
    } else if (e.target.innerText === 'Release') {
      releasePokemon(e.target.dataset.trainerId, e)
    }
  })
}

function getAndAddPokemonToPage(trainerId, e) {
  console.log(trainerId)
  fetch(POKEMONS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      trainer_id: `${trainerId}`
    })
  })
  .then(resp => resp.json())
  .then(pokemonObj => addSinglePokemon(pokemonObj, e))
}

function addSinglePokemon(pokemonObj, e) {
  const trainerPokemonUl = e.target.parentElement.querySelector('ul')

  trainerPokemonUl.innerHTML += `
  <li>
    ${pokemonObj.nickname} (${pokemonObj.species})
    <button class="release" data-pokemon-id="${pokemonObj.id}">
      Release
    </button>
  </li>
  `
}

function releasePokemon(trainerId, e) {
  fetch(POKEMONS_URL + '/' + e.target.dataset.pokemonId, {
    method: 'DELETE'
  })
  .then(e.target.parentElement.remove())
}
