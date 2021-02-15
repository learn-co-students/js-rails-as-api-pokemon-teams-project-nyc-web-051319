class TrainersController < ApplicationController
    def index
        trainer = Trainer.all
        render json: trainer, :include => :pokemons
    end

    def show
        @trainer = Trainer.find(params[:id])
        render json: @trainer, :include => :pokemons
    end
end
