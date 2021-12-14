angular.module("brands").controller("BrandController",BrandController);

function BrandController(BrandDataFactory,$routeParams){
    const vm=this;
    let brandId=$routeParams.brandId;
    BrandDataFactory.getOneBrand(brandId).then(function(response){
        vm.brand=response;
    })
    
}