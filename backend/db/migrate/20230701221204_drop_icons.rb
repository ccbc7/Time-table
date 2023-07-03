class DropIcons < ActiveRecord::Migration[7.0]
  def up
    drop_table :icons
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
