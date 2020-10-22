const mongoose = require('mongoose');
const UserGame = require('../models/userGame.model');

module.exports.getUserGame = (req, res, next) => {
  const id = req.params.id;
  const { game, user } = req.body;
  UserGame.findById(id)
    .then((results) => {
        res.json((results) => res.status(201).json(results));
    })
    .catch((error) => next(createError(400, error)));
};

module.exports.createUserGame = (req, res, next) => {
  const { game, user } = req.params;

  const newUserGame = new UserGame({ game, user });
  newUserGame.save();
  then((result) => {
    res.json((result) => res.status(201).json(result));
  }).catch((error) => next(createError(400, error)));
};
