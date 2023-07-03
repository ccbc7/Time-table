class DropFirebaseUsers < ActiveRecord::Migration[7.0]
  def up
    drop_table :firebase_users
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
