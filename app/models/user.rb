class User < ActiveRecord::Base
    # Include default devise modules. Others available are:
    # :confirmable, :lockable, :timeoutable and :omniauthable
    devise :database_authenticatable, :registerable,
           :recoverable, :rememberable, :trackable, :validatable
    has_many :userproposals
    has_many :proposals, through: :userproposals

    validates :email, presence: true, uniqueness: true
    validates :nick, presence: true, uniqueness: true
    validates :name, presence: true
    validates :birth_date, presence: true

end
