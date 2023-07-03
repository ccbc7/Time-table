class AddFacilityUserNameToReservations < ActiveRecord::Migration[7.0]
  def change
    add_column :reservations, :facility_user_name, :string
  end
end
