FactoryGirl.define do
  factory :message do
    content Faker::Lorem.sentence
    image File.open("#{Rails.root}/public/images/no_image.jpg")
  end

  trait :with_group_and_user do
    group
    user
  end

  trait :with_group do
    group
  end

  trait :with_user do
    user
  end
end
