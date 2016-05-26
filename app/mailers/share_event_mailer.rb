class ShareEventMailer < ApplicationMailer
  default from: "flowing.free682@gmail.com"

  def share_email(user, addresseeEmail)
    @user =  user
    mail(to: addresseeEmail, subject: "#{@user.name} recommends for you")
  end
end
