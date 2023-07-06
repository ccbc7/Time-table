class AddLocationRefToNotes < ActiveRecord::Migration[7.0]
  def up
    add_reference :notes, :location, null: false, foreign_key: true unless column_exists? :notes, :location_id
  end

  def down
    remove_reference :notes, :location if column_exists? :notes, :location_id
  end
end
