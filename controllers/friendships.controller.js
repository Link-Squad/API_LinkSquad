const createError = require('http-errors');
const { where } = require('../models/friendship.model');
const Friendship = require('../models/friendship.model');

module.exports.addFriend = (req, res, next) => {
	const { befriendedUser } = req.params;
	const requestingUser = req.session.user.id;
	Friendship.findOne()
		.where('users')
		.all([requestingUser, befriendedUser])
		.then(match => {
			if (match) {
				throw createError(400, 'user is already added to friends');
			} else {
				Friendship.create({
					requestingUser,
					befriendedUser,
					users: [requestingUser, befriendedUser],
				})
					.then(f => res.status(201).json(f))
					.catch(next);
			}
		})
		.catch(next);
};

module.exports.getFriends = (req, res, next) => {
	const { userId } = req.params;

	Friendship.find({ users: userId, accepted: true })
		.then(friendships => res.status(200).json(friendships))
		.catch(next);
};

module.exports.acceptFriend = (req, res, next) => {
	const { requestingUser } = req.params;
	const befriendedUser = req.session.user.id;

	Friendship.findOne()
		.where('users')
		.all([requestingUser, befriendedUser])
		.then(friendship => {
			if (!friendship) {
				throw createError(404, 'User is not on friend list');
			}

			if (!friendship.requestingUser.equals(requestingUser)) {
				throw createError(403, 'You are not authorized to accept this request')
			}

			friendship.accepted = true;
			friendship
				.save()
				.then(f => res.status(200).json(f))
				.catch(next);
		})
		.catch(next);
};

module.exports.deleteFriendship = (req, res, next) => {
	const userId = req.session.user.id;
	const { friendshipId } = req.params;

	Friendship.findById({ id: friendshipId })
		.then(friendship => {
			if (!friendship.users.includes(userId)) {
				res.status(403).json('You cannot edit this resource');
			}

			Friendship.deleteOne(friendship)
				.then(f => res.status(200).json('Friendship deleted'))
				.catch(next);
		})
		.catch(next);
};
