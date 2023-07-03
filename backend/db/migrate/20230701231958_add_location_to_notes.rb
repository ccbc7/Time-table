class AddLocationToNotes < ActiveRecord::Migration[7.0]
  def change
    add_reference :notes, :location, null: false, foreign_key: true
  end
end
