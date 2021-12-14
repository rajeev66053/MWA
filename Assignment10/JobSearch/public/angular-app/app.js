angular.module("jobSearch",["ngRoute"]).config(config);

function config($routeProvider,$locationProvider){
    $locationProvider.hashPrefix("");//It will remove ! sign from route after #.Without this http://localhost:5000/#!/ and with this http://localhost:5000/#/
    
    $routeProvider.when("/",{
        templateUrl:"angular-app/jobs-list/jobs-list.html",
        controller:"JobsController",
        controllerAs:"jobsCtrl"
    })
    .when("/job/:jobId",{
        templateUrl:"angular-app/job-one/job-one.html",
        controller:"JobController",
        controllerAs:"jobCtrl"
    })
    .when("/job/:jobId/location/:locationId",{
        templateUrl:"angular-app/location-one/location-one.html",
        controller:"LocationController",
        controllerAs:"locationCtrl"
    });

}