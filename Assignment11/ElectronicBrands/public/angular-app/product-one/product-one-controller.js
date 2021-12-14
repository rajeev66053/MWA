angular.module("brands").controller("ProductController",ProductController);

function ProductController(BrandDataFactory,$routeParams){
    const vm=this;
    const brandId=$routeParams.brandId;
    const productId=$routeParams.productId;
    BrandDataFactory.getOneProduct(brandId,productId).then(function(response){
        vm.product=response;
    })
    
}