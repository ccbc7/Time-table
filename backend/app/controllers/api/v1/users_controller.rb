module Api
  module V1
    class UsersController < ApplicationController
      def index
        @users = if params[:user_id]
                   User.where(user_id: params[:user_id]).order(created_at: :desc).limit(1)
                 else
                   User.all
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
        @user = User.find_by(user_id: params[:id])

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
        @user.user_id = params[:user][:user_id] # リクエストから userId を取得して user_id をセット
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

      def destroy
        @user = User.find(params[:id])
        if @user.user_id == params[:user_id]
          @user.destroy
          head :no_content
        else
          render json: { error: 'Unauthorized' }, status: :unauthorized
        end
      end

      private

      def user_params
        params.require(:user).permit(:title, :content, :user_id, :image, :bio, :username)
      end
    end
  end
end
