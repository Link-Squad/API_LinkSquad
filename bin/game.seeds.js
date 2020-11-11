const faker = require('faker');
const Game = require('../models/games.model');
const {
  returnRandomElement, returnRandomSubArray, returnRandomNumer,
} = require('../helpers/helpers');

const overwatch = {
  name: 'overwatch',
  logo: './logos/overwatch.png',
  icon: './icons/overwatch.png',
  banner: './banners/overwatch.jpg',
  description: 'Overwatch is a competitive 6 vs 6 first person shooter.',
  url: 'https://playoverwatch.com/',
  genre: 'FPS',
  platforms: ['PC','PS','XBOX'],
};

const dota = {
  name: 'dota',
  logo: './logos/dota.png',
  icon: './icons/dota.png',
  banner: './banners/dota.png',
  description: 'Dota is a song by Swedish band Basshunter',
  url: 'http://dota2/play.com',
  genre: 'MOBA',
  platforms: ['PC'],
};

const counter = {
  name: 'counterstrike',
  logo: './logos/counter.png',
  icon: './icons/counter.png',
  banner: './banners/counter.jpg',
  description: 'A popular game amongst slav teenagers',
  url: 'counterstrike',
  genre: 'FPS',
  platforms: ['PC']
}

const lol = {
  name: 'lol',
  logo: './logos/lol.png',
  icon: './icons/lol.png',
  banner: './banners/lol.jpg',
  description: 'Lots of Love <3',
  url: 'google.com',
  genre: 'MOBA',
  platforms: ['PC']
}

const fortnite = {
  name: 'fortnite',
  logo: './logos/fortnite.png',
  icon: './icons/fortnite.png',
  banner: './banners/fortnite.jpeg',
  description: 'A time based construction simulator with skydiving',
  url: 'youtube.ru',
  genre: 'ACTION',
  platforms:  ['PS', 'XBOX', 'PC']
}

const createGames = (amount) => {
  const games = [overwatch, dota, counter, lol, fortnite];

  const gamesPlatformArray = Game.schema.path('platforms').caster.enumValues;
  
  for (let i = 0; i < amount; i++) {
    const newGame = {
      name: faker.commerce.productName(),
      logo: fakerlogosimage.technics(),
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
