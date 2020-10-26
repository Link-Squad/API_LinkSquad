const {
  returnRandomSubArray,
  returnRandomNumer
} = require('../helpers/helpers');

const UserGame = require('../models/userGame.model');

const createUsersGames = (users, games, maxAmountPerUser) => {
  const usersGames = [];
  for (let i = 0; i < users.length; i++) {
    const userGames = returnRandomSubArray(games, returnRandomNumer(1,maxAmountPerUser));
    userGames.forEach((el) => {
      const newUserGame = {
        game: el,
        user: users[i],
      };
      usersGames.push(newUserGame);
    });
  }
  return UserGame.create(usersGames);
};

module.exports = createUsersGames;
