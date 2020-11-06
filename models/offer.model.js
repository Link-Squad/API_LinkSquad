const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    role: {
        type: String,
        required: true,
    },
    rank: {
        type: String,
        required: true,
        default: '1'
    },
    description: {
        type: String,
        required: true
    },
    img : {
        type: String,
        default: './banners/default.png'
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