angular.module("brands",['ngRoute']).config(config);

function config($routeProvider,$locationProvider){
    $locationProvider.hashPrefix("");
    $routeProvider.when("/",{
        templateUrl:"angular-app/brands-list/brand-list.html",
        controller:"BrandsController",
        controllerAs:"brandsCtrl"
    }).when("/brands/:brandId",{
        templateUrl:"angular-app/brand-one/brand-one.html",
        controller:"BrandController",
        controllerAs:"brandCtrl"
    }).when("/brands/:brandId/products/:productId",{
        templateUrl:"angular-app/product-one/product-one.html",
        controller:"ProductController",
        controllerAs:"productCtrl"
    });

}

