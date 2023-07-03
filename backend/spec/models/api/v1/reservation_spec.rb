require 'rails_helper'

RSpec.describe Reservation, type: :model do
  describe 'バリデーション' do
    it "すべての属性が正しく設定され、有効であること" do
      reservation = FactoryBot.create(:reservation)
      expect(reservation).to be_valid
    end

    it '期間がなければ無効' do
      reservation = build(:reservation, period: nil)
      reservation.valid?
      expect(reservation.errors[:period]).to include("を入力してください")
    end

    it '日付がなければ無効' do
      reservation = build(:reservation, date: nil)
      reservation.valid?
      expect(reservation.errors[:date]).to include("を入力してください")
    end

    it '施設ユーザー名がなければ無効' do
      reservation = build(:reservation, facility_user_name: nil)
      reservation.valid?
      expect(reservation.errors[:facility_user_name]).to include("を入力してください")
    end

    it '目的がなければ無効' do
      reservation = build(:reservation, purpose: nil)
      reservation.valid?
      expect(reservation.errors[:purpose]).to include("を入力してください")
    end

    it 'locationがなければ無効' do
      reservation = build(:reservation, location: nil)
      reservation.valid?
      expect(reservation.errors[:location]).to include("を入力してください")
    end

    it 'userがなければ無効' do
      reservation = build(:reservation, user: nil)
      reservation.valid?
      expect(reservation.errors[:user]).to include("を入力してください")
    end
  end
end
