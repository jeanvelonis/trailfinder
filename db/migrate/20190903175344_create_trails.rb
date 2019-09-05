class CreateTrails < ActiveRecord::Migration[5.2]
  def change
    create_table :trails do |t|
      t.string :name
      t.string :type
      t.string :difficulty
      t.string :location
      t.text :summary
      t.text :description
      t.timestamps
    end
  end
end
