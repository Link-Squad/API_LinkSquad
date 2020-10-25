const Friendship = require('../models/friendship.model');
const helpers = require('../helpers/helpers');

const createFriendships = (amount, users) => {
    const friendships = [];

    for (let i = 0; i < amount; i++) {
        const randUsers = helpers.returnRandomSubArray(users, 2);

        const newFriendship = {
            users: randUsers,
            accepted: randUsers
        };

        friendships.push(newFriendship);
    }

    return Friendship.create(friendships);
};

module.exports = createFriendships;