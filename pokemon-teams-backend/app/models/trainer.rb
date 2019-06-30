class Trainer < ApplicationRecord
    has_many :pokemons

    def add_pokemon
        Pokemon.generate_new_pokemon_for(self.id)
    end
end
