const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    game: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    toJSON: {
        transform: (document, toReturn) => {
            toReturn.id = document._id;
            delete toReturn.__v;
            delete toReturn._id;
            delete toReturn.updatedAt;
            return toReturn;
        }
    }
});

const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;