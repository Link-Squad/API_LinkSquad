const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: [true, 'Username is required'],
        unique: [true, 'This username is unavailable'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Invalid email address'],
        match: [EMAIL_PATTERN, 'Invalid email address']
    },
    languages: {
        type: [String],
        required: [true, 'You must specify a language'],
        enum: [
            'Español',
            'English',
            'Français'
        ]
    },
    img: {
        type: String,
        default: 'default img url'
    },
    status: {
        token: {
            type: String,
            default: generateRandomToken()
        },
        active: {
            type: Boolean,
            default: false
        }
    },
    //TODO: CHECK IF LINK BELONGS TO CORRESPONDING SOCIAL MEDIA
    social: {
        twitter: {
            id: String,
            link: String
        },
        twitch: {
            id: String,
            link: String
        },
        youtube: {
            id: String,
            link: String
        },
        discord: {
            id: String,
            link: String
        }
    }
}, {
    timestamps: true
});

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, 10)
            .then(hash => {
                this.password = hash;
                next();
            });
    }
});

userSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
