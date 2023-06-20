FactoryBot.define do
  factory :reservation do
    user { nil }
    location { nil }
    period { "MyString" }
    date { "2023-06-20" }
  end
end
