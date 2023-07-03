class User < ApplicationRecord
  has_one_attached :image
  has_many :locations, foreign_key: 'user_id', primary_key: 'user_id'
  has_many :reservations
  has_many :notes, foreign_key: 'user_id', primary_key: 'user_id'
  def image_url
    return unless image.attached?
    Rails.application.routes.url_helpers.url_for(image)
  end

  def as_json_with_image_url
    as_json.merge(image_url: image_url)
  end

  def self.eager_load_image
    all.with_attached_image
  end
end
