const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const helpers = require('../helpers/helpers');

const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const YOUTUBE_PATTERN = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/g;
const TWITTER_PATTERN = /^(http\:\/\/|https\:\/\/)?(?:www\.)?twitter\.com\/(?:#!\/)?@?([^\?#]*)(?:[?#].*)?$/i
const DISCORD_PATTERN = null;
const TWITCH_PATTERN = null
const {AVAILABLE_USER_LANGUAGES} = require('../constants/constants');

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, 'Username is required'],
			unique: [true, 'This username is unavailable'],
			maxlength: 12,
			trim: true,
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
			unique: [true, 'Invalid email address'],
			match: [EMAIL_PATTERN, 'Invalid email address'],
		},
		password: {
			type: String,
			required: [true, 'Password missing'],
			trim: true
		},
		bio: {
			type: String,
			maxlength: 300,
		},
		languages: {
			type: [String],
			enum: AVAILABLE_USER_LANGUAGES
		},
		views: {
			type: Number,
			default: 0
		},
		avatar: {
			type: String,
			default: 'https://cdn4.iconfinder.com/data/icons/user-avatar-flat-icons/512/User_Avatar-31-512.png',
		},
		status: {
			token: {
				type: String,
				default: helpers.generateRandomToken(),
			},
			active: {
				type: Boolean,
				default: false,
			},
		},
		
		social: {
			twitter: {
				type: String,
				default: null,
				match: TWITTER_PATTERN
			},
			twitch: {
				type: String,
				default: null
			},
			youtube: {
				type: String,
				default: null,
				match: YOUTUBE_PATTERN
			},
			discord: {
				type: String,
				default: null
			},
		},
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
			transform: (document, toReturn) => {
				toReturn.id = document._id;
				delete toReturn.password;
				delete toReturn._id;
				delete toReturn.__v;
				delete toReturn.createdAt;
				delete toReturn.updatedAt;
				return toReturn;
			},
		},
	}
);

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    bcrypt
      .hash(this.password, 10)
      .then((hash) => {
        this.password = hash;
        next();
      })
      .catch(next);
  } else {
    next();
  }
});


userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual('userGames', {
  ref: 'UserGame',
  localField: '_id',
  foreignField: 'user',
  justOne: false,
});

userSchema.virtual('friendship', {
  ref: 'Friendship',
  localField: '_id',
  foreignField: 'users',
  justOne: false,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
