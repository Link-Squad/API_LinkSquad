const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth.middleware');
const usersController = require('../controllers/users.controller');
const gamesController = require('../controllers/games.controller');
const usersGamesController = require('../controllers/userGame.controller')
const friendshipsController = require('../controllers/friendships.controller');


/* GAMES */
router.get('/games', gamesController.getGames);
router.post('/games', gamesController.createGame);
router.patch('/games', gamesController.updateGame);
router.delete('/games', gamesController.deleteGame);

/* USERS */
router.get('/logout', auth.isAuthenticated, usersController.doLogout);
router.post('/login', auth.isNotAuthenticated, usersController.doLogin);


router.get('/users', auth.isAuthenticated, usersController.listUsers);
router.post('/users', auth.isNotAuthenticated, usersController.createUser);
router.patch('/users', auth.isAuthenticated, usersController.updateUser);
router.delete('/users', auth.isAuthenticated, usersController.deleteUser);

/*USERS GAMES*/
router.post('/usersgames/new/', usersGamesController.createUserGame);
router.get('/usersgames/', usersGamesController.getUserGame);
router.delete('/usersgames/delete/', usersGamesController.deleteUserGame);

/* FRIENDSHIPS */
router.get('/friends/:id', auth.isAuthenticated, friendshipsController.getFriends);
router.post('/friends/:id', auth.isAuthenticated, friendshipsController.addFriend);
router.patch('/friends/:id', auth.isAuthenticated, friendshipsController.updateFriend);

module.exports = router;
