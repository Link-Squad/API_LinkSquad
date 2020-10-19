const mongoose = require("mongoose")

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true,"must be unique"],
    required: [true,"name required"],
  },
  img: { 
      type: String, 
      default: "/default/image-placeholder.png" 
    },
  description: String,
  url: String,
  genre: {
      type: String,
      enum: [
          "FPS",
          "MOBA",
          "MMORPG",
          "ACTION"
      ]
  },
  platforms: {
      type: String,
      enum: [
          "PS",
          "XBOX",
          "PC",
          "SWITCH"
      ]
  }
})

const Game = mongoose.model("Game", gameSchema)

module.exports = Game
