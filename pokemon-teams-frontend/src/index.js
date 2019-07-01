const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {

  const trainersContainer = document.querySelector("#trainers-container")

  fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json =>
    json.forEach((trainer)=> {
      // console.log(json)
      const trainerCard = document.createElement("div")
      trainerCard.className = "card";
      trainerCard.setAttribute('data-id', trainer.id)
      const trainersPokemons = trainer.pokemons
      // console.log(trainersPokemons)
      trainerCard.innerHTML = `
        <p>${trainer.name}</p>
        <button data-trainer-id="${trainer.id}">Add Pokemon</button>
        <ul class = "pokemons">
        </ul>
      `;

      for (let i = 0; i < trainersPokemons.length; i++) {
        trainerCard.querySelector(".pokemons").innerHTML += `
        <li>${trainersPokemons[i].species} (${trainersPokemons[i].nickname})
        <button class="release" id = "${trainersPokemons[i].id}">Release</button></li>
        `;
      }

      trainersContainer.appendChild(trainerCard)
    }));

    trainersContainer.addEventListener('click', (e) => {
      const data = {"trainer_id": e.target.dataset.trainerId}
      if (e.target.innerText === "Add Pokemon") {
        if (e.target.nextElementSibling.children.length < 6) {
        fetch(POKEMONS_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(data)
        })//end fetch
        .then(resp => resp.json())
        .then(json => {
          // debugger
          const thisTrainerCard = trainersContainer.querySelector(`[data-id="${json.trainer_id}"]`)
          const pokemonListContainer = thisTrainerCard.querySelector(".pokemons")
          pokemonListContainer.innerHTML +=  `
            <li>${json.species} (${json.nickname})
            <button class="release" id = "${json.id}">Release</button></li>
          `
        })
      }//end second if statement
      else {
        window.alert("You have too many pokemons!")
      }

    }//end first if statement
    else if (e.target.className === "release") {
      fetch(`${POKEMONS_URL}/${e.target.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      })
      .then(
        e.target.parentElement.remove()
      )

    }
    })

})
