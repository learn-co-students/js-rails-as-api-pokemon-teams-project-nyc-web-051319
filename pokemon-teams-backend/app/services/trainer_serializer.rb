class TrainerSerializer < ApplicationController

  def initialize(trainer_object)
    @trainers = trainer_object
  end

  def to_serialized_json
    options = {
      include: {
        pokemons: {
          only: [:id, :nickname, :species, :trainer_id]
        }
      },
      except: [:updated_at, :created_at],
    }
    @trainers.to_json(options)
  end

end
