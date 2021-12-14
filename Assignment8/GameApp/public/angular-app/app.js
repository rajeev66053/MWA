angular.module("meanGames",['ngRoute']).config(config);

function config($routeProvider){
    // $locationProvider.hasPrefix("");
    $routeProvider.when("/",{
        templateUrl:"angular-app/games-list/game-list.html",
        controller:"GamesController",
        controllerAs:"vm"
    }).when("/game/:gameId",{
        templateUrl:"angular-app/game-one/game-one.html",
        controller:"GameController",
        controllerAs:"vm"
    })

}

