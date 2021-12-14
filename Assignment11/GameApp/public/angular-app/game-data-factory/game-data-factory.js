angular.module("meanGames").factory("GameDataFactory",GameDataFactory);

function GameDataFactory($http){
    return {
        getAllGames:getAllGames,
        getOneGame:getOneGame,
        addOneGame:addOneGame,
        replaceOneGame:replaceOneGame
    }

    function getAllGames(query1,query2,query3){
        if(query1 && query2 && query3){
            return $http.get("/api/games?search="+query1+"&&currentPage="+query2+"&&pageSize="+query3).then(complete).catch(failed);
        }else if(query1 && query2){
            return $http.get("/api/games?currentPage="+query1+"&&pageSize="+query2).then(complete).catch(failed); 
        }else if(query1){
            return $http.get("/api/games?search="+query1).then(complete).catch(failed); 
        }else{
            return $http.get("/api/games").then(complete).catch(failed); 
        }      
    }

    function getOneGame(id){
        return $http.get("/api/games/"+id).then(complete).catch(failed);

    }

    function addOneGame(game){        
        return $http.post("/api/games/",game).then(complete).catch(failed);
    }

    function replaceOneGame(gameId,game){
        return $http.put("/api/games/"+gameId,game).then(complete).catch(failed);
    }

    function complete(response){
        return response.data;
    }    

    function failed(error){
        return error.status.statusText;
    }
}