const Offer = require('../models/offer.model');
const helpers = require('../helpers/helpers');
const faker = require('faker');

const ROLES = ['Tank', 'Support', 'DPS', 'Stealth', 'Jungle', 'Vanguard', 'Captain']

const createOffers = (amount, users, games) => {
    const offers = [];

    for (let i = 0; i < amount; i++) {
        const randGame = helpers.returnRandomElement(games);
        const newOffer = {
            user: helpers.returnRandomElement(users),
            game: randGame,
            img: randGame.banner,
            role: helpers.returnRandomElement(ROLES),
            rank: helpers.returnRandomNumer(1, 10),
            description: faker.lorem.sentence()
        };

        offers.push(newOffer);
    }

    return Offer.create(offers);
};

module.exports = createOffers;