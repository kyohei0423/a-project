class Group < ApplicationRecord
  has_many :members
  has_many :messages
  has_many :users, through: :members

  validates :name, presence: true

  def show_last_message
    messages.last.try(:body) || 'まだメッセージはありません。'
  end
end
