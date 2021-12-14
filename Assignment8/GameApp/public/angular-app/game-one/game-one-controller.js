angular.module("meanGames").controller("GameController",GameController);

function GameController(GameDataFactory,$routeParams){
    const vm=this;
    let gameId=$routeParams.gameId;
    GameDataFactory.getOneGame(gameId).then(function(response){
        vm.game=response;
    })
    
}