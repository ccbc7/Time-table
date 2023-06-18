class CreateFirebaseUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :firebase_users do |t|
      t.string :uid
      t.string :username
      t.string :icon_url

      t.timestamps
    end
    add_index :firebase_users, :uid, unique: true
  end
end
