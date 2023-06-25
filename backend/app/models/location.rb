class Location < ApplicationRecord
  has_one_attached :image
  # belongs_to :user, foreign_key: 'user_id'
  belongs_to :user, foreign_key: 'user_id', primary_key: 'user_id'
  has_many :reservations

  def image_url
    if image.attached?
      Rails.application.routes.url_helpers.url_for(image)
    else
      nil
    end
  end
  
  def as_json_with_image_url
    as_json.merge(image_url: image_url)
  end
end
