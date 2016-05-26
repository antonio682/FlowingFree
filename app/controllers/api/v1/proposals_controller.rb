class ::Api::V1::ProposalsController < ApplicationController
    def create
        prop = Proposal.find_by(title: params[:dataTitle], content: params[:dataContent])
        prop.nil? ? prop = Proposal.new(id: -1) : prop
        @user = User.find(current_user.id)

        if Userproposal.find_by(user_id: current_user.id, proposal_id: prop.id).nil?
            @proposal = Proposal.create(title: params[:dataTitle], content: params[:dataContent])
            @user.userproposals.create(proposal: @proposal)
        end

        if !current_user.nil?
            render json: { status: 404 }
        else
            ShareEventMailer.share_email(@user, params[:friendEmail]).deliver_now
            render json: { status: 201 }
        end
    end
end
