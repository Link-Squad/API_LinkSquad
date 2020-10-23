const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema(
	{
		users: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		}],
		accepted: [{
			type: mongoose.Schema.Types.ObjectId, //could be string?
			ref:'User'
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
			}
		}
	}
);

friendshipSchema.methods.areFriends = function () {
	//users are friends if confirmation field holds both IDs
};

const friendship = mongoose.model('Friendship', friendshipSchema);
module.exports = friendship;
