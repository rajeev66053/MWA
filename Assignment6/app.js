angular.module("CountryApp",['ngRoute']).config(callback);


function callback($routeProvider){
    $routeProvider.when("/countries",{
        templateUrl:"./templates/countries.html",
        controller:"CountryController",
        controllerAs:"countryCtrl"
    })

}