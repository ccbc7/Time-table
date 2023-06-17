



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

      # def index
      #   @pictures = Picture.all.map do |picture|
      #     { id: picture.id, image_url: rails_blob_url(picture.image) }
      #   end
      #   render json: @pictures
      # end
# def index
#   @pictures = Picture.all.map do |picture|
#     { id: picture.id, image_url: rails_blob_url(picture.image), created_at: picture.created_at }
#   end
#   render json: @pictures
# end
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

      # def picture_params
      #   params.require(:picture).permit(:image)
      # end
# def picture_params
#   params.require(:picture).permit(:image, :user_id) # user_idを許可
# end
def picture_params
  params.require(:picture).permit(:image).merge(user_id: params[:user_id].to_i)
end

    end
  end
end



# module Api
#   module V1
# class PicturesController < ApplicationController
#   before_action :set_picture, only: [:show, :edit, :update, :destroy]

#   # GET /pictures
#   def index
#     @pictures = Picture.where(user_id: params[:user_id])
#   end

#   # POST /pictures
#   def create
#     @picture = Picture.new(picture_params)
#     @picture.user_id = params[:user_id]

#     if @picture.save
#       render json: @picture, status: :created
#     else
#       render json: @picture.errors, status: :unprocessable_entity
#     end
#   end

#   # PUT /pictures/:id
#   def update
#     if @picture.user_id == params[:user_id] && @picture.update(picture_params)
#       render json: @picture
#     else
#       render json: @picture.errors, status: :unprocessable_entity
#     end
#   end

#   # DELETE /pictures/:id
#   def destroy
#     if @picture.user_id == params[:user_id]
#       @picture.destroy
#       head :no_content
#     else
#       render json: { error: "Unauthorized" }, status: :unauthorized
#     end
#   end

#   private

#   def set_picture
#     @picture = Picture.find(params[:id])
#   end

#   def picture_params
#     params.require(:picture).permit(:image)
#   end
# end
# end
# end
