module Api
  module V1
    class ReservationsController < ApplicationController
      before_action :set_reservation, only: [:show, :update, :destroy]

      def index
        if params[:location_id]
          @reservations = Reservation.where(location_id: params[:location_id])
        elsif params[:user_id]
          @reservations = Reservation.where(user_id: params[:user_id])
        else
          @reservations = Reservation.all
        end
        render json: @reservations.map { |reservation|
          reservation.as_json.merge(location: reservation.location.as_json_with_image_url)
        }
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
