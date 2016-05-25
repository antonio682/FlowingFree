class Proposal < ActiveRecord::Base
  has_many :userproposals
  has_many :users, through: :userproposals
  validates :title, presence: true
  validates :content, presence: true
  validates :enroll_deadline, presence: true
  validates :event_date, presence: true
end
