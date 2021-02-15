const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const randomPokemons = []

fetch(TRAINERS_URL)
.then(resp => {return resp.json()})
.then(trainer => {
  addTrainer(trainer)
})




function addTrainer(trainer){
  const mainContainer = document.querySelector("#holder")
  trainer.forEach(trainer => {
    const card = document.createElement("div")
    card.className = "card"
    card.dataset.id = `${trainer.id}`
    card.innerHTML += `
    <p>${trainer.name}</p>
    <button data-trainer-id="${trainer.id}">Add Pokemon</button>
    `

    const pokemonContainer = document.createElement("ul")
    trainer.pokemons.forEach(pokemon => {
      // debugger
      pokemonContainer.innerHTML += `
      <li>${pokemon.species} ${pokemon.nickname}<button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>

      `
    })
    card.appendChild(pokemonContainer)
    mainContainer.appendChild(card)
    card.addEventListener("click", function(e){
      if(e.target.innerText == "Add Pokemon"){
        fetch(POKEMONS_URL,{
          method: "POST",
          headers:
          {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body:
          JSON.stringify({
            trainer_id: `${e.target.dataset.trainerId}`
          })
        })
        .then(resp => resp.json())
        .then(pokemon => {
          debugger
          }
        )
      }else if(e.target.innerText === "Release"){
        fetch(POKEMONS_URL+`/${e.target.dataset.pokemonId}`,{
          method: "DELETE"
        //   headers:
        //   {
        //     'Content-Type': 'application/json',
        //     Accept: 'application/json'
        //   },
        //   body: JSON.stringify({id: e.target.dataset.pokemonId})
        })
        .then(json => {
          e.target.parentElement.remove()        })
      }
    })
  })
}

function randomPokemon(){
  fetch(POKEMONS_URL)
  .then(resp => {return resp.json()})
  .then(pokemon => {
    pokemon.forEach(pokemon =>{
	 if(pokemon.id === getRandomInt(1,31)){
        randomPokemons.push(pokemon)
        debugger
   }
  })
  })
}

function getRandomInt(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

// fetch(POKEMONS_URL)
// .then(resp => {return resp.json()})
// .then(pokemon => {
//   randomPokmon(pokemon)
// })
