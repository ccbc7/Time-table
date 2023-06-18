require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :controller do
  describe "GET #index" do
    let!(:user) { create(:user) } # 事前にユーザーを作成します。FactoryBotを想定しています。

    context 'user_idパラメータが指定されたとき' do
      before do
        get :index, params: { user_id: user.user_id }
      end

      it 'user_id に関連するユーザーを返すこと' do
        json = JSON.parse(response.body)
        expect(json.first['user_id']).to eq(user.user_id)
      end
    end
  end
end
