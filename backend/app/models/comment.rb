class Comment < ApplicationRecord
  belongs_to :earthquake

  validates :body, :earthquake_id, presence: true
  validates :body, length: { minimum: 5 }

  def as_json(options = {})
    super(options.merge(except: [:updated_at]))
  end
end
