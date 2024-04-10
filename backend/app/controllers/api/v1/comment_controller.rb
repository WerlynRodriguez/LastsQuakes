class Api::V1::CommentController < ApplicationController
  def create
    comment = Comment.new(comment_params)
    puts comment.inspect
    if comment.save
      render json: comment, status: :created
    else
      render json: { error: comment.errors.full_messages }, status: :bad_request
    end
  end

  def comment_params
    params.require(:comment).permit(:earthquake_id, :body)
  end
end
