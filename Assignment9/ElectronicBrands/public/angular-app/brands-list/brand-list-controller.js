angular.module("brands").controller("BrandsController",BrandsController);

function BrandsController(BrandDataFactory){
    const vm=this;
    vm.title="Electronics Brands";
    BrandDataFactory.getAllBrands().then(function(response){
        vm.brands=response;
        
        console.log(response);
    });
    
    vm.addBrand=function(){
        const newBrand={
            name:vm.newBrandName,
            headOffice:vm.newBrandHeadOffice
        };
        if(vm.brandForm.$valid){
            BrandDataFactory.addOneBrand(newBrand).then(function(response){
                console.log("Brand saved");
                return response.data;
            }).catch(function(error){
                console.log(error);
            });
        }else{
            console.log("Form is not valid");
        }
    }
    
}

