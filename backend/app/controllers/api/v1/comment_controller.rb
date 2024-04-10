class Api::V1::CommentController < ApplicationController
  before_action :set_earthquake, only: [:create, :index]

  # POST /api/v1/earthquakes/:earthquake_id/comments
  def create
    comment = @earthquake.comments.new(comment_params)

    if comment.save
      render json: comment, status: :created
    else
      render json: { error: comment.errors.full_messages }, status: :bad_request
    end
  end

  def index
    render json: @earthquake.comments, status: :ok
  end

  private

  def comment_params
    params.permit(:body, :earthquake_id)
  end

  def set_earthquake
    earthquake_id = comment_params[:earthquake_id].to_i

    if earthquake_id <= 0
      render json: { error: 'Invalid earthquake ID' }, status: :bad_request
      return
    end

    @earthquake = Earthquake.find_by(id: earthquake_id)
    render json: { error: 'Earthquake not found' }, status: :not_found unless @earthquake
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Earthquake not found' }, status: :not_found
  end

end
