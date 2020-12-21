const faker = require('faker');
const avatar = require('../helpers/avatar.helper');
const { returnRandomElement, sliceString } = require('../helpers/helpers');
const User = require('../models/user.model');
const {AVAILABLE_USER_LANGUAGES} = require('../constants/constants');

const createUsers = (amount) => {
    const testUser = {
        username: 'test',
        email: 'test@test.te',
        password: 12345,
        bio: 'This is the test user',
        languages: ['english', 'spanish'],
        avatar: 'https://res.cloudinary.com/dmr5dqvbp/image/upload/v1608542217/dat_boi_y26yrp.png'

    };

    const users = [testUser];

	for (let i = 0; i < amount; i++) {
		const newUser = {
			username: sliceString(faker.internet.userName(), 12),
            email: faker.internet.email(),
            password: faker.internet.password(),
			bio: faker.lorem.sentence(),
			languages: returnRandomElement(AVAILABLE_USER_LANGUAGES),
            avatar: avatar.generateAvatar(),
            views: Math.floor(Math.random() * 9999999)
		};
		users.push(newUser);
    }
    
    return User.create(users);
};


module.exports = createUsers;