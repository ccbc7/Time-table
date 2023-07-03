require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { create(:user) }

  describe 'associations' do
    it { should have_many(:locations).with_foreign_key('user_id').with_primary_key('user_id') }
    it { should have_many(:reservations) }
    it { should have_many(:notes).with_foreign_key('user_id').with_primary_key('user_id') }
  end
end
