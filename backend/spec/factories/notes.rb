FactoryBot.define do
  factory :note do
    title { "Sample Note" }
    content { "This is a sample note content." }
    user { create(:user) }
    location { create(:location) }
  end
end
