module Api
  module V1
    class PicturesController < ApplicationController
      def new
        @picture = Picture.new
      end

      def create
        @picture = Picture.new(picture_params)
        if @picture.save
          render json: { id: @picture.id, image_url: rails_blob_url(@picture.image) }, status: :created
        else
          render json: @picture.errors, status: :unprocessable_entity
        end
      end

      def index
        @pictures = Picture.all.map do |picture|
          { id: picture.id, image_url: rails_blob_url(picture.image) }
        end
        render json: @pictures
      end

      def destroy
        @picture = Picture.find(params[:id])
        @picture.destroy
        head :no_content # 削除が成功した場合、HTTPステータスコード204を返します。
      end

      private

      def picture_params
        params.require(:picture).permit(:image)
      end
    end
  end
end
