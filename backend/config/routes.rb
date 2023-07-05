Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :notes
      resources :users, only: [:index, :create, :show, :update]
      get 'locations/all', to: 'locations#all'
      resources :locations
      resources :reservations
      resources :hours, only: [:index, :update]
    end
  end
end
