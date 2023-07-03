class Reservation < ApplicationRecord
  belongs_to :user, primary_key: 'user_id'
  belongs_to :location

  validates :location_id, presence: true
  validates :user_id, presence: true
  validates :period, presence: true
  validates :date, presence: true
  validates :facility_user_name, presence: true
  validates :purpose, presence: true

  def as_json(options = {})
    super(options.merge(include: :location))
    super(options.merge(include: :user))
  end
end
