Rails.application.routes.draw do
    devise_for :users

    authenticate :user do
        resources :proposals, only: [:new, :create, :edit, :update, :destroy]
    end

    resources :users do
        resources :proposals
    end

    namespace :api do
        namespace :v1 do
            resources :proposals
        end
    end

    get "/error" => 'proposals#error', as: 'error'

    get 'users/:user_id/proposals' => 'proposals#show'
    get '/' => 'application#index', as: 'home'
    get '/events/day/show' => 'application#show', as: 'events_day'
    get '/events/back' => 'application#back', as: 'return_events'
    post '/events/create' => 'proposals#create'
    get '/event/create' => 'proposals#create'
end
