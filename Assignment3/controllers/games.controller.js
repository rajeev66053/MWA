const { ObjectID } = require("mongodb");
const dBconnection=require("../data/dbconnection");

module.exports.gamesGetAll=function(req,res){

    var offset=0;
    var count=3;
    if(req.query && req.query.offset){
        offset=parseInt(req.query.offset);
    }
    if(req.query && req.query.count){
        count=parseInt(req.query.count);
        if(count>7){
            count=7;
        }
    }

    const db=dBconnection.get();
    const collection=db.collection("games");
    collection.find().skip(offset).limit(count).toArray(function (err,games) {
        console.log("Found games ",games);
        res.status(200).json(games);
    });

};

module.exports.gamesGetOne=function(req,res){
    const gameId=req.params.gameId;
    const db=dBconnection.get();
    const collection=db.collection("games");
    collection.findOne({_id:ObjectID(gameId)},function(err,game){
        console.log("Get game with gameid ",gameId);
        res.status(200).json(game);
    })

};