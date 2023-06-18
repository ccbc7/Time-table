FactoryBot.define do
  factory :user do
    firebase_uid { "MyString" }
      sequence(:username) { |n| "test_user#{n}" } # ユニークなユーザー名を生成するためのシーケンス
      sequence(:user_id) { |n| n } # ユニークなユーザーIDを生成するためのシーケンス
      bio { "This is a bio" }
  end
end
