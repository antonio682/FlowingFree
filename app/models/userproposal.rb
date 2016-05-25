class Userproposal < ActiveRecord::Base
    belongs_to :user
    belongs_to :proposal
    validates :user_id, presence: true
    validates :proposal_id, presence: true
end
