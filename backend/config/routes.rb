Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :notes
      resources :pictures
      resources :users
      resources :icons
    end
  end
end
