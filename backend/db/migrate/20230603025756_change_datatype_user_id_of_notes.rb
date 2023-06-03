class ChangeDatatypeUserIdOfNotes < ActiveRecord::Migration[7.0]
  def change
    change_column :notes, :user_id, :integer
  end
end
