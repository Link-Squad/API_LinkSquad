const faker = require('faker');
const User = require('../models/user.model');

const createUsers = (amount) => {
    const testUser = {
        username: 'test',
        email: 'test@test.te',
        password: 12345,
        bio: 'This is the test user',
        languages: ['English'],
    };

    const users = [testUser];

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


module.exports = createUsers;