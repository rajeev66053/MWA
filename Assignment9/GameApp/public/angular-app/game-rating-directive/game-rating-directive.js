angular.module("meanGames").directive("gameRating",GameRating);

function GameRating(){
    return {
        restrict:"E", //E for Element or A for Attribute
        templateUrl:"angular-app/game-rating-directive/rating.html",
        bindToController:true,
        controller:"GameController",
        controllerAs:"vm",
        scope:{
            stars:"@"//"="->access by value, "@" =>access array and object,"&"=>acccess function
        }
    }
}