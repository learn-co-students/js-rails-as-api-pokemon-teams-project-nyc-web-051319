class PokemonsController < ApplicationController

    def show
        pokemon = Pokemon.find_by(id: params[:id])
        render json: PokemonSerializer.new(pokemon)
    end

    def create
        trainer = Trainer.find(params[:trainer_id])
        if trainer.pokemons.count >= 6
            render json: {
                status: "error",
                message: "cannot have more than 6 pokemons",
                code: 4000
            }
        else
            new_pokemon = Pokemon.generate_new_pokemon_for(params[:trainer_id])
            render json: PokemonSerializer.new(new_pokemon)
        end
    end

    def destroy 
        Pokemon.delete(params[:pokemon_id])       
    end
end
