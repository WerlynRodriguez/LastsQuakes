class CreateEarthquakes < ActiveRecord::Migration[7.1]
  def change
    create_table :earthquakes do |t|
      t.string :external_id, null: false
      t.decimal :magnitude, null: false
      t.string :place, null: false
      t.string :time, null: false
      t.boolean :tsunami, null: false
      t.string :mag_type, null: false
      t.string :title, null: false
      t.decimal :longitude, null: false
      t.decimal :latitude, null: false
      t.string :url, null: false

      t.timestamps
    end
  end
end
