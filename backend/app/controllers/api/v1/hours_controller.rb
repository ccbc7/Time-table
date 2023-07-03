module Api
  module V1
    class HoursController < ApplicationController
      before_action :set_hour, only: [:update]

      def index
        @hours = Hour.all
        render json: @hours
      end

      def update
        if @hour.update(hour_params)
          render json: @hour
        else
          render json: @hour.errors, status: :unprocessable_entity
        end
      end

      private

      def set_hour
        @hour = Hour.find(params[:id])
      end

      def hour_params
        params.require(:hour).permit(:period)
      end
    end
  end
end
