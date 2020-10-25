require('dotenv').config();
const mongoose = require('mongoose');
const DB_URI = process.env.DB_URI;
const seedUsers = require('./user.seeds');
const seedGames = require('./game.seeds');

mongoose
	.connect(DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	})
	.then(() => {
		console.log('Connection stablished at:  ' + DB_URI);
		mongoose.connection.db.dropDatabase().then(() => {
			console.log('Cleared database');
			Promise.all([seedUsers(5), seedGames(5)]).then((u) => {
                console.log(u)
				mongoose.connection.close();
			});
		});
	})
	.catch((e) => console.error(e));
