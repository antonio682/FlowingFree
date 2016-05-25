class AddingUserFields < ActiveRecord::Migration
    def change
        add_column :users, :nick, :string
        add_column :users, :url_avatar, :string
        add_column :users, :birth_date, :date
        add_column :userproposals, :id_owner, :integer
    end
end
