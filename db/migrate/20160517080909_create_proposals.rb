class CreateProposals < ActiveRecord::Migration
  def change
    create_table :proposals do |t|
      t.string :title
      t.string :content
      t.date :enroll_deadline
      t.date :event_date
      t.float :price
      t.string :url_avatar
      
      t.timestamps null: false
    end
  end
end
