angular.module("CountryApp").controller("CountryController",CountryController);

    function CountryController($http){
        let vm=this;

        $http.get("https://restcountries.eu/rest/v2/region/asia?fields=name;capital;currencies").then(function(response){
            vm.countries=response.data;
        });
    }