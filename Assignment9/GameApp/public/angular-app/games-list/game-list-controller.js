angular.module("meanGames").controller("GamesController",GamesController);

function GamesController(GameDataFactory){
    const vm=this;
    vm.title="Mean Games App";
    // vm.isSubmitted=false;
    GameDataFactory.getAllGames().then(function(response){
        vm.games=response;
    });

    vm.addGame=function(){
        const newGame={
            title:vm.newGameTitle,
            price:vm.newGamePrice,
            rate:vm.newGameRating,
            year:vm.newGameYear,
            minPlayers:vm.newGameMinPlayers,
            maxPlayers:vm.newGameMaxPlayers,
            minAge:vm.newGameMinAge,
            designers:vm.newGameDesigner
        };
        if(vm.gameForm.$valid){
            console.log(newGame);
            GameDataFactory.addOneGame(newGame).then(function(response){
                console.log("Game saved");
                return response.data;
            }).catch(function(error){
                console.log(error);
            });
        }
        // else{
        //     vm.isSubmitted=true;
        // }
    }
    
    
}

