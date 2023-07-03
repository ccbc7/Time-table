FactoryBot.define do
  factory :user do
    # sequence(:user_id) { |n| "testuser#{n}" }
    sequence(:user_id, 1000) { |n| "testuser#{n}" }
    username { "テストユーザー" }
    bio {"担当"}
  end
end
