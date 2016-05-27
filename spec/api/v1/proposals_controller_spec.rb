require 'rails_helper'

RSpec.describe ::Api::V1::ProposalsController, type: :controller do

  before :each do
      user = User.new
      user.name = 'antonio'
      user.password = '123456'
      user.id = 1
  end

    describe 'create' do
        it 'should be successful' do
          expect(response.status).to eq(200)
        end
    end
end
