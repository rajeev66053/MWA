angular.module("brands").factory("BrandDataFactory",BrandDataFactory);

function BrandDataFactory($http){
    return {
        addOneBrand:addOneBrand,
        getAllBrands:getAllBrands,
        getOneBrand:getOneBrand,
        deleteOneBrand:deleteOneBrand,
        addOneOffice:addOneOffice,
        addOneProduct:addOneProduct,
        getOneProduct:getOneProduct
    }

    function addOneBrand(brand){
        return $http.post("/api/brands/",brand).then(complete).catch(failed);

    }

    function getAllBrands(){
        return $http.get("/api/brands").then(complete).catch(failed);
    }

    function getOneBrand(id){
        return $http.get("/api/brands/"+id).then(complete).catch(failed);

    }

    function deleteOneBrand(id){
        return $http.delete("/api/brands/"+id).then(complete).catch(failed);

    }

    function addOneOffice(brandId,office){
        return $http.post("/api/brands/"+brandId+"/offices/",office).then(complete).catch(failed);

    }

    function addOneProduct(brandId,product){
        return $http.post("/api/brands/"+brandId+"/products",product).then(complete).catch(failed);

    }
    function getOneProduct(brandId,productId){
        return $http.get("/api/brands/"+brandId+"/products/"+productId).then(complete).catch(failed);

    }

    function complete(response){
        return response.data;
    }    

    function failed(error){
        return error.status.statusText;
    }
}