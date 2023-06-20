class CreateLocations < ActiveRecord::Migration[7.0]
  def change
    create_table :locations do |t|
      t.string :user_id
      t.string :location_name

      t.timestamps
    end
  end
end