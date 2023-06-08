class AddUserIdToNotes < ActiveRecord::Migration[7.0]
  def change
    add_column :notes, :user_id, :string unless column_exists?(:notes, :user_id)
  end
end
