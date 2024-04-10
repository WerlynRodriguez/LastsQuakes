class Earthquake < ApplicationRecord

  # Has many comments. When an earthquake is destroyed, all of its comments are destroyed as well.
  has_many :comments, dependent: :destroy

  # Validates the Unique external ID of the earthquake.
  validates :external_id, uniqueness: true

  validates :magnitude, numericality: { greater_than_or_equal_to: -1.0, less_than_or_equal_to: 10.0 }
  validates :latitude, numericality: { greater_than_or_equal_to: -90.0, less_than_or_equal_to: 90.0 }
  validates :longitude, numericality: { greater_than_or_equal_to: -180.0, less_than_or_equal_to: 180.0 }

  # Validates the presence of the external ID, magnitude, latitude, longitude, and time of the earthquake.
  validates :external_id, :magnitude, :latitude, :longitude, :time, presence: true

  # Pagination Scope
  scope :paginate, ->(page: 1, per_page: 10) {
    limit(per_page).offset((page - 1) * per_page)
  }

  # On converted to json, the earthquake will have the following format:
  def as_json(options = {})
    {
      id: id,
      type: 'feature',
      attributes: {
        external_id: external_id,
        magnitude: magnitude,
        place: place,
        time: time,
        tsunami: tsunami,
        mag_type: mag_type,
        title: title,
        coordinates: {
          longitude: longitude,
          latitude: latitude
        }
      },
      links: {
        external_url: url
      }
    }
  end
end
