Rails.application.routes.draw do
  devise_for :users

  get "/" => "application#index",as: "home"
  get "/events/day/show" => "application#show", as: "events_day"
  get "/events/back" => "application#back", as: "return_events"
  post "/events/create" => "proposals#create"
  get "/event/create" => "proposals#create"
end
