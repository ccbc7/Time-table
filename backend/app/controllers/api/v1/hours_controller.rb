module Api
  module V1
    class HoursController < ApplicationController
      before_action :set_hour, only: [:update]

      # GET /hours
      def index
        @hours = Hour.all

        render json: @hours
      end

      # PATCH/PUT /hours/1
      def update
        if @hour.update(hour_params)
          render json: @hour
        else
          render json: @hour.errors, status: :unprocessable_entity
        end
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_hour
        @hour = Hour.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def hour_params
        params.require(:hour).permit(:period)
      end
    end
  end
end
