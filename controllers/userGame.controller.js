const mongoose = require('mongoose');
const UserGame = require('../models/userGame.model');

module.exports.getUserGame = (req, res, next) => {
  const query = req.query;
  UserGame.find(query)
    .then((results) => res.status(201).json(results))
    .catch((error) => next(createError(400, error)));
};

module.exports.createUserGame = (req, res, next) => {
  const { game, user } = req.query;

  const newUserGame = new UserGame({ game, user });
  newUserGame
    .save()
    .then((result) => res.status(201).json(result))
    .catch((error) => next(createError(400, error)));
};

module.exports.deleteUserGame = (req, res, next) => {
  const query = req.query;

  UserGame.deleteMany(query)
    .then(() => res.status(201).json({ response: 'ok' }))
    .catch((error) => next(createError(400, error)));
};
