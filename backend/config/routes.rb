Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :notes, only: [:index, :create, :update, :destroy]
      resources :pictures
    end
  end
end
