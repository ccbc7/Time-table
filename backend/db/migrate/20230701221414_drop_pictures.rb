class DropPictures < ActiveRecord::Migration[7.0]
  def up
    drop_table :pictures
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
