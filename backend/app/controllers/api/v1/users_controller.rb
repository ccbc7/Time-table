module Api
  module V1
    class UsersController < ApplicationController
      def index
        @users = if params[:user_id]
                   User.includes(image_attachment: :blob).where(user_id: params[:user_id]).order(created_at: :desc).limit(1)
                 else
                   User.includes(image_attachment: :blob).all
                 end

        @users_with_image_url = @users.map do |user|
          if user.image.attached?
            user.as_json.merge(image_url: url_for(user.image))
          else
            user.as_json
          end
        end

        render json: @users_with_image_url
      end

      def show
        @user = User.includes(image_attachment: :blob).find_by(user_id: params[:id])

        if @user
          if @user.image.attached?
            render json: @user.as_json.merge(image_url: rails_blob_url(@user.image))
          else
            render json: @user
          end
        else
          render json: { error: 'User not found' }, status: :not_found
        end
      end

      def create
        @user = User.new(user_params)
        @user.user_id = params[:user][:user_id]
        @user.image.attach(params[:user][:image]) if params[:user][:image]

        if @user.save
          if @user.image.attached?
            render json: @user.as_json.merge(image_url: url_for(@user.image)), status: :created
          else
            render json: @user, status: :created
          end
        else
          render json: @user.errors, status: :unprocessable_entity
        end
      end

      def update
        @user = User.find_by(user_id: params[:id])

        if @user&.update(user_params)
          render json: @user, status: :ok
        else
          render json: (@user ? @user.errors : { error: 'User not found' }), status: :unprocessable_entity
        end
      end

      private

      def user_params
        params.require(:user).permit(:user_id, :image, :bio, :username)
      end
    end
  end
end
