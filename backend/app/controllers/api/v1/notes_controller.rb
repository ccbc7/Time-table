module Api
  module V1
    class NotesController < ApplicationController
      def index
        if params[:user_id]
          @notes = Note.where(user_id: params[:user_id])
        else
          @notes = Note.all
        end

        @notes_with_image_url = @notes.map do |note|
          if note.image.attached?
            note.as_json.merge(image_url: url_for(note.image))
          else
            note.as_json
          end
        end

        render json: @notes_with_image_url
      end

      def show
        @note = Note.find(params[:id])
        render json: @note.as_json.merge(image_url: rails_blob_url(@note.image))
      end

      def create
        @note = Note.new(note_params)
        @note.user_id = params[:note][:user_id]  # リクエストから userId を取得して user_id をセット
        @note.image.attach(params[:note][:image]) if params[:note][:image]

        if @note.save
          render json: @note.as_json.merge(image_url: url_for(@note.image)), status: :created
        else
          render json: @note.errors, status: :unprocessable_entity
        end
      end

      def update
        @note = Note.find(params[:id])

        if @note.user_id == params[:note][:user_id] && @note.update(note_params)
          render json: @note, status: :ok
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
        params.require(:note).permit(:title, :content, :user_id, :image)
      end

    end
  end
end
