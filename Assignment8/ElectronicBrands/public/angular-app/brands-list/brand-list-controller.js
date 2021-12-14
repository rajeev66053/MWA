angular.module("brands").controller("BrandsController",BrandsController);

function BrandsController(BrandDataFactory){
    const vm=this;
    vm.title="Electronics Brands";
    BrandDataFactory.getAllBrands().then(function(response){
        vm.brands=response;
    });    
    
}

