require('dotenv').config();
const mongoose = require('mongoose');
const DB_URI = process.env.DB_URI;
const seedUsers = require('./user.seeds');
const seedGames = require('./game.seeds');
const seedFriendships = require('./friendship.seeds');
const seedOffers = require('./offers.seeds');
const seedUsersGames = require('./usersgames.seeds');

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
	console.log('Connection stablished at:  ' + DB_URI);
	console.log(mongoose.connection.db);
    mongoose.connection.db.dropDatabase().then(() => {
      console.log('Cleared database');
      Promise.all([seedUsers(50), seedGames(15)]).then((models) => {
        const [users, games] = models;

        Promise.all([
          seedFriendships(15, users),
          seedOffers(10, users, games),
          seedUsersGames(users, games),
        ])
          .then((d) => {
            console.info('Database seeded, closing database...');
            mongoose.connection.close();
          })
          .catch((e) => console.error(e));
      });
    });
  })
  .catch((e) => console.error(e));
