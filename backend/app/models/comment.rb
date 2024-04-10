class Comment < ApplicationRecord
  belongs_to :earthquake

  validates :body, :earthquake_id, presence: true
  validates :body, length: { minimum: 5 }
end
