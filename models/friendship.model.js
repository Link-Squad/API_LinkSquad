const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema(
	{
		requestingUser: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		befriendedUser: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		accepted: {
			type: Boolean,
			default: false
		},
		users: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		}]
	},
	{
		timestamps: true,
		toJSON: {
			transform: (document, toReturn) => {
				toReturn.id = document._id;
				delete toReturn.__v;
				delete toReturn._id;
				delete toReturn.createdAt;
				delete toReturn.updatedAt;
				return toReturn;
			},
		},
	}
);

const friendship = mongoose.model('Friendship', friendshipSchema);
module.exports = friendship;
