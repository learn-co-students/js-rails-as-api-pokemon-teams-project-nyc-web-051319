const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function() {
  function fetchTrainers() {
    const trainerInfo = fetch(`${TRAINERS_URL}`)
      .then(res => res.json())
      .then(json => {
          for (var trainer of json) { //tryna make 'trainer' global for the iteration

            //CREATE TRAINER CARD
            const trainerCard = document.createElement('div')
            trainerCard.className = "card"

            //CREATE TRAINER NAME
            const trainerName = document.createElement('p')
            trainerName.innerText = trainer.name
            trainerCard.appendChild(trainerName)

            //CREATE BUTTON TO ADD POKEMON
            const addPokemon = document.createElement('button')
            addPokemon.innerText = "Add Pokemon"
            addPokemon.addEventListener('click', function(e){
              if (trainer.pokemon.length < 6) {
                const formData = {
                  "species": "",
                  "nickname": "",
                  "trainer_id": Math.floor(Math.random() * 7) + 1,
                };

                const configObj = {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                  },
                  body: JSON.stringify(formData)
                };

                fetch("http://localhost:3000/pokemons", configObj)
                  .then(res => res.json())
                  .then(function(object) {
                    const newPokemon = document.createElement('li')
                    const deletePokemon = document.createElement('button')
                    deletePokemon.innerText = "Release"
                    deletePokemon.addEventListener('click', function(e){
                        function deleteData() {
                          return fetch("http://localhost:3000/pokemons" + '/' + `${pokemon.id}`, {
                            method: 'delete'
                          })
                          .then(response => response.json());
                        }
                        deleteData()
                      })
                    newPokemon.innerText = object.species + " " + object.nickname
                    newPokemon.appendChild(deletePokemon)
                    listOfPokemon.appendChild(newPokemon)
                  })
              }
            })
            trainerCard.appendChild(addPokemon)

            //CREATE LIST OF POKEMON WITH DELETE BUTTONS
            const listOfPokemon = document.createElement('ul')
            for (const pokemon of trainer.pokemon) {
              const eachPokemon = document.createElement('li')
              eachPokemon.innerText = pokemon.nickname + " " + pokemon.species
              const deletePokemon = document.createElement('button')
              deletePokemon.innerText = "Release"
              deletePokemon.addEventListener('click', function(e){
                function deleteData() {
                  return fetch("http://localhost:3000/pokemons" + '/' + `${pokemon.id}`, {
                    method: 'delete'
                  })
                  .then(response => response.json());
                  }
                deleteData()
              })
              eachPokemon.appendChild(deletePokemon)
              listOfPokemon.appendChild(eachPokemon)
            }

            trainerCard.appendChild(listOfPokemon)

            //CREATE DIV FOR LIST OF TRAINERS
            const listOfTrainers = document.createElement("div")
            listOfTrainers.appendChild(trainerCard)

            //APPEND LIST OF TRAINERS TO MAIN
            const mainMenu = document.getElementsByTagName('main')[0]
            mainMenu.appendChild(listOfTrainers)
          }
        })
      }
  fetchTrainers()
})
