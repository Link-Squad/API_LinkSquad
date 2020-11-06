const createError = require('http-errors');
const User = require('../models/user.model');

/* AUTH */
module.exports.doLogin = (req, res, next) => {
	const { email, password } = req.body;

	if (!email | !password) {
		throw createError(400, 'missing credentials');
	}

	User.findOne({ email })
		.populate({
			path: 'userGames',
			populate: {
				path: 'game',
			},
		})
		.populate({
			path: 'friendship',
			populate: {
				path: 'users accepted',
				select: 'username',
			},
		})
		.then(user => {
			if (!user) {
				throw createError(404, 'wrong credentials');
			}

			user.checkPassword(password).then(match => {
				if (!match) {
					throw createError(404, 'wrong credentials');
				} else {
					req.session.user = user;
					res.json(user);
				}
			});
		})
		.catch(next);
};

module.exports.doLogout = (req, res) => {
	req.session.destroy();
	res.status(204).send('Logout successful');
};

/* CRUD */
module.exports.createUser = (req, res, next) => {
	const { username, password, bio, email, languages } = req.body;
	const newUser = new User({ username, password, bio, email, languages });

	newUser
		.save()
		.then(u => res.status(201).json(u))
		.catch(next);
};

module.exports.listUsers = (req, res, next) => {
	const query = req.query || {};
	console.log(query);

	User.find(query)
		.populate({
			path: 'userGames',
			populate: {
				path: 'game',
			},
		})
		.populate({
			path: 'friendship',
			populate: {
				path: 'users accepted',
				select: 'username',
			},
		})
		.then(users => {
			res.json(users);
		})
		.catch(next);
};

module.exports.updateUser = (req, res, next) => {
	const currentUser = req.session.user;
	//We should take allowed fields directly from User model
	const allowedFields = [
		'username',
		'password',
		'email',
		'bio',
		'img',
		'languages',
	];

	const fieldsToUpdate = Object.entries(req.body).filter(
		field => allowedFields.includes(field[0]) && field[1]
	);

	User.findById(currentUser.id)
		.then(user => {
			if (!user) {
				res.status(404).send('User not found');
			}

			fieldsToUpdate.forEach(field => {
				const [key, value] = field;
				user[key] = value;
			});

			user.save()
				.then(u => res.status(200).json(u))
				.catch(next);
		})
		.catch(next);
};

module.exports.deleteUser = (req, res, next) => {
	const currentUser = req.session.user;

	//delete user's friendships & userGames
	User.findByIdAndDelete(currentUser.id)
		.then(() => {
			res.send('user deleted');
		})
		.catch(next);
};

module.exports.findUsers = (req, res, next) => {
	const userRegex = new RegExp(req.query.username.toLowerCase(), 'i');
	User.find({ username: { $regex: userRegex } })
		.populate({
			path: 'userGames',
			populate: {
				path: 'game',
			},
		})
		.populate('friendship')
		.then(results => {
			console.log(results);
			res.json(results);
		})
		.catch(err => err);
};
