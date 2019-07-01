class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all
    render json: pokemons
  end

  def show
    pokemon = Pokemon.find(params[:id])
    render json: pokemon
  end

  def create
    pokemon = Pokemon.create(nickname: "john", species: "nobody")
    render json: pokemon
  end

  def destroy
    pokemon = Pokemon.find(params[:id])
    pokemon.delete
    #render json: pokemon
  end
end
