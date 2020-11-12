const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth.middleware');
const usersController = require('../controllers/users.controller');
const gamesController = require('../controllers/games.controller');
const friendshipsController = require('../controllers/friendships.controller');
const offersController = require('../controllers/offers.controller');
const usersGamesController = require('../controllers/userGame.controller')



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
router.get('/users/search',usersController.findUsers)


/*USERS GAMES*/
router.post('/usersgames/new/', usersGamesController.createUserGame);
router.get('/usersgames/', usersGamesController.getUserGame);
router.get('/games/:gameId/users', usersGamesController.getUsersByGame);
router.delete('/usersgames/delete/', usersGamesController.deleteUserGame);

/* FRIENDSHIPS */
router.get('/friends/:userId', auth.isAuthenticated, friendshipsController.getFriends);
router.post('/friends/:befriendedUser', auth.isAuthenticated, friendshipsController.addFriend);
router.patch('/friends/:requestingUser', auth.isAuthenticated, friendshipsController.acceptFriend);
router.delete('/friends/:friendshipId', auth.isAuthenticated, friendshipsController.deleteFriendship);


/* OFFERS */
router.get('/offers', auth.isAuthenticated, offersController.getOffers);
router.post('/offers', auth.isAuthenticated, offersController.createOffer);
router.patch('/offers/:id', auth.isAuthenticated, offersController.updateOffer);
router.delete('/offers/:id', auth.isAuthenticated, offersController.deleteOffer);

module.exports = router;