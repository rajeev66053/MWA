
const mongoose=require("mongoose");
const Game=mongoose.model("Game");


module.exports.gamesGetAll=function(req,res){
    console.log("Get the Games");

    const currentPage=(req.query.currentPage)?parseInt(req.query.currentPage):1;
    const pageSize=(req.query.pageSize)?parseInt(req.query.pageSize):5;
    const search=req.query.search;

    if(isNaN(currentPage) && isNaN(pageSize)){
        response.status=404;
        response.message={"message":"QueryString currentPage and pageSize must be Number."};
        
    }

    if(search){

        const offset=(currentPage-1)*pageSize;
        Game.find({"title":search}).skip(offset).limit(pageSize).exec(function(err,games){
                
            if(err){
                response,status=500,
                res.status(500).json({"Error":err});
            }else{
                total=0;
                Game.countDocuments( {"title":search}, function(err, result){
                    console.log(result);

                    if(err){
                        res.send(err)
                    }
                    else{
                       total=result;
                    }
                    
                    res.status(200).json({"games":games,"total":result});
                })
            }
        });

    }else{

        const offset=(currentPage-1)*pageSize;
        Game.find().skip(offset).limit(pageSize).exec(function(err,games){
            if(err){
                console.log("Error finding games"); 
                res.status(500).json({"Error":err});
            }else{
                total=0;
                console.log("test");
                Game.countDocuments({}, function(err, result){
                    console.log(result);

                    if(err){
                        res.send(err)
                    }
                    else{
                       total=result;
                    }
                    res.status(200).json({"games":games,"total":result});
            
               })
                
            }
        });
    }
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
            // res.status(500).json({"Error":err});
            response.status=500;
            response.message=err;
        }else if(!game){
            //    res.status(404).json({"message":"Game Id not found"});
            response.status=404;
            response.message={"message":"Game Id not found"};
        }
        // else{            
        //     console.log("GET game  with gameid",gameId);
        //     res.status(200).json(game);
        // }

        res.status(response.status).json(response.message);

        })
    
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

        newGame.price=parseFloat(req.body.price);
        newGame.title=req.body.title;
        newGame.rate=parseInt(req.body.rate);
        newGame.year=parseInt(req.body.year);
        newGame.minPlayers=parseInt(req.body.minPlayers);
        newGame.maxPlayers=parseInt(req.body.maxPlayers);
        newGame.minAge=parseInt(req.body.minAge);
        newGame.designers=req.body.designers;
        newGame.publisher={};

        if(isNaN(newGame.price)&&isNaN(newGame.rate)&&isNaN(newGame.year)&&isNaN(newGame.minPlayers)&&isNaN(newGame.maxPlayers)&&isNaN(newGame.minAge)){
            response.status=404;
            response.message={"message":"QueryString price,rate,year,minPlayers,maxPlayers and minAge must be Number."};
        }else{
            Game.create(newGame,function(err,game){
                console.log("The callback game is ",game);
                if(err){
                    response.status=500;
                    response.message=err;
    
                }else{
                    response.message=game;
    
                }  
                res.status(response.status).json(response.game);       
            });

        }
        
    }else{
        console.log("Data missing from post body");
        response.status=400;
        response.message={"Error":"Request data missing from post body"};
        
        res.status(response.status).json(response.game); 
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
            // res.status(500).json({"Error":err});
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
            game.year=req.body.year;
            game.price=req.body.price;
            game.minPlayers=req.body.minPlayers;
            game.maxPlayers=req.body.maxPlayers;
            game.rate=req.body.rate;
            game.minAge=req.body.minAge;
            game.save(function(rerr,updatedGame){
                if(err){
                    response.status=500;
                    response.message=err;
                }else{
                    response.message={"message":"Updated game"+gameId};
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
            // res.status(500).json({"Error":err});
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
            game.year=req.body.year;
            }
            if(req.body.price){
            game.price=req.body.price;
            }
            if(req.body.minPlayers){
            game.minPlayers=req.body.minPlayers;
            }
            if(req.body.maxPlayers){
            game.maxPlayers=req.body.maxPlayers;
            }
            if(req.body.rate){
            game.rate=req.body.rate;
            }
            if(req.body.minAge){
            game.minAge=req.body.minAge;
            }
            game.save(function(rerr,updatedGame){
                if(err){
                    response.status=500;
                    response.message=err;
                }else{
                    response.message={"message":"Updated game"+gameId};
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
            // res.status(500).json({"Error":err});
            response.status=500;
            response.message=err;
        }else if(!deletedGame){
            //    res.status(404).json({"message":"Game Id not found"});
            response.status=404;
            response.message={"message":"Game Id not found"};
        }
        // else{            
        //     console.log("GET game  with gameid",gameId);
        //     res.status(200).json(game);
        // }

        res.status(response.status).json(response.message);

        })
    
};


