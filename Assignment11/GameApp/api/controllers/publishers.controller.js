const mongoose=require("mongoose");
const Game=mongoose.model("Game");

module.exports.publishersGetAll=function(req,res){

    console.log("Get all publishers for a Game");
    const gameId=req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function(err,game){
        console.log("GET publishers for game with gameid",gameId);
        res.status(200).json(game.publisher);
    });

};

module.exports.publishersGetOne=function(req,res){
    console.log("Get publisher by id for a Game");
    const gameId=req.params.gameId;
    const publisherId=req.params.publisherId;
    Game.findById(gameId).select("publisher").exec(function(err,game){
        // const publisherId=game.publisher.id(publisherId);
        console.log("GET publishers for game with gameid",gameId);
        res.status(200).json(game.publisher);
    });
    
};

const _addPublisher=function(req,res,game,response){
    game.publisher.name=req.body.name;
    // game.publisher.location.type="Point";
    // game.publisher.location.coordinates=[parseFloat(req.body.lng),parseFloat(req.body.lat)];

    game.save(function(err,updatedGame){
        if(err){
        response.status=500;
        response.message=err; 
        }else{
            response.message=updatedGame;
        }
        res.status(response.status).json(response.message);

    })
};

module.exports.publisherAddOne=function(req,res){
    console.log("Add one publisher to a Game");
    const gameId=req.params.gameId;
    Game.findById(gameId).exec(function(err,game){
        const response={
            status:201,
            message:game
        }
        if(err){
            response.status=500;
            response.message=err;
        }
        else if(!game){
            console.log("Game id not found in database");
            response.status=404;
            response.message={"message":"Game id not found"+gameId};

        }
        //This decide how to send a reponse
        if(game){
            _addPublisher(req,res,game,response);
        }else{
            res.status(response.status).json(response.message);
        }
        // const publisherId=game.publisher.id(publisherId);
        // console.log("GET publishers for game with gameid",gameId);
        // res.status(200).json(game.publisher);
    });
    
};
