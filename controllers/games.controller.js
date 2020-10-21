const mongoose = require('mongoose');
const Game = require('../models/games.model');

module.exports.getGames = (req, res, next) => {
  Game.find({ name: req.body.name.toLowerCase() })
    .then((results) => {
      res.json(results);
    })
    .catch((err) => err);
};

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
