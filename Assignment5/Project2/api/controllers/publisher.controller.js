const mongoose= require("mongoose");
const Game= mongoose.model("Game");

module.exports.publisherGet= function(req, res) {
    const gameId= req.params.gameId;
    console.log("Get gameId ", gameId);
    Game.findById(gameId).select("publisher").exec(function(err, game) {
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
            response.message= game.publisher? game.publisher : [];
        }
        res.status(response.status).json(response.message);
    });
};

const _addPublisher= function(req, res, game) {
    game.publisher.name= req.body.name;
    game.publisher.country= req.body.country;
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
        response.message= updatedGame.publisher;
    }
    res.status(response.status).json(response.message);
    });
}

module.exports.publisherAdd= function(req, res) {
    const gameId= req.params.gameId;
    console.log("Get gameId ", gameId);
    Game.findById(gameId).select("publisher").exec(function(err, game) {
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
        if(!(game.publisher)) {
            game.publisher= {};
        }
        _addPublisher(req, res, game);
    } else {
        res.status(response.status).json(response.message);
    }

    });
}

const _updatePublisher= function(req, res, game) {
    game.publisher.name= req.body.name;
    game.publisher.country= req.body.country;
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
            response.message=updateGame.publisher;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.publisherUpdate= function(req, res) {
    const gameId= req.params.gameId;
    console.log("PUT gameId ", gameId);
    Game.findById(gameId).select("publisher").exec(function(err, game) {
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
    } else {
        _updatePublisher(req, res, game);
    }
    });
};

const _deletePublisher= function(req, res, game) {
    game.publisher.remove();
    game.save(function(err, game) {
    const response= {
        status: 204
    };
    if (err) {
        console.log("Error finding game");
        response.status= 500;
        response.message= err;
    }else{
        response.message= {"message":"Publisher deleted"};
    }
    res.status(response.status).json(response.message);
    });
}

module.exports.publisherDelete= function(req, res) {
    const gameId= req.params.gameId;
    console.log("PUT gameId ", gameId);
    Game.findById(gameId).select("publisher").exec(function(err, game) {
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
            res.status(response.status ).json(response.message);
        } else {
            _deletePublisher(req, res, game);
        }
    });
};

    