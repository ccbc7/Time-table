module Api
  module V1
    class LocationsController < ApplicationController
      before_action :set_user, only: %i[create edit update destroy]
      before_action :set_location, only: %i[show edit update destroy]

      def all
        @q = Location.includes(:user, image_attachment: :blob).ransack(params[:q])
        @locations = @q.result
        render json: locations_with_image_urls(@locations)
      end

      def index
        @user = User.find_by(user_id: params[:user_id])
        if @user.nil?
          render json: { error: 'User not found' }, status: :not_found
          return
        end
        @locations = @user.locations.includes(:user, image_attachment: :blob)
        render json: locations_with_image_urls(@locations)
      end

      def show
        @location = Location.includes(:user, image_attachment: :blob).find_by(id: params[:id])
        render json: location_with_image_url(@location)
      end

      def create
        Rails.logger.debug("create params: #{params.inspect}")
        @user = User.find_by(user_id: params[:location][:user_id])
        if @user.nil?
          render json: { error: 'User not found' }, status: :not_found
          return
        end

        @location = @user.locations.new(location_params)

        if @location.save
          render json: @location, status: :created
        else
          render json: { errors: @location.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        @location.update(location_params)
        @location.image.attach(params[:location][:image]) if params[:location][:image]
        render json: location_with_image_url(@location), status: :ok
      end

      def destroy
        @location.destroy
        head :no_content
      end

      private

      def location_params
        params.require(:location).permit(:location_name, :image, :user_id, :location_info)
      end

      def set_user
        @user = if params[:location]
                  User.find_by(user_id: params[:location][:user_id])
                else
                  User.find_by(user_id: params[:user_id])
                end
        return if @user

        render json: { error: 'User not found' }, status: 404
        nil
      end

      def set_location
        @location = @user.locations.find_by!(id: params[:id]) if @user
      end

      def locations_with_image_urls(locations)
        locations.map do |location|
          location_with_image_url(location)
        end
      end

      def location_with_image_url(location)
        if location.image.attached?
          location.as_json.merge(image_url: url_for(location.image), username: location.user.username)
        else
          location.as_json.merge(username: location.user.username)
        end
      end
    end
  end
end
