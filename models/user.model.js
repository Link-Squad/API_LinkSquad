const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const helpers = require('../helpers/helpers');
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
require('./userGame.model');
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: [true, 'This username is unavailable'],
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
    },
    bio: {
      type: String,
      maxlength: 300,
    },
    languages: {
      type: [String],
      required: [true, 'You must specify a language'],
      enum: ['Español', 'English', 'Français'],
    },
    views: {
      type: Number,
      default: 0,
    },
    img: {
      type: String,
      default: 'default img url',
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
    //TODO: CHECK IF LINK BELONGS TO CORRESPONDING SOCIAL MEDIA
    social: {
      twitter: {
        type: String,
        default: null,
      },
      twitch: {
        type: String,
        default: null,
      },
      youtube: {
        type: String,
        default: null,
      },
      discord: {
        type: String,
        default: null,
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

const User = mongoose.model('User', userSchema);
module.exports = User;
