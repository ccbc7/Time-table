FactoryBot.define do
  factory :reservation do
    association :location
    association :user
    period { "1時間目" }
    date { "2023-07-01" }
    booked_user_id { nil }
    facility_user_name { "3年" }
    purpose { "授業" }
  end
end
