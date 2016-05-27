require 'rails_helper'
RSpec.describe ApplicationController, type: :controller do
  before :each do
      user = User.new
      user.name = 'antonio'
      user.password = '123456'
      user.id = 1
  end
  describe 'GET #index', :type => :controller do
      it 'Renders Home Page' do
          get :index
          expect(response.status).to eq(200)
      end
  end

  describe 'GET #Show', :type => :controller do
      it 'Renders Home Page' do
          get :show
          expect(response.status).to eq(200)
      end
  end
end
