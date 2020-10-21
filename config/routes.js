const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.controller");
const gamesController = require("../controllers/games.controller");
module.exports = router;

router.get("/", (req, res, send) => {
  res.send("Hello you");
});

/* USERS */
router.post("/login", usersController.doLogin);
router.post("/users", usersController.createUser);

/* GAMES */
router.get("/games", gamesController.getGames);
router.patch("/games", gamesController.updateGame);
