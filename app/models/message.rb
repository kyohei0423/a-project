class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

  validates :content, presence: true, if: 'image.blank?'

  mount_uploader :image, ImageUploader
end
