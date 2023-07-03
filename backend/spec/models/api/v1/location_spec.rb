require 'rails_helper'

RSpec.describe Location, type: :model do
  let(:user) { create(:user) }
  let(:location) { create(:location, user: user) }

  describe "バリデーション" do
    it "有効な属性が設定されていれば有効に動くこと" do
      expect(location).to be_valid
    end

    it "施設名が無いと無効であること" do
      location.location_name = nil
      location.valid? 
      expect(location.errors[:location_name]).to include("を入力してください")
    end

    it "施設情報が無いと無効であること" do
      location.location_info = nil
      location.valid? 
      expect(location.errors[:location_info]).to include("を入力してください")
    end

    it "ユーザーIDが無いと無効であること" do
      location.user_id = nil
      location.valid? 
      expect(location.errors[:user_id]).to include("を入力してください")
    end
  end

  describe "アソシエーション" do
    it "ユーザーに所属していること" do
      expect(location.user).to eq(user)
    end

    it "複数の予約を持つことができること" do
      expect(location.reservations.length).to eq(0)
      location.reservations.create!(
        user: user,
        period: "1時間目",
        date: Date.today,
        facility_user_name: "３年",
        purpose: "授業"
      )
      expect(location.reservations.length).to eq(1)
    end

    it "複数のノートを持つことができること" do
      expect(location.notes.length).to eq(0)
      location.notes.create!(user: user, content: "Test content", title: "Test title")
      expect(location.notes.length).to eq(1)
    end
  end
end
