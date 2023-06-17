class User < ApplicationRecord
  has_one_attached :image# has_many :notes, primary_key: 'firebase_uid', foreign_key: 'user_id'
end
