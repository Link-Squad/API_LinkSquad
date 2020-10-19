const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "must be unique"],
      required: [true, "name required"],
      toLowerCase: true,
    },
    img: {
      type: String,
      default: "/default/image-placeholder.png",
    },
    description: String,
    url: String,
    genre: {
      type: String,
      enum: ["FPS", "MOBA", "MMORPG", "ACTION"],
    },
    platforms: {
      type: String,
      enum: ["PS", "XBOX", "PC", "SWITCH"],
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

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
