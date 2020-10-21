const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users.controller');
const gamesController = require('../controllers/games.controller');
module.exports = router;

router.get('/', (req, res, send) => {
  res.send('Hello you');
});

/* USERS */
router.post('/login', usersController.doLogin);

router.post('/users', usersController.createUser);
router.get('/users', usersController.listUsers);
router.patch('/users', usersController.updateUser);
router.delete('/users', usersController.deleteUser);

/* GAMES */
router.get('/games', gamesController.getGames);
router.post('/games', gamesController.createGame);
router.patch('/games', gamesController.updateGame);
router.delete('/games', gamesController.deleteGame);
