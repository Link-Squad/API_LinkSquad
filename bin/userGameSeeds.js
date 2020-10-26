require('dotenv').config();
require('../config/db.config');
const UserGame = require('../models/userGame.model');


const createUsersGames(users,games,number) {

}

Promise.all([UserGame.deleteMany()])
  .then(() => {
    const game = new Games({
      name: 'overwatch',
      img: '/default/image-placeholder.png',
      description: 'Overwatch is a competitive 6 vs 6 first person shooter.',
      url: 'https://playoverwatch.com/',
      genre: 'FPS',
      platforms: 'PC',
    });
    game.save().then((game) => {
      console.log(game);
    });
  })
  .catch((e) => console.log(e));

/*Promise.all([Games.deleteMany()])
  .then(() => {
    const game = new Games({
      name: "overwatch",
      img: "/default/image-placeholder.png",
      description: "Overwatch is a competitive 6 vs 6 first person shooter.",
      url: "https://playoverwatch.com/",
      genre: "FPS",
      platforms: "PC",
    });
    game.save().then((game) => {
      console.log(game);
    });
  })
  .catch((e) => console.log(e));*/
