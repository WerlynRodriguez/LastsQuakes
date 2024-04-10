class Comment < ApplicationRecord
  belongs_to :earthquake

  validates :body, :earthquake_id, presence: true
end
