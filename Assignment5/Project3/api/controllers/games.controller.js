const mongoose=require("mongoose");
const Game=mongoose.model("Game");


module.exports.gamesGetAll=function(req,res){
    console.log("Get the Games");
    console.log(req.query);

    const maxCount=10;
    const defaultOffset=0;
    const defaultcount=5;
    let offset=defaultOffset;
    let count=defaultcount;

    if(req.query && req.query.offset){
        offset=parseInt(req.query.offset);

    }

    if(req.query && req.query.count){
        count=parseInt(req.query.count);

    }

    //This is the type check
    if(isNaN(offset)|| isNaN(count)){
        res.status(400).json({"message:":"QueryString offset and count should be numbers."});
    }

    //Limit check
    if(count > maxCount){
        response.status(400).json({"message":"QueryString count cannot exceed "+maxCount});

    }

   Game.find().skip(offset).limit(count).exec(function(err,games){

    if(err){
        console.log("Error finding games"); 
        res.status(500).json({"Error":err});
   }else{
    console.log("Found games",games);
    res.status(200).json(games);
   }  
   });
};

module.exports.gamesGetOne=function(req,res){
    const gameId=req.params.gameId;
    Game.findById(gameId).exec(function(err,game){      
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
        }
        res.status(response.status).json(response.message);
    });
    
};

module.exports.gamesAddOne=function(req,res){
    console.log("POST new game");
    const response={
        status:201,
        message:""
    }
    if(req.body && req.body.title && req.body.price && req.body.rate){

        console.log(req.body);        
        const newGame={};

        //Type checking        

        newGame.title=req.body.title;
        newGame.year=parseInt(req.body.year);
        newGame.rate=parseFloat(req.body.rate);
        newGame.price=parseFloat(req.body.price);
        newGame.minPlayers=parseInt(req.body.minPlayers);
        newGame.maxPlayers=parseInt(req.body.maxPlayers);
        newGame.minAge=parseInt(req.body.minAge);
        newGame.designer=req.body.designer;
        Game.create(newGame,function(err,game){
            console.log("The callback game is ",game);
            if(err){
                response.status=500;
                response.message=err;

            }else{
                response.message=game;
            }  
            res.status(response.status).json(response.message);       
        });
    }else{
        console.log("Data missing from post body");
        response.status=400;
        response.message={"Error":"Request data missing from post body"};        
        res.status(response.status).json(response.message); 
    }
};

module.exports.gamesFullUpdateOne=function(req,res){
    const gameId=req.params.gameId;
    Game.findById(gameId).exec(function(err,game){      
        const response={
            status:204,
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
        }

        if(response.status!=204){
            res.status(response.status).json(response.message);

        }else{

            //update the game
            game.title=req.body.title;
            game.year=parseInt(req.body.year);
            game.rate=parseFloat(req.body.rate);
            game.price=parseFloat(req.body.price);
            game.minPlayers=parseInt(req.body.minPlayers);
            game.maxPlayers=parseInt(req.body.maxPlayers);
            game.minAge=parseInt(req.body.minAge);
            game.designer=req.body.designer;
            game.save(function(err,updatedGame){
                if(err){
                    response.status=500;
                    response.message=err;
                }else{
                    response.message={"message":"Updated game "+updatedGame};
                }                
                res.status(response.status).json(response.message);
            });
        }
    })   
};


module.exports.gamesPartialUpdateOne=function(req,res){
    const gameId=req.params.gameId;
    Game.findById(gameId).exec(function(err,game){      
        const response={
            status:204,
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
        }

        if(response.status!=204){
            res.status(response.status).json(response.message);

        }else{
            //update the game
            if(req.body.title){
                game.title=req.body.title;
            }
            if(req.body.year){
                game.year=parseInt(req.body.year);
            }
            if(req.body.rate){
                game.rate=parseFloat(req.body.rate);
            }
            if(req.body.price){
                game.price=parseFloat(req.body.price);
            }
            if(req.body.minPlayers){
                game.minPlayers=parseInt(req.body.minPlayers);
            }
            if(req.body.maxPlayers){
                game.maxPlayers=parseInt(req.body.maxPlayers);
            }
            
            if(req.body.minAge){
                game.minAge=parseInt(req.body.minAge);
            }
            if(req.body.designer){
                game.designer=req.body.designer;
            }
            game.save(function(err,updatedGame){
                if(err){
                    response.status=500;
                    response.message=err;
                }else{
                    response.message={"message":"Updated game "+updatedGame};
                }                
                res.status(response.status).json(response.message);
            });
        }
    })   
};

module.exports.gamesDeleteOne=function(req,res){
    const gameId=req.params.gameId;
    Game.findByIdAndDelete(gameId).exec(function(err,deletedGame){      
        const response={
            status:204,
            message:deletedGame
        }
        //Error check
        if(err){
            console.log("Error finding games");
            response.status=500;
            response.message=err;
        }else if(!deletedGame){
            response.status=404;
            response.message={"message":"Game Id not found"};
        }
        res.status(response.status).json(response.message);
    });    
};


