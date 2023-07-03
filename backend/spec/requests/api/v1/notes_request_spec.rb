require 'rails_helper'

RSpec.describe Note, type: :model do
  describe "validation" do
    subject { note.valid? }

    context "データが条件を満たすとき" do
      let(:location) { create(:location) }
      let(:note) { build(:note, location: location) }

      it "保存できること" do
        note.valid? 
        p note.errors.full_messages
        expect(subject).to eq true
      end
    end

    context "user_idがないとき" do
      let(:note) { build(:note, user_id: nil) }
      it "エラーが発生すること" do
        expect(subject).to eq false
        expect(note.errors[:user_id]).to include("を入力してください")
      end
    end

    context "location_idがないとき" do
      let(:note) { build(:note, location_id: nil) }
      it "エラーが発生すること" do
        expect(subject).to eq false
        expect(note.errors[:location_id]).to include("を入力してください")
      end
    end

context "データが条件を満たすとき" do
  let(:note) { build(:note) }
  it "保存できること" do
    p "User: ", note.user
    p "Location: ", note.location
    note.valid?
    p note.errors.full_messages
    expect(subject).to eq true
  end
end

  end
end
