const createError = require('http-errors');
const User = require('../models/user.model');

/* AUTH */
module.exports.doLogin = (req, res, next) => {
	const { email, password } = req.body;

	if (!email | !password) {
		throw createError(400, 'missing credentials');
	}

	User.findOne({ email })
		.then((user) => {
			if (!user) {
				throw createError(404, 'wrong credentials');
			}

			user.checkPassword(password).then((match) => {
				if (!match) {
					throw createError(404, 'wrong credentials');
				} else {
					req.session.user = user;
					res.send('Login Successful');
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
		.then((u) => res.status(201).json(u))
		.catch(next);
};

module.exports.getUsers = (req, res, next) => {
	const query = req.query || {};

	User.find(query)
		.then((users) => {
			res.json(users);
		})
		.catch(next);
};

module.exports.updateUser = (req, res, next) => {
	const currentUser = req.session.user;
	const { username, password, email, bio, languages } = req.body;

	User.findById(currentUser.id)
		.then((user) => {
			if (!user) {
				//REVISE THIS
				res.status(404).send('User not found');
			}

			//THIS IS NOT SCALABLE IF WE CREATE NEW FIELDS
			user.username = username ? username : user.username;
			user.email = email ? email : user.email;
			user.bio = bio ? bio : user.bio;
			user.password = password ? password : user.password;
			user.languages = languages ? languages : user.languages;

			user
				.save()
				.then((u) => res.status(200).json(u))
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