class RemoveHourFromHours < ActiveRecord::Migration[7.0]
  def change
    remove_column :hours, :hour, :string
  end
end
