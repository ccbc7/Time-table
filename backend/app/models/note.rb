class Note < ApplicationRecord
  validates :content, :title, presence: true
  validates :content, :title, :user_id, :location_id, presence: true
  has_one_attached :image
  belongs_to :user, foreign_key: 'user_id', primary_key: 'user_id'
  belongs_to :location

  def as_json(options = {})
    super(options.merge(include: %i[user location]))
  end

  def as_json_with_user_image_url
    as_json.merge(user: user.as_json_with_image_url)
  end
end
