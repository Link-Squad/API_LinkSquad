const createError = require('http-errors');
const User = require('../models/user.model');
const Friendship = require('../models/friendship.model');

module.exports.addFriend = (req, res, next) => {
    Friendship.findOne()
}