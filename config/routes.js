const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth.middleware');
const usersController = require('../controllers/users.controller');
const gamesController = require('../controllers/games.controller');
const usersGamesController = require('../controllers/userGame.controller')
module.exports = router;


/* GAMES */
router.get('/games', gamesController.getGames);
router.post('/games', gamesController.createGame);
router.patch('/games', gamesController.updateGame);
router.delete('/games', gamesController.deleteGame);

/* USERS */
router.post('/login', auth.isNotAuthenticated, usersController.doLogin);
router.get('/logout', auth.isAuthenticated, usersController.doLogout);

router.post('/users', auth.isNotAuthenticated, usersController.createUser);
router.get('/users', auth.isAuthenticated, usersController.listUsers);
router.patch('/users', auth.isAuthenticated, usersController.updateUser);
router.delete('/users', auth.isAuthenticated, usersController.deleteUser);

/*USERS GAMES*/
router.post('/users/:game/:user', usersGamesController.createUserGame);