require 'rails_helper'

RSpec.describe Note, type: :model do
  let(:user) { create(:user) }
  let(:location) { create(:location, user: user) }
  let(:note) { build(:note, user: user, location: location) }

  describe "validations" do
    it "有効な属性が設定されていれば有効に動くこと" do
      expect(note).to be_valid
    end

    it "titleが無いと無効であること" do
      note.title = nil
      expect(note).not_to be_valid
      expect(note.errors[:title]).to include("を入力してください")
    end

    it "contentが無いと無効であること" do
      note.content = nil
      expect(note).not_to be_valid
      expect(note.errors[:content]).to include("を入力してください")
    end

    it "user_idユーザーIDが無いと無効であること" do
      note.user_id = nil
      expect(note).not_to be_valid
      expect(note.errors[:user_id]).to include("を入力してください")
    end

    it "location_idが無いと無効であること" do
      note.location_id = nil
      expect(note).not_to be_valid
      expect(note.errors[:location_id]).to include("を入力してください")
    end
  end

  describe "associations" do
    it "userに属していること" do
      expect(note.user).to eq(user)
    end

    it "locationに属していること" do
      expect(note.location).to eq(location)
    end
  end
end
