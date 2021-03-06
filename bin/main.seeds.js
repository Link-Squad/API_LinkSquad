require('dotenv').config();
const mongoose = require('mongoose');
const DB_URI = process.env.DB_URI || 'mongodb://127.0.0.1:27017';
const seedUsers = require('./user.seeds');
const seedGames = require('./game.seeds');
const seedFriendships = require('./friendship.seeds');
const seedOffers = require('./offers.seeds');
const seedUsersGames = require('./usersgames.seeds');

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.info('Connection stablished at:  ' + DB_URI);
    mongoose.connection.db.dropDatabase().then(() => {
      console.info('Cleared database');
      Promise.all([seedUsers(50), seedGames(0)]).then((models) => {
        const [users, games] = models;

        Promise.all([
          seedFriendships(15, users),
          seedOffers(10, users, games),
          seedUsersGames(users, games,2),
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
