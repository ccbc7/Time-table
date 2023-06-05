module Api
  module V1
    class NotesController < ApplicationController
      def index
        if params[:user_id]
          @notes = Note.where(user_id: params[:user_id])
        else
          @notes = Note.all
        end

        render json: @notes
      end

      def create
        @note = Note.new(note_params)
        @note.user_id = params[:user_id]  # リクエストから userId を取得して user_id をセット

        if @note.save
          render json: @note, status: :created
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

      def set_note
        @note = Note.find(params[:id])
      end

      def note_params
        params.require(:note).permit(:title, :content, :user_id)
      end
    end
  end
end
