module Api
  module V1
    class PicturesController < ApplicationController
      def new
        @picture = Picture.new
      end

      def create
        @picture = Picture.new(picture_params)
        puts @picture.user_id
        if @picture.save
          render json: { id: @picture.id, image_url: rails_blob_url(@picture.image) }, status: :created
        else
          render json: @picture.errors, status: :unprocessable_entity
        end
      end

      def index
        @pictures = Picture.all.map do |picture|
          { id: picture.id, image_url: rails_blob_url(picture.image), user_id: picture.user_id }
        end
        render json: @pictures
      end

      def update
        @picture = Picture.find(params[:id])
        if @picture.update(picture_params)
          render json: { id: @picture.id, image_url: rails_blob_url(@picture.image) }, status: :ok
        else
          render json: @picture.errors, status: :unprocessable_entity
        end
      end

      def destroy
        @picture = Picture.find(params[:id])
        @picture.destroy
        head :no_content
      end

      private

      def picture_params
        params.require(:picture).permit(:image).merge(user_id: params[:user_id].to_i)
      end
    end
  end
end
