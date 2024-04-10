Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :features, only: [:index], controller: "earthquake" do
        resources :comment, only: [:create, :index]
      end
    end
  end
end
