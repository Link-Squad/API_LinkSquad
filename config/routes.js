const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users.controller');

module.exports = router;

router.get('/', (req, res, send) => {
    res.send('Hello you');
});

/* USERS */
router.post('/login', usersController.doLogin);