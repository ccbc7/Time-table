class User < ApplicationRecord
  has_one_attached :image
  # has_many :locations, primary_key: 'user_id'
  has_many :locations, foreign_key: 'user_id', primary_key: 'user_id'
  has_many :reservations
end
