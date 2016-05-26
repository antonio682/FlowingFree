class ProposalsController < ApplicationController
    def index
        if current_user.nil?
            redirect_to error_path
        else
            @user_proposals = []
            @user = User.find(current_user.id)
            @user_proposals_ids = @user.userproposals.all
            @user_proposals_ids.each do |prop|
                proposal = Proposal.find(prop.proposal_id)
                @user_proposals.push proposal
            end
        end
    end
    

    def destroy
        user = User.find(current_user.id)
        proposal = Proposal.find(params[:id]).destroy
        user.userproposals.find_by(user_id: current_user.id, proposal_id: params[:id]).destroy
        redirect_to :back
    end

    def error
    end
end
