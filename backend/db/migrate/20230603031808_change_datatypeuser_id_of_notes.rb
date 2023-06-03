class ChangeDatatypeuserIdOfNotes < ActiveRecord::Migration[7.0]
  def change
    change_column :notes, :user_id, :string
  end
end
