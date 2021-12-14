const mongoose=require("mongoose");
const Game=mongoose.model("Game");

module.exports.gamesGetAll=function(req,res){
    console.log("Get the Games");
    console.log(req.query);

    var offset=0;
    var count=5;

    if(req.query && req.query.offset){
        offset=parseInt(req.query.offset);

    }

    if(req.query && req.query.count){
        count=parseInt(req.query.count);

    }

   Game.find().skip(offset).limit(count).exec(function(err,games){
       console.log("Found games",games);
       res.status(200).json(games);
   });
};

module.exports.gamesGetOne=function(req,res){
    const gameId=req.params.gameId;
    Game.findById(gameId).exec(function(err,game){
        console.log("GET game  with gameid",gameId);
        res.status(200).json(game);
    })    
};
