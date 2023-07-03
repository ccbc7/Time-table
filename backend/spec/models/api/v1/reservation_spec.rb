# require 'rails_helper'

# RSpec.describe Reservation, type: :model do
#   describe 'associations' do
#     it { should belong_to(:user) }
#     it { should belong_to(:location) }
#   end

#   describe 'validations' do
#     subject { build(:reservation) }

#     it { should validate_presence_of(:location_id) }
#     it { should validate_presence_of(:user_id) }
#     it { should validate_presence_of(:period) }
#     it { should validate_presence_of(:date) }
#     it { should validate_presence_of(:facility_user_name) }
#     it { should validate_presence_of(:purpose) }
#   end
# end


require 'rails_helper'

RSpec.describe Reservation, type: :model do
  describe 'バリデーション' do
    it '全ての属性が正しければ有効' do
      reservation = build(:reservation)
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
