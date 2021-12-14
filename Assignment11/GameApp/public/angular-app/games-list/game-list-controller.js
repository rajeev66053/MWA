angular.module("meanGames").controller("GamesController",GamesController);

function GamesController(GameDataFactory,AuthFactory,$route){
    const vm=this;
    vm.title="Mean Games App";

    vm.currentPage = 1; // Current page number. First page is 1.--> 
    vm.pageSize = 5; // Maximum number of items per page.
    vm.totalPages = 0;//Total number of pages
    
    GameDataFactory.getAllGames().then(function(response){
        vm.games = response.games;
        vm.totalGames=response.total;
        vm.totalPages = Math.ceil(vm.totalGames/vm.pageSize);
    }).catch(function(error){
        console.log(error);
    });

    
    vm.pageButtonDisabled = function(dir) {
        if(vm.totalGames){
            if (dir == -1) {
                return vm.currentPage == 1;
            }
            return vm.currentPage >= vm.totalGames/vm.pageSize;
        }
        return vm.currentPage;

    }

    vm.paginate = function(nextPrevMultiplier) {
        vm.currentPage += nextPrevMultiplier;
        GameDataFactory.getAllGames(vm.currentPage,vm.pageSize).then(function(response){
    
            vm.games = response.games;
            vm.totalGames=response.total;
            vm.totalPages = Math.ceil(vm.totalGames/vm.pageSize);
    
        }).catch(function(error){
            console.log(error);
        });
        
    }

    vm.searchGame=function(){
        const gameTitle=vm.gameTitle;
        if(vm.searchForm.$valid){
            GameDataFactory.getAllGames(gameTitle).then(function(response){
                vm.games = response.games;
                vm.totalGames=response.total;
                vm.totalPages = Math.ceil(vm.totalGames/vm.pageSize);
            }).catch(function(error){
                console.log(error);
            });
        }else{
            console.log("Form is not valid");
        }
    }
    
    vm.isLoggedIn=function(){
        return AuthFactory.auth.isLoggedIn;
        // if(AuthFactory.auth.isLoggedIn){
        //     return true;
        // }else{
        //     return false;
        // }
    };

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
                $route.reload();
            }).catch(function(error){
                console.log(error);
            });
        }
        // else{
        //     vm.isSubmitted=true;
        // }
    }
    
    
}

