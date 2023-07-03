class AddBookedUserIdToReservations < ActiveRecord::Migration[7.0]
  def change
    add_column :reservations, :booked_user_id, :string
  end
end
