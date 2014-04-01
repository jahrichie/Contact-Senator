Congress::Application.routes.draw do

  get "/make_calls", :to => "make_calls#connect_calls"
  post "/callback", :to => "make_calls#callback"

  root :to => 'home#index'


end
