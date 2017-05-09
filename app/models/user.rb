class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :members
  has_many :messages
  has_many :groups, through: :members

  validates :name,
    presence: true,
    uniqueness: true
  validates :email,
    presence: true,
    uniqueness: true
end
