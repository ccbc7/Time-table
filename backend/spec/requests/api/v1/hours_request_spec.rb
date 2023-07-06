require 'rails_helper'

RSpec.describe "Api::V1::Hours", type: :request do
  before do
    Hour.delete_all
  end

  let!(:hour) { create(:hour) }
  let(:valid_attributes) { { period: '9:00-10:00' } }
  let(:invalid_attributes) { { period: '' } }

  describe "GET /index" do
    before { get "/api/v1/hours" }

    it '正常なレスポンスを返すこと' do
      expect(response).to be_successful
    end

    it 'JSONレスポンスが期待する時間属性を含むこと' do
      json_response = JSON.parse(response.body)
      expect(json_response[0]['period']).to eq(hour.period)
    end
  end

  describe "PATCH /update" do
    context '有効なパラメータの場合' do
      before { patch "/api/v1/hours/#{hour.id}", params: { hour: valid_attributes } }

      it '要求された時間を更新すること' do
        hour.reload
        expect(hour.period).to eq('9:00-10:00')
      end

      it '正常なレスポンスを返すこと' do
        expect(response).to be_successful
      end
    end

    context '無効なパラメータの場合' do
      before { patch "/api/v1/hours/#{hour.id}", params: { hour: invalid_attributes } }

      it '要求された時間を更新しないこと' do
        hour.reload
        expect(hour.period).to eq(hour.period)
      end

      it 'エラーレスポンスを返すこと' do
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
