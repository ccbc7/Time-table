class RemoveIconUrlFromUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :icon_url, :string
  end
end
