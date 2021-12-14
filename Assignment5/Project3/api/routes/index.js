const express=require("express");
const router=express.Router();
const controllerGames=require("../controllers/games.controller");
const controllerPublisher= require("../controllers/publisher.controller");
const controllerReviews= require("../controllers/reviews.controller");

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


router.route("/games/:gameId/reviews")
.get(controllerReviews.reviewsGetAll)
.post(controllerReviews.reviewsAddOne);

router.route("/games/:gameId/reviews/:reviewId")
.get(controllerReviews.reviewsGetOne)
.put(controllerReviews.reviewsFullUpdateOne)
.patch(controllerReviews.reviewsPartialUpdateOne)
.delete(controllerReviews.reviewsDeleteOne);

module.exports =router;