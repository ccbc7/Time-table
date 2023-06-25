class Reservation < ApplicationRecord
  belongs_to :user, primary_key: 'user_id'
  belongs_to :location

  def as_json(options = {})
    super(options.merge(include: :location))
    super(options.merge(include: :user))
  end
end
