class Location < ApplicationRecord
  has_one_attached :image
  # belongs_to :user, foreign_key: 'user_id'
  belongs_to :user, foreign_key: 'user_id', primary_key: 'user_id'
  has_many :reservations
end
