class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all;
    render json: pokemons.to_json(:include => {
    :trainer => {:only => [:id, :name]}
    }, :except => [:created_at, :updated_at])
  end

  def create

    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    trainer_id = params["pokemon"]["trainer_id"]
    new_pokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer_id)
    render json: new_pokemon
  end

  def destroy
    pokemon = Pokemon.find(params[:id])
    pokemon.delete
  end

  private

  def pokemon_params
    params.require(:pokemon).permit(:trainer_id, :nickname, :species)
  end


end
