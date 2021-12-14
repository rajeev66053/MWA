angular.module("brands",['ngRoute']).config(config);

function config($routeProvider,$locationProvider){
    $locationProvider.hashPrefix("");
    $routeProvider.when("/",{
        templateUrl:"angular-app/brands-list/brand-list.html",
        controller:"BrandsController",
        controllerAs:"brandsCtrl"
    }).when("/brand/:brandId",{
        templateUrl:"angular-app/brand-one/brand-one.html",
        controller:"BrandController",
        controllerAs:"brandCtrl"
    })

}

