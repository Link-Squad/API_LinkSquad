const createError = require('http-errors');
const User = require('../models/user.model');
const Friendship = require('../models/friendship.model');

module.exports.addFriend = (req, res, next) => {
    const friendId = req.params.id;
    const userId = req.session.user.id;
	Friendship.findOne({
        user1: userId,
        user2: friendId
    })
        .then(match => {
            if (match) {
                throw createError(400, 'user is already added to friends');
            } else {
                
            }
        })
        .catch(next);
};

module.exports.updateFriend = (req, res, next) => {
    const friendId = req.params.id;
    const userId = req.session.user.id; 
    const confirmed = req.body.confirmed;

    Friendship.findOne({

    })
}