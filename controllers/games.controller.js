<<<<<<< HEAD
const mongoose = require('mongoose');
const Game = require('../models/games.model');

module.exports.getGames = (req, res, next) => {
  Game.find({ name: req.body.name.toLowerCase() })
    .then((results) => {
=======
const mongoose = require("mongoose");
const Games = require("../models/games.model");

module.exports.getGames = (req, res, next) => {
  console.log(req.body);
  Games.find({ name: req.body.name.toLowerCase() })
    .then((results) => {
      console.log("showing results");
      console.log(results);
>>>>>>> main
      res.json(results);
    })
    .catch((err) => err);
};
<<<<<<< HEAD

module.exports.createGame = (req, res, next) => {
  const { name, img, description, url, genre, platforms } = req.body;
  const game = new Game({ name, img, description, url, genre, platforms });
  game
    .save()
    .then((g) => res.status(201).json(g))
    .catch(next);
};

module.exports.updateGame = (req, res, next) => {
  const gameValues = req.body;
  const id = req.id || '5f8df01f1af5fa334ca59c6c';
  Game.findByIdAndUpdate(id, user, { new: true })
    .then((user) => res.status(201).json(user))
    .catch((error) => next(createError(400, error)));
};
=======
>>>>>>> main
