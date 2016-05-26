class Proposal < ActiveRecord::Base
    has_many :userproposals
    has_many :users, through: :userproposals
    validates :title, presence: true
    validates :content, presence: true
    
end
