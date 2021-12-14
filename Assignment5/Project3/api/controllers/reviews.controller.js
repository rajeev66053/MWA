const mongoose= require("mongoose");
const Game= mongoose.model("Game");

module.exports.reviewsGetAll= function(req, res) {
    const gameId= req.params.gameId;
    Game.findById(gameId).select("reviews").exec(function(err, game) {
        const response= {
            status: 200,
            message: []
        };
        if (err) {
            console.log("Error finding game");
            response.status= 500;
            response.message= err;
        } else if (!game) {
            console.log("Game id not found in database", gameId);
            response.status= 404; 
            response.message= {"message": "Game ID not found"+gameId};
        } else {
            response.message= game.reviews? game.reviews : [];
        }
        res.status(response.status).json(response.message);
    });
};

module.exports.reviewsGetOne= function(req, res) {
    const gameId= req.params.gameId;
    const reviewId= req.params.reviewId;
    console.log("GET reviewId "+ reviewId+ " for gameId "+ gameId);
    Game.findById(gameId).select("reviews").exec(function(err, game) {
        const response={
            status:200,
            message:game
        }
        //Error check
        if(err){
            console.log("Error finding games"); 
            response.status=500;
            response.message=err;
        }else if(!game){
            response.status=404;
            response.message={"message":"Game Id not found"};
        }else{
            const review= game.reviews.id(reviewId);
            response.message=review;
        }
        res.status(response.status).json(response.message);
    });
}


const _addReview= function(req, res, game) {

    game.reviews.push({
        name: req.body.name,
        review: req.body.review,
        createdOn:Date.now()
    });
    console.log(game.reviews);
    console.log("After update reviews");
    game.save(function(err, updatedGame) {
        const response= {
            status: 200,
            message: []
        };
        if (err) {
            response.status= 500;
            response.message= err;
        } else {
            response.status= 201;
            response.message= updatedGame.reviews;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.reviewsAddOne= function(req, res) {
    const gameId= req.params.gameId;
    console.log("Get gameId ", gameId);
    Game.findById(gameId).select("reviews").exec(function(err, game) {
        const response= {
            status: 200,
            message: []
        };
        if (err) {
            console.log("Error finding game");
            response.status= 500;
            response.message= err;
        } else if (!game) {
            console.log("Game id not found in database", gameId);
            response.status= 404;
            response.message= {"message": "Game ID not found"+gameId};
        }
        if (game) {            
            _addReview(req, res, game);
        } else {
            res.status(response.status).json(response.message);
        }

    });
}


const _updateReview= function(req, res, game) {    

    game.save(function(err, updateGame) {
        const response= {
            status: 204,
            message: []
        };
        if (err) {
            console.log("Error finding game");
            response.status= 500;
            response.message= err;
        }else{
            response.message=updateGame.reviews;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.reviewsFullUpdateOne= function(req, res) {
    const gameId= req.params.gameId;    
    const reviewId=req.params.reviewId;
    console.log("PUT gameId ", gameId);
    Game.findById(gameId).select("reviews").exec(function(err, game) {
        const response= {status: 204};
        if (err) {
            console.log("Error finding game");
            response.status= 500;
            response.message= err;
        } else if(!game) {
            response.status= 404;
            response.message= {"message" : "Game ID not found"};
        }
        
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        }else{
            const review= game.reviews.id(reviewId);
            review.name=req.body.name;
            review.review=req.body.review;
            _updateReview(req, res, game);
        }
    
    });
};


module.exports.reviewsPartialUpdateOne= function(req, res) {
    const gameId= req.params.gameId;    
    const reviewId=req.params.reviewId;
    console.log("PUT gameId ", gameId);
    Game.findById(gameId).select("reviews").exec(function(err, game) {
        const response= {status: 204};
        if (err) {
            console.log("Error finding game");
            response.status= 500;
            response.message= err;
        } else if(!game) {
            response.status= 404;
            response.message= {"message" : "Game ID not found"};
        }
        
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        }else{
            const review= game.reviews.id(reviewId);
            if(req.body.name){
                review.name=req.body.name;
            }
            if(req.body.review){
                review.review=req.body.review;
            }
            _updateReview(req, res, game);
        }
    
    });
};


const _deleteReview= function(req, res, game,reviewId) {
    const review= game.reviews.id(reviewId);
    review.remove();
    game.save(function(err, game) {
        const response= {
            status: 204
        };
        if (err) {
            console.log("Error finding game");
            response.status= 500;
            response.message= err;
        }else{
            response.message= {"message":"Review with id "+reviewId+"  deleted"};
        }
        res.status(response.status).json(response.message);
    });
}


module.exports.reviewsDeleteOne=function(req,res){
    const gameId=req.params.gameId;
    const reviewId=req.params.reviewId;
    Game.findById(gameId).select("reviews").exec(function(err,game){      
        const response= {status: 204};
        if (err) {
            console.log("Error finding game");
            response.status= 500;
            response.message= err;
        } else if(!game) {
            response.status= 404;
            response.message= {"message" : "Game ID not found"};
        }
        
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        }else{
            
            _deleteReview(req, res, game,reviewId);
        }
    });    
};