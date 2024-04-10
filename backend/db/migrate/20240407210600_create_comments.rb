class CreateComments < ActiveRecord::Migration[7.1]
  def change
    create_table :comments do |t|
      t.integer :earthquake_id, null: false
      t.string :body, null: false

      t.timestamps
    end
  end
end
