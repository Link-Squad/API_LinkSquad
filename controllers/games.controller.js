const mongoose = require("mongoose");
const Games = require("../models/games.model");

module.exports.getGames = (req, res, next) => {
  console.log(req.body);
  Games.find({ name: req.body.name.toLowerCase() })
    .then((results) => {
      console.log("showing results");
      console.log(results);
      res.json(results);
    })
    .catch((err) => err);
};
