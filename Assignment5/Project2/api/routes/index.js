const express=require("express");
const router=express.Router();
const controllerGames=require("../controllers/games.controller");
const controllerPublisher= require("../controllers/publisher.controller");

router.route("/games")
.get(controllerGames.gamesGetAll)
.post(controllerGames.gamesAddOne);

router.route("/games/:gameId")
.get(controllerGames.gamesGetOne)
.put(controllerGames.gamesFullUpdateOne)
.patch(controllerGames.gamesPartialUpdateOne)
.delete(controllerGames.gamesDeleteOne);

router.route("/games/:gameId/publisher")
.get(controllerPublisher.publisherGet)
.post(controllerPublisher.publisherAdd)
.put(controllerPublisher.publisherUpdate)
.delete(controllerPublisher.publisherDelete);

module.exports =router;