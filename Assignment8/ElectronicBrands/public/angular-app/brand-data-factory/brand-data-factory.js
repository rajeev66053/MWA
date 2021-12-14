angular.module("brands").factory("BrandDataFactory",BrandDataFactory);

function BrandDataFactory($http){
    return {
        getAllBrands:getAllBrands,
        getOneBrand:getOneBrand
    }

    function getAllBrands(){
        return $http.get("/api/brands").then(complete).catch(failed);
    }

    function getOneBrand(id){
        return $http.get("/api/brands/"+id).then(complete).catch(failed);

    }

    function complete(response){
        return response.data;
    }    

    function failed(error){
        return error.status.statusText;
    }
}