angular.module("brands").directive("brandsNavigation",BrandsNavigation);

function BrandsNavigation(){
    return {
        restrict:"E",
        templateUrl:"angular-app/navigation-directive/navigation-directive.html"
    }
}