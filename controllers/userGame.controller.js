const mongoose = require('mongoose');
const User = require('../models/user.model');
const UserGame = require('../models/userGame.model');
const createError = require('http-errors');

module.exports.getUserGame = (req, res, next) => {
	const query = req.query;
	UserGame.find(query)
		.then(results => res.status(201).json(results))
		.catch(error => next(createError(400, error)));
};

module.exports.getUsersByGame = (req, res, next) => {
	const { gameId } = req.params;
	UserGame.find({ game: gameId })
		.populate('user')
		.then(userGames => {
			const userArray = userGames.map(uG => uG.user);
			res.status(200).json(userArray);
		});
};

module.exports.createUserGame = (req, res, next) => {
  const { game } = req.body;
  const user = req.session.user.id;

	const newUserGame = new UserGame({ game, user });
	newUserGame
		.save()
		.then(result => res.status(201).json(result))
		.catch(error => next(createError(400, error)));
};

module.exports.deleteUserGame = (req, res, next) => {
	const query = req.query;

	UserGame.deleteMany(query)
		.then(() => res.status(201).json({ response: 'ok' }))
		.catch(error => next(createError(400, error)));
};
