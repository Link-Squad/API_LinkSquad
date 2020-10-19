const User = require('../models/user.model');
//TEST ENDPOINT
module.exports.doLogin = (req, res, next) => {
    res.send('You\'re trying to log in');
};

module.exports.createUser = (req, res, next) => {
    const {username, password, email, languages} = req.body;
    const newUser = new User({username, password, email, languages});

    newUser.save()
        .then(u => res.status(201).json(u))
        .catch(next);
};

module.exports.updateUser = (req, res, next) => {
    const {username, password, email, language} = req.body;

    //User.find(data)
    //then(user => user.updateOne)
}
