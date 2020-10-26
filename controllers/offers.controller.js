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
        .then(offer => res.status(201).json(offer))
        .catch(next);
};

module.exports.updateOffer = (req, res, next) => {
    const _id = req.params.id;
    const user = req.session.user.id;
    const query = {_id, user};

    Offer.findOneAndUpdate(query, req.body, {new: true})
        .then(offer => res.status(200).json(offer))
        .catch(next);
};

module.exports.deleteOffer = (req, res, next) => {
    const id = req.params.id;

    Offer.findByIdAndDelete(id)
        .then(() => res.send('Your offer was successfully deleted'))
        .catch(next);
};