//TEST ENDPOINT
module.exports.doLogin = (req, res, next) => {
    res.send('You\'re trying to log in');
};

module.exports.createUser = (req, res, next) => {
    const {username, email, languages, img} = req.body;
}