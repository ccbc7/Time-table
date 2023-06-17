# module Api
#   module V1
#     class IconsController < ApplicationController
#       def create
#         user = User.find_by(firebase_uid: params[:user_id])
#         if user.nil?
#           render json: { error: 'User not found' }, status: :unprocessable_entity
#           return
#         end

#         icon = Icon.new(user_id: user.id, image: params[:icon][:image])

#         if icon.save
#           render json: { id: icon.id, image_url: rails_blob_url(icon.image) }, status: :created
#         else
#           Rails.logger.info icon.errors.full_messages
#           render json: icon.errors, status: :unprocessable_entity
#         end
#       end

#       def update
#         icon = Icon.find_by(user_id: params[:user_id])
#         icon.image.attach(params[:image])
#         if icon.save
#           render json: { id: icon.id, image_url: rails_blob_url(icon.image) }, status: :ok
#         else
#           render json: icon.errors, status: :unprocessable_entity
#         end
#       end

#       def destroy
#         icon = Icon.find_by(user_id: params[:user_id])
#         icon.destroy
#         head :no_content
#       end

#       private
#         def icon_params
#           params.require(:icon).permit(:user_id, :image)
#         end
#     end
#   end
# end


# module Api
#   module V1
#     class IconsController < ApplicationController
#       def create
#         user = User.find_by(firebase_uid: params[:user_id])
#         if user.nil?
#           render json: { error: 'User not found' }, status: :unprocessable_entity
#           return
#         end

#         icon = Icon.new(user_id: user.id, image: params[:icon][:image])

#         if icon.save
#           render json: { id: icon.id, image_url: rails_blob_url(icon.image) }, status: :created
#         else
#           Rails.logger.info icon.errors.full_messages
#           render json: icon.errors, status: :unprocessable_entity
#         end
#       end

#       def update
#         user = User.find_by(firebase_uid: params[:user_id])
#         if user.nil?
#           render json: { error: 'User not found' }, status: :unprocessable_entity
#           return
#         end

#         icon = Icon.find_by(user_id: user.id)
#         if icon.nil?
#           render json: { error: 'Icon not found' }, status: :unprocessable_entity
#           return
#         end

#         icon.image.attach(params[:icon][:image])
#         if icon.save
#           render json: { id: icon.id, image_url: rails_blob_url(icon.image) }, status: :ok
#         else
#           render json: icon.errors, status: :unprocessable_entity
#         end
#       end

#       def destroy
#         user = User.find_by(firebase_uid: params[:user_id])
#         if user.nil?
#           render json: { error: 'User not found' }, status: :unprocessable_entity
#           return
#         end

#         icon = Icon.find_by(user_id: user.id)
#         if icon.nil?
#           render json: { error: 'Icon not found' }, status: :unprocessable_entity
#           return
#         end

#         icon.destroy
#         head :no_content
#       end

#       private
#         def icon_params
#           params.require(:icon).permit(:user_id, :image)
#         end
#     end
#   end
# end




module Api
  module V1
    class IconsController < ApplicationController
      def create
        user = User.find_by(firebase_uid: params[:user_id])
        if user.nil?
          render json: { error: 'User not found' }, status: :unprocessable_entity
          return
        end

        icon = Icon.new(user_id: user.id, image: params[:icon][:image])

        if icon.save
          render json: { id: icon.id, image_url: rails_blob_url(icon.image) }, status: :created
        else
          Rails.logger.info icon.errors.full_messages
          render json: icon.errors, status: :unprocessable_entity
        end
      end

      def show
        icon = Icon.find_by(user_id: params[:user_id])
        if icon
          render json: { id: icon.id, image_url: rails_blob_url(icon.image) }, status: :ok
        else
          render json: { error: 'Icon not found' }, status: :not_found
        end
      end

def update
  user = User.find_by(firebase_uid: params[:user_id])
  if user.nil?
    render json: { error: 'User not found' }, status: :unprocessable_entity
    return
  end

  icon = Icon.find_by(user_id: user.id)
  icon ||= Icon.new(user_id: user.id)  # If icon is nil, create a new Icon instance

  icon.image.attach(params[:icon][:image])
  if icon.save
    render json: { id: icon.id, image_url: rails_blob_url(icon.image) }, status: :ok
  else
    render json: icon.errors, status: :unprocessable_entity
  end
end


      def destroy
        icon = Icon.find_by(user_id: params[:user_id])
        icon.destroy
        head :no_content
      end

      private
        def icon_params
          params.require(:icon).permit(:user_id, :image)
        end
    end
  end
end
