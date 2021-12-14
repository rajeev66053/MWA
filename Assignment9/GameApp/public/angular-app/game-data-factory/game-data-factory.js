angular.module("meanGames").factory("GameDataFactory",GameDataFactory);

function GameDataFactory($http){
    return {
        getAllGames:getAllGames,
        getOneGame:getOneGame,
        addOneGame:addOneGame,
        deleteOneGame:deleteOneGame,
        replaceOneGame:replaceOneGame
    }

    function getAllGames(){
        return $http.get("/api/games").then(complete).catch(failed);
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

    function deleteOneGame(id){
        return $http.delete("/api/games/"+id).then(complete).catch(failed);

    }

    function complete(response){
        return response.data;
    }    

    function failed(error){
        return error.status.statusText;
    }
}