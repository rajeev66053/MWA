angular.module("brands",['ngRoute','angular-jwt']).config(config).run(run);

function config($httpProvider,$routeProvider,$locationProvider){
    $httpProvider.interceptors.push("AuthInterceptor");
    $locationProvider.hashPrefix("");
    $routeProvider.when("/",{
        templateUrl:"angular-app/welcome/welcome.html",
        access:{restricted:false}
    }).when("/brands",{
        templateUrl:"angular-app/brands-list/brand-list.html",
        controller:"BrandsController",
        controllerAs:"brandsCtrl",
        access:{restricted:false}
    }).when("/register",{
        templateUrl:"angular-app/register/register.html",
        controller:"RegisterController",
        controllerAs:"registerCtrl",
        access:{restricted:false}
    }).when("/brands/:brandId",{
        templateUrl:"angular-app/brand-one/brand-one.html",
        controller:"BrandController",
        controllerAs:"brandCtrl",
        access:{restricted:false}
    }).when("/brands/:brandId/products/:productId",{
        templateUrl:"angular-app/product-one/product-one.html",
        controller:"ProductController",
        controllerAs:"productCtrl",
        access:{restricted:false}
    }).when("/profile",{
        templateUrl:"angular-app/profile/profile.html",
        access:{restricted:true}
    }).otherwise({
        redirectTo:"/"
    });

}


function run($rootScope,$location,$window,AuthFactory){
    $rootScope.$on("$routeChangeStart",function(event,nextRoute,currentRoute){
        //This is to enable overcomming restricted URLs
        if(nextRoute.access!==undefined && nextRoute.access.restricted 
            && !$window.sessionStorage.token && !AuthFactory.auth.isLoggedIn){
            event.preventDefault();
            $location.path("/");


        }
    });

}

