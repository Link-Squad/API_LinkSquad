const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth.middleware');
const usersController = require('../controllers/users.controller');
const gamesController = require('../controllers/games.controller');
module.exports = router;

router.get('/', (req, res, send) => {
	res.send('Hello you');
});

/* USERS */
router.post('/login', auth.isNotAuthenticated, usersController.doLogin);
router.get('/logout', auth.isAuthenticated, usersController.doLogout);

router.post('/users', auth.isNotAuthenticated, usersController.createUser);
router.get('/users', auth.isAuthenticated, usersController.listUsers);
router.patch('/users', auth.isAuthenticated, usersController.updateUser);
router.delete('/users', auth.isAuthenticated, usersController.deleteUser);

/* GAMES */
router.get('/games', gamesController.getGames);