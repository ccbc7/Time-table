module Api
  module V1
    class NotesController < ApplicationController
      def index
        @notes = if params[:user_id]
                   Note.where(user_id: params[:user_id])
                 else
                   Note.all
                 end

        render json: notes_with_image_urls(@notes)
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
          render json: json_with_image_url(@note), status: :created
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

      def notes_with_image_urls(notes)
        notes.map do |note|
          if note.image.attached?
            note.as_json.merge(image_url: url_for(note.image))
          else
            note.as_json
          end
        end
      end

      def json_with_image_url(note)
        if note.image.attached?
          note.as_json.merge(image_url: url_for(note.image))
        else
          note
        end
      end
    end
  end
end
