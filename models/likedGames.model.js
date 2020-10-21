const mongoose = require('mongoose');

const likedGameSchema = new mongoose.Schema(
  {
    game: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
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

const likedGame = mongoose.model('LikedGame', likedGameSchema);

module.exports = likedGame;
