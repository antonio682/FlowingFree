class ApplicationController < ActionController::Base
    # Prevent CSRF attacks by raising an exception.
    # For APIs, you may want to use :null_session instead.
    protect_from_forgery with: :exception
    before_action :configure_permitted_parameters, if: :devise_controller?

    def index

      @proposal = Proposal.new
    end

    def show
      @range = params[:range_date_event]
    end

    protected
    def configure_permitted_parameters
        devise_parameter_sanitizer.for(:sign_up) << :name
    end
end
