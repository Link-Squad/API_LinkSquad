const Offer = require('../models/offer.model');
const helpers = require('../helpers/helpers');
const LANGUAGES = require('../constants/constants').AVAILABLE_USER_LANGUAGES;
const faker = require('faker');

const ROLES = ['Tank', 'Support', 'DPS', 'Stealth', 'Jungle', 'Vanguard', 'Captain']

const createOffers = (amount, users, games) => {
    const offers = [];

    for (let i = 0; i < amount; i++) {
        const randGame = helpers.returnRandomElement(games);
        const randLanguages = helpers.returnRandomSubArray(LANGUAGES, 2);
        const randUser = helpers.returnRandomElement(users);
        const randTeamName = faker.company.companyName();
        const randDescription = `We love ${faker.company.catchPhrase()}, and we're looking for a ${faker.company.bsAdjective()} partner to ${faker.company.bsBuzz()} the gaming scene with us. Are you ready?`;

        const newOffer = {
            user: randUser,
            game: randGame,
            img: randGame.banner,
            role: helpers.returnRandomElement(ROLES),
            rank: helpers.returnRandomNumer(1, 10),
            description: randDescription,
            title: `Team ${randTeamName} is looking for a teammate`,
            languages: randLanguages
        };

        offers.push(newOffer);
    }

    return Offer.create(offers);
};

module.exports = createOffers;