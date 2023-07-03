require 'rails_helper'

RSpec.describe Api::V1::LocationsController, type: :controller do
  let(:user) { create(:user, user_id: 'testuser1') }
  let(:location) { create(:location, user: user) }

  describe "GET /api/v1/locations/all" do
    it "全てのロケーションを返すこと" do
      get :all
      expect(response.status).to eq 200
    end
  end

  describe "GET /api/v1/locations" do
    context "有効なユーザーIDが提供された場合" do
      it "ユーザーの全てのロケーションを返すこと" do
        get :index, params: { user_id: user.user_id }
        expect(response.status).to eq 200
      end
    end
  end

  describe "GET /api/v1/locations/:id" do
    context "有効なロケーションIDが提供された場合" do
      it "ロケーションの詳細を返す" do
        get :show, params: { id: location.id }
        expect(response.status).to eq 200
      end
    end
  end

  describe "POST /api/v1/locations" do
    context "有効なパラメータが提供された場合" do
      it "新しいロケーションを作成する" do
        post :create, params: { location: attributes_for(:location, user_id: user.user_id) }
        expect(response.status).to eq 201
      end
    end

    context "無効なパラメータが提供された場合" do
      it "エラーメッセージを返す" do
        post :create, params: { location: { user_id: user.user_id } }
        expect(response.status).to eq 422
      end
    end
  end
end
