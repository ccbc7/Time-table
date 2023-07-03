class RemoveFirebaseUidFromUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :firebase_uid, :string
  end
end
