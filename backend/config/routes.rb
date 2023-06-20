Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :notes
      resources :pictures
      resources :users
      resources :icons
      get 'locations/all', to: 'locations#all'
      resources :locations
      resources :reserbations
    end
  end
end
