module Api
  module V1
    class ReservationsController < ApplicationController
      before_action :set_reservation, only: %i[show update destroy]

      def index
        @reservations = if params[:location_id]
                          Reservation.where(location_id: params[:location_id]).includes(:location, :user)
                        elsif params[:user_id]
                          Reservation.where(user_id: params[:user_id]).includes(:location, :user)
                        else
                          Reservation.all.includes(:location, :user)
                        end
        @reservations = @reservations.includes(:location).map do |reservation|
          location = Location.eager_load_image.find(reservation.location_id)
          reservation.as_json.merge(
            location: location.as_json_with_image_url,
            message1: location.created_at.to_s(:datetime_jp_reserve),
            message2: "#{location.location_name}が予約されました"
          )
        end
        render json: @reservations
      end

      def show
        render json: @reservation.as_json.merge(location: @reservation.location.as_json_with_image_url)
      end

      def create
        @reservation = Reservation.new(reservation_params)
        if @reservation.save
          render json: @reservation, status: :created
        else
          Rails.logger.error @reservation.errors.full_messages
          render json: @reservation.errors, status: :unprocessable_entity
        end
      end

      def update
        if @reservation.update(reservation_params)
          render json: @reservation.as_json.merge(location: @reservation.location.as_json_with_image_url)
        else
          render json: @reservation.errors, status: :unprocessable_entity
        end
      end

      def destroy
        @reservation.destroy
      end

      private

      def set_reservation
        @reservation = Reservation.find(params[:id])
      end

      def reservation_params
        params.require(:reservation).permit(:location_id, :period, :date, :booked_user_id, :user_id, :facility_user_name, :purpose)
      end
    end
  end
end
