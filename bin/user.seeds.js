const faker = require('faker');
const { returnRandomElement } = require('../helpers/helpers');
const User = require('../models/user.model');

const createUsers = (amount) => {
    const testUser = {
        username: 'test',
        email: 'test@test.te',
        password: 12345,
        bio: 'This is the test user',
        languages: ['english', 'spanish'],
        views: 555,
        avatar: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/bd6d471f-e982-4f3d-95de-99b2af6e6971/da7eibx-7bf72343-27fc-48af-9ce5-63bd5166dd73.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTpmaWxlLmRvd25sb2FkIl0sIm9iaiI6W1t7InBhdGgiOiIvZi9iZDZkNDcxZi1lOTgyLTRmM2QtOTVkZS05OWIyYWY2ZTY5NzEvZGE3ZWlieC03YmY3MjM0My0yN2ZjLTQ4YWYtOWNlNS02M2JkNTE2NmRkNzMucG5nIn1dXX0.bTJ3Te7A0OAU3NTGg7Okw6Yrb2st2PRmwMX4PO7qE80'
    };

    const users = [testUser];

	for (let i = 0; i < amount; i++) {
		const newUser = {
			username: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
			bio: faker.lorem.sentence(),
			languages: returnRandomElement(User.schema.path('languages').enumValues),
            avatar: faker.internet.avatar(),
            views: Math.floor(Math.random() * 9999999)
		};
		users.push(newUser);
    }
    
    return User.create(users);
};


module.exports = createUsers;