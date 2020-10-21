require('dotenv').config();
require('../config/db.config');
const faker = require('faker');
const mongoose = require('mongoose');
const User = require('../models/user.model');

const createUsers = (amount) => {
    const users = [];

	for (let i = 0; i < amount; i++) {
		const newUser = {
			username: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
			bio: faker.lorem.sentence(),
			languages: ['English'],
			img: faker.internet.avatar(),
		};
		users.push(newUser);
    }
    
    return User.create(users);
};

User.deleteMany({}).then(() => {
    createUsers(25)
        .then((users) => {
            console.log(users);
            mongoose.connection.close();
        })
        .catch(e => console.error(e));
});

module.exports = createUsers;