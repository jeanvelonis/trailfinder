class CreateTrails < ActiveRecord::Migration[5.2]
  def change
    create_table :trails do |t|
      t.string :name
      t.text :description
      #t.string :type
      t.timestamps
    end
  end
end
