angular.module("brands").controller("BrandsController",BrandsController);

function BrandsController(BrandDataFactory,AuthFactory,$route){
    const vm=this;
    vm.title="Electronics Brands";
    
    vm.currentPage = 1; // Current page number. First page is 1.--> 
    vm.pageSize = 5; // Maximum number of items per page.
    vm.totalPages = 0;//Total number of pages

    BrandDataFactory.getAllBrands(vm.currentPage,vm.pageSize).then(function(response){
        vm.brands=response.brands;
        vm.totalBrands=response.total;
        vm.totalPages = Math.ceil(vm.totalBrands/vm.pageSize);
    });

    vm.pageButtonDisabled = function(dir) {
        if(vm.totalBrands){
            if (dir == -1) {
                return vm.currentPage == 1;
            }
            return vm.currentPage >= vm.totalBrands/vm.pageSize;
        }
        return vm.currentPage;

    }

    vm.paginate = function(nextPrevMultiplier) {
        vm.currentPage += nextPrevMultiplier;
        // vm.games = vm.totalGames.slice((vm.currentPage-1)*vm.pageSize);
        BrandDataFactory.getAllBrands(vm.currentPage,vm.pageSize).then(function(response){
    
            vm.brands=response.brands;
            vm.totalBrands=response.total;
            vm.totalPages = Math.ceil(vm.totalBrands/vm.pageSize);
    
        }).catch(function(error){
                console.log(error);
            });
        
    }

    vm.searchBrand=function(){
        const brandName=vm.brandName;
        if(vm.searchForm.$valid){
            BrandDataFactory.getAllBrands(brandName).then(function(response){
                vm.brands=response.brands;
                vm.totalBrands=response.total;
                vm.totalPages = Math.ceil(vm.totalBrands/vm.pageSize);
            }).catch(function(error){
                console.log(error);
            });
        }else{
            console.log("Form is not valid");
        }
    }

    vm.isLoggedIn=function(){
        return AuthFactory.auth.isLoggedIn;
        // if(AuthFactory.auth.isLoggedIn){
        //     return true;
        // }else{
        //     return false;
        // }
    };

    vm.addBrand=function(){
        const newBrand={
            name:vm.newBrandName,
            headOffice:vm.newBrandHeadOffice
        };
        if(vm.brandForm.$valid){
            BrandDataFactory.addOneBrand(newBrand).then(function(response){
                console.log("Brand saved");
                $route.reload();
            }).catch(function(error){
                console.log(error);
            });
        }else{
            console.log("Form is not valid");
        }
    }
    
}

