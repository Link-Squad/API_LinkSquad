const createError = require('http-errors');
const Friendship = require('../models/friendship.model');

module.exports.addFriend = (req, res, next) => {
	const friendId = req.params.id;
	const userId = req.session.user.id;
	Friendship.findOne()
		.where('users')
		.all([userId, friendId])
		.then((match) => {
			if (match) {
				throw createError(400, 'user is already added to friends');
			} else {
				Friendship.create({
					users: [userId, friendId],
					accepted: [userId]
				})
					.then((f) => res.status(201).json(f))
					.catch(next);
			}
		})
		.catch(next);
};

module.exports.getFriends = (req, res, next) => {
	const userId = req.params.id;

	Friendship.find({ users: userId })
		.then((friendships) => res.status(200).json(friendships))
		.catch(next);
};

module.exports.updateFriend = (req, res, next) => {
	const friendId = req.params.id;
	const userId = req.session.user.id;

	Friendship.findOne()
		.where('users')
		.all([userId, friendId])
		.then((friendship) => {
			if (!friendship) {
				throw createError(404, 'User is not on friend list');
			}

			const userConfirmation = friendship.accepted.indexOf(userId);
			if (userConfirmation !== -1) {
				friendship.accepted.splice(userConfirmation, 1);
                friendship.save()
                    .then(() => res.send('Deleted friend'))
                    .catch(next);
			} else {
                friendship.accepted.push(userId);
                friendship.save()
                    .then(() => res.send('Accepted friend request'))
                    .catch(next);
			}
		})
		.catch(next);
};

module.exports.deleteFriendship = (req, res, next) => {
    const userId = req.session.user.id;

    Friendship.deleteMany({ user: userId})
        .then(next)
        .catch(next);
};