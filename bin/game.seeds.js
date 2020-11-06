const faker = require('faker');
const Game = require('../models/games.model');
const {
  returnRandomElement, returnRandomSubArray, returnRandomNumer,
} = require('../helpers/helpers');

const overwatch = {
  name: 'overwatch',
  img: './default/image-placeholder.png',
  description: 'Overwatch is a competitive 6 vs 6 first person shooter.',
  url: 'https://playoverwatch.com/',
  genre: 'FPS',
  platforms: ['PC','PS','XBOX'],
};

const dota = {
  name: 'dota',
  img: './default/image-placeholder.png',
  description: 'Dota is a song by Swedish band Basshunter',
  url: 'http://dota2/play.com',
  genre: 'MOBA',
  platforms: ['PC'],
};

const createGames = (amount) => {
  const games = [overwatch, dota];

  const gamesPlatformArray = Game.schema.path('platforms').caster.enumValues;
  
  for (let i = 0; i < amount; i++) {
    const newGame = {
      name: faker.commerce.productName(),
      img: faker.image.technics(),
      description: faker.lorem.sentence(),
      url: faker.internet.domainName(),
      genre: returnRandomElement(Game.schema.path('genre').enumValues),
      platforms: returnRandomSubArray(gamesPlatformArray,returnRandomNumer(1,gamesPlatformArray.length)),
    };

    games.push(newGame);
  }
  return Game.create(games);
};

module.exports = createGames;
