const mongoose = require('mongoose');
const UserGame = require('../models/userGame.model');

module.exports.getUserGameById = (req, res, next) => {
  const id = req.params.id;
  UserGame.findById(id)
    .then((results) => res.status(201).json(results))
    .catch((error) => next(createError(400, error)));
};

module.exports.createUserGame = (req, res, next) => {
  const { game, user } = req.params;

  const newUserGame = new UserGame({ game, user });
  newUserGame
    .save()
    .then((result) => res.status(201).json(result))
    .catch((error) => next(createError(400, error)));
};

module.exports.getUserGameByUser = (req, res, next) => {
  const userId = mongoose.Types.ObjectId(req.params.id);
  console.log('getting usergame by user');
  UserGame.find({ user: userId })
    .then((results) => res.status(201).json(results))
    .catch((error) => next(createError(400, error)));
};

module.exports.getUserGameByGame = (req, res, next) => {
    const gameId = mongoose.Types.ObjectId(req.params.id);
    console.log('getting usergame by game');
    UserGame.find({ game: gameId })
      .then((results) => res.status(201).json(results))
      .catch((error) => next(createError(400, error)));
  };
