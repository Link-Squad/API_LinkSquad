const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema(
	{
		user1: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		user2: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		accepted: {
			type: Boolean,
			default: false,
		},
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
