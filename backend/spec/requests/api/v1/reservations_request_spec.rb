require 'rails_helper'

RSpec.describe Api::V1::ReservationsController, type: :request do
  describe "GET #index" do
    let!(:reservations) { create_list(:reservation, 5) }

    it "リクエストが成功すること" do
      get api_v1_reservations_path
      expect(response.status).to eq 200
    end

    it "全ての予約が取得できること" do
      get api_v1_reservations_path
      expect(json.size).to eq 5
    end
  end

  describe "POST #create" do
    context "有効なパラメータが提供された場合" do
      let(:valid_params) do
        {
          reservation: {
            location_id: create(:location).id,
            user_id: create(:user).user_id,
            period: "1時間目",
            date: "2023-07-01",
            facility_user_name: "3年",
            purpose: "授業"
          }
        }
      end

      it "リクエストが成功すること" do
        post api_v1_reservations_path, params: valid_params
        expect(response.status).to eq 201
      end

      it "新しい予約が作成されること" do
        expect {
          post api_v1_reservations_path, params: valid_params
        }.to change(Reservation, :count).by(1)
      end
    end

    context "無効なパラメータが提供された場合" do
      let(:invalid_params) do
        {
          reservation: {
            location_id: nil,
            user_id: nil,
            period: "1時間目",
            date: "2023-07-01",
            facility_user_name: "3年",
            purpose: "授業"
          }
        }
      end

      it "リクエストが成功しないこと" do
        post api_v1_reservations_path, params: invalid_params
        expect(response.status).to eq 422
      end

      it "新しい予約が作成されないこと" do
        expect {
          post api_v1_reservations_path, params: invalid_params
        }.not_to change(Reservation, :count)
      end
    end
  end
  # Add other tests for #show, #update and #destroy
end
