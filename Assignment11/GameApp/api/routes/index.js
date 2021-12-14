const express=require("express");
const router=express.Router();
const controllerGames=require("../controllers/games.controller");
const controllerPublishers=require("../controllers/publishers.controller");
const controllerUsers=require("../controllers/users.controller");

router.route("/users")
    .post(controllerUsers.usersRegister);


router.route("/auth")
    .post(controllerUsers.usersAuthenticate);



router.route("/games")
.get(controllerGames.gamesGetAll)
.post(controllerUsers.authenticate,controllerGames.gamesAddOne);

router.route("/games/:gameId")
.get(controllerGames.gamesGetOne)
.put(controllerUsers.authenticate,controllerGames.gamesFullUpdateOne)
.patch(controllerUsers.authenticate,controllerGames.gamesPartialUpdateOne)
.delete(controllerUsers.authenticate,controllerGames.gamesDeleteOne);

router.route("/games/:gameId/publishers")
    .get(controllerPublishers.publishersGetAll)
    .post(controllerUsers.authenticate,controllerPublishers.publisherAddOne);

router.route("/games/:gameId/publishers/:publisherId")
.get(controllerPublishers.publishersGetOne);

module.exports =router;