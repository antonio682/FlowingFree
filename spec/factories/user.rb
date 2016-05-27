

FactoryGirl.define do
  factory :user, class: 'User' do
    sequence(:email) {|n| "person#{n}@gmail.com" }
    password '12345678'
    password_confirmation '12345678'
    name 'testname'

  end
end
