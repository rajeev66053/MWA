angular.module("brands").controller("BrandController",BrandController);

function BrandController(BrandDataFactory,$routeParams,$http){
    const vm=this;
    let brandId=$routeParams.brandId;
    
    BrandDataFactory.getOneBrand(brandId).then(function(response){
        vm.brand=response;
        console.log(response);
    });

    vm.deleteOneBrand=function(brandId){
        BrandDataFactory.deleteOneBrand(brandId).then(function(response){
            console.log(response);
        });
    }

    vm.addOffice=function(){
        const newOffice={
            state:vm.newOfficeState,
            city:vm.newOfficeCity,
            zip:vm.newOfficeZip
        };
        if(vm.officeForm.$valid){
            BrandDataFactory.addOneOffice(brandId,newOffice).then(function(response){
                console.log("Office saved");
                return response.data;
            }).catch(function(error){
                console.log(error);
            });
        }else{
            console.log("Form is not valid");
        }
    }

    vm.addProduct=function(){
        const newProduct={
            type:vm.newProductType,
            rating:vm.newProductRating,
            minPrice:vm.newProductMinPrice,
            maxPrice:vm.newProductMaxPrice,
            feature:vm.newProductFeature
        };
        if(vm.productForm.$valid){
            BrandDataFactory.addOneProduct(brandId,newProduct).then(function(response){
                console.log("Product saved");
                return response.data;
            }).catch(function(error){
                console.log(error);
            });
        }else{
            console.log("Form is not valid");
        }
    }
    
}