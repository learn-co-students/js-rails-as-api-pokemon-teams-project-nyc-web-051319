require 'faker'

class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all
    render json: pokemons
  end

  def create
    trainer = Trainer.find(params[:trainer_id])
    if trainer.pokemons.length < 6
      pokemon = Pokemon.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name, trainer_id: params[:trainer_id])
      render json: pokemon
    end
  end

  def destroy
    pokemon = Pokemon.find(params[:id])
    pokemon.delete
  end
end
