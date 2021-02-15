class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all
    render json: pokemons, include: [:trainer]
  end

  def create
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    if Trainer.find(params[:trainer_id]).pokemons.length < 6
      pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
      render json: pokemon, status: 200
    else
      render json: {error: "Too many pokemon" }, status: 422
    end
  end

  def destroy
    pokemon = Pokemon.find(params[:id])
    pokemon.destroy
    render json: pokemon
  end
end
