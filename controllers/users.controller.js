const User = require('../models/user.model');

//TEST ENDPOINT
module.exports.doLogin = (req, res, next) => {
    res.send('You\'re trying to log in');
};

/* CRUD */
module.exports.createUser = (req, res, next) => {
    const {username, password, email, languages} = req.body;
    const newUser = new User({username, password, email, languages});

    newUser.save()
        .then(u => res.status(201).json(u))
        .catch(next);
};

module.exports.updateUser = (req, res, next) => {
    const {username, password, email, bio, languages} = req.body;

    User.findById("5f8f321ef9c55e4a30ec7764") // Needs to reference session id
        .then(user => {
            if (!user) {
                //REVISE THIS
                res.status(404).send('User not found')
            }

            //THIS IS NOT SCALABLE IF WE CREATE NEW FIELDS
            user.username = username? username : user.username;
            user.email = email? email : user.email;
            user.bio = bio? bio : user.bio;
            user.password = password? password : user.password;
            user.languages = languages? languages : user.languages;

            user.save()
                .then(u => res.status(200).json(u))
                .catch(next);
        })
        .catch(next);
};