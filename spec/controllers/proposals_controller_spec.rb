require 'rails_helper'

RSpec.describe ProposalsController, type: :controller do
    before :each do
        user = User.new
        user.name = 'antonio'
        user.password = '123456'
        user.id = 1
    end
    let(:params) { { id: 1 } }

    describe 'GET #index', type: :controller do
        it 'Renders a view with all the users events' do
            get :index
            expect(:index).to redirect_to(error_path)
        end
    end

    describe 'Proposal #destroy' do
        it 'destroys a user proposal' do
            delete :destroy
            expect(response.status).redirect_to 200
        end
    end

    describe 'Get #error' do
        it 'Renders an error page' do
            get :error
            expect(response.status).to eq(200)
        end
    end
end
