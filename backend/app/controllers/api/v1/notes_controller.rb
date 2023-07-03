module Api
  module V1
    class NotesController < ApplicationController
      def index
        @notes = if params[:user_id]
                   Note.includes(:user, :location).where(user_id: params[:user_id])
                 elsif params[:location_id]
                   Note.includes(:user, :location).where(location_id: params[:location_id])
                 else
                   Note.includes(:user, :location).all
                 end
        render json: notes_with_user_image_urls(@notes)
      end

      def show
        @note = Note.find(params[:id])
        render json: @note.as_json_with_user_image_url
      end

      def create
        @note = Note.new(note_params)
        @note.user_id = params[:note][:user_id]
        @note.location_id = params[:note][:location_id] if params[:note][:location_id]
        if @note.save
          render json: @note.as_json_with_user_image_url, status: :created
        else
          render json: @note.errors, status: :unprocessable_entity
        end
      end

      def update
        @note = Note.find(params[:id])
        if @note.user_id == params[:note][:user_id] && @note.update(note_params)
          render json: @note.as_json_with_user_image_url, status: :ok
        else
          render json: @note.errors, status: :unprocessable_entity
        end
      end

      def destroy
        @note = Note.find(params[:id])
        if @note.user_id == params[:user_id]
          @note.destroy
          head :no_content
        else
          render json: { error: 'Unauthorized' }, status: :unauthorized
        end
      end

      private

      def note_params
        params.require(:note).permit(:title, :content, :user_id, :location_id)
      end

      def notes_with_user_image_urls(notes)
        notes.map(&:as_json_with_user_image_url)
      end
    end
  end
end
