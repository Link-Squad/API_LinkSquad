const Offer = require('../models/offer.model');
const helpers = require('../helpers/helpers');
const faker = require('faker');

const createOffers = (amount, users, games) => {
    const offers = [];

    for (let i = 0; i < amount; i++) {
        const newOffer = {
            user: helpers.returnRandomElement(users),
            game: helpers.returnRandomElement(games),
            role: faker.hacker.noun(),
            description: faker.lorem.sentence()
        };

        offers.push(newOffer);
    }

    return Offer.create(offers);
};

module.exports = createOffers;