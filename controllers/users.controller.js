const User = require('../models/user.model');
//TEST ENDPOINT
module.exports.doLogin = (req, res, next) => {
    res.send('You\'re trying to log in');
};

module.exports.createUser = (req, res, next) => {
    const {username, email, languages, img} = req.body;
    const newUser = {username, email, languages, img};

    User.create(user)
        .then(res.JSON)
        //TODO
}