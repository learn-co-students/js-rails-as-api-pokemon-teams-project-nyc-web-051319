class PokemonsController < ApplicationController

  def index
    @pokemons = Pokemon.all
    render json: @pokemons
  end

  def show
    @pokemon = Pokemon.find(params[:id])
    render json: @pokemon
  end

  def new
    @pokemon = Pokemon.find(params[:id])
  end

  def create
    pokemon = Pokemon.create(species: Faker::Games::Pokemon.name, nickname: Faker::Name.first_name, trainer_id: rand(1..8))
    render json: pokemon
  end

  def destroy
    @pokemon = Pokemon.find(params[:id])
    @pokemon.delete
    render json: @pokemon
  end

  # def release
  #   pokemon = pokemon.find(params[:id])
  #   pokemon.update(trainer_id: nil)
  # end

  private

  def pokemon_params
    params.require(:pokemon).permit(:species, :nickname, :trainer_id)
  end

end
