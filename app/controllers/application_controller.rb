class ApplicationController < ActionController::Base
    # Prevent CSRF attacks by raising an exception.
    # For APIs, you may want to use :null_session instead.
    protect_from_forgery with: :exception
    before_action :configure_permitted_parameters, if: :devise_controller?

    def index
      @_current_user ||= session[:current_user_id] &&
      User.find_by(id: session[:current_user_id])
    end

    def show

    end

    protected
    def configure_permitted_parameters
        #  devise_parameter_sanitizer.for(:sign_up) << :name
        devise_parameter_sanitizer.for(:sign_up) + [:name, :email, :nick, :avatar, :birth_date]
        #  devise_parameter_sanitizer.for(:account_update) + [:first_name, :last_name, :company_name]
    end
end
