class AddIconUrlToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :icon_url, :string
  end
end
