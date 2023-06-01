module Api
  module V1
    class NotesController < ApplicationController
      def index
        @notes = Note.all

        render json: @notes
      end

      def create
        @note = Note.new(note_params)

        if @note.save
          render json: @note, status: :created
        else
          render json: @note.errors, status: :unprocessable_entity
        end
      end

      def destroy
        @note = Note.find(params[:id])
        @note.destroy
        head :no_content 
      end

      private

      def set_note
        @note = Note.find(params[:id])
      end

      def note_params
        params.require(:note).permit(:title, :content)
      end
    end
  end
end
