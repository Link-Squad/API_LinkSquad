const Offer = require('../models/offer.model');

module.exports.getOffers = (req, res, next) => {
    const query = req.params.query || {};

    //populate user
    Offer.find(query)
        .then(offers => res.status(200).json(offers))
        .catch(next);
};

module.exports.createOffer = (req, res, next) => {
    const user = req.session.user.id;
    const {game, role, description} = req.body;

    const newOffer = new Offer({user, game, role, description});

    newOffer.save()
        .then(res.status(201).json(offer))
        .catch(next);
};