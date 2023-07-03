FactoryBot.define do
  factory :location do
    user
    location_name { "サンプル施設1" }
    location_info { "サンプル施設情報1" }
  end
end
