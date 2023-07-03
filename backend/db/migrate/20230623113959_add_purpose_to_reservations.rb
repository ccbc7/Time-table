class AddPurposeToReservations < ActiveRecord::Migration[7.0]
  def change
    add_column :reservations, :purpose, :string
  end
end
