class AddPeriodToHours < ActiveRecord::Migration[7.0]
  def change
    add_column :hours, :period, :string
  end
end
