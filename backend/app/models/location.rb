class Location < ApplicationRecord
  validates :location_name, :location_info, :user_id, presence: true
  has_one_attached :image
  belongs_to :user, foreign_key: 'user_id', primary_key: 'user_id'
  has_many :reservations
  has_many :notes

  def image_url
    return unless image.attached?

    Rails.application.routes.url_helpers.url_for(image)
  end

  def as_json_with_image_url
    as_json.merge(image_url:)
  end

  def self.eager_load_image
    all.with_attached_image
  end

  def self.ransackable_attributes(_auth_object = nil)
    %w[created_at id location_info location_name updated_at user_id]
  end
end
