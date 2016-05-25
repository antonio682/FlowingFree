# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

user1 = User.create(name: "Antonio", email: "eric6822@gmail.com", nick: "Antonio682", password: "123456", url_avatar: "http://www.funny-animalpictures.com/media/content/items/images/funnybears0114_O.jpg", birth_date: "1/2/1979")
proposal1 = Proposal.create(title: "Sunday at Zoo",
                            content: "I'm looking for 12 people in order to get a group discount at the zoo.",
                            enroll_deadline: "23/08/2016",
                            event_date: "28/08/2016",
                            price: 24,
                            url_avatar: "http://cliparwolf.com/image.php?pic=/images/zoo-clipart/zoo-clipart-10.jpg")
#sintaxis correcta pero no se puede añadir a la vez
proposal = user1.userproposals.create(proposal: proposal1)
