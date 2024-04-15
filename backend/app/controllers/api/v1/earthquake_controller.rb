class Api::V1::EarthquakeController < ApplicationController
  # It includes the pagination concern
  before_action :set_pagination_params, only: [:index]
  before_action :validate_mag_type, only: [:index]

  # GET /api/v1/earthquakes
  def index
    earthquakes = Earthquake
                  .where(mag_type: @mag_type)
                  .paginate(page: @page, per_page: @per_page)

    render json: {
      data: earthquakes,
      pagination: {
        current_page: @page,
        total: Earthquake.count,
        per_page: @per_page
      }
    }, status: :ok
  end

  private
  def set_pagination_params
    @page = params.fetch(:page, 1).to_i
    @page = 1 if @page.zero?

    @per_page = params.fetch(:per_page, 10).to_i
    @per_page = 10 if @per_page.zero? || @per_page > 1000
  end

  def validate_mag_type
    allowed_mag_type = ['md', 'ml', 'ms', 'mw', 'me', 'mi', 'mb', 'mlg']

    # example of "mag_type" = "ms,mw"

    @mag_type = params.fetch(:mag_type, '').split(',')
    @mag_type = @mag_type.select { |mag_type| allowed_mag_type.include?(mag_type) }
    @mag_type = allowed_mag_type if @mag_type.empty?
  end
end
