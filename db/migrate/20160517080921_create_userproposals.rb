class CreateUserproposals < ActiveRecord::Migration
    def change
        create_table :userproposals do |t|
            t.references :user, index: true
            t.references :proposal, index: true

            t.timestamps null: false
        end
    end
end
