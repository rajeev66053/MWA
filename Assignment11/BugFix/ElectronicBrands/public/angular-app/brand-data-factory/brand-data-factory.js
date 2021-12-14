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

    function getAllGames(query1,query2,query3){
        if(query1 && query2 && query3){
            return $http.get("/api/games?search="+query1+"&&currentPage="+query2+"&&pageSize="+query3).then(complete).catch(failed);
        }else if(query1 && query2){
            return $http.get("/api/games?currentPage="+query1+"&&pageSize="+query2).then(complete).catch(failed); 
        }else if(query1){
            return $http.get("/api/games?search="+query1).then(complete).catch(failed); 
        }else{
            return $http.get("/api/games").then(complete).catch(failed); 
        }      
    }

    function getAllBrands(query1,query2,query3){
        if(query1 && query2 && query3){
            return $http.get("/api/brands?search="+query1+"&&currentPage="+query2+"&&pageSize="+query3).then(complete).catch(failed);
        }else if(query1 && query2){
            return $http.get("/api/brands?currentPage="+query1+"&&pageSize="+query2).then(complete).catch(failed); 
        }else if(query1){
            return $http.get("/api/brands?search="+query1).then(complete).catch(failed); 
        }else{
            return $http.get("/api/brands").then(complete).catch(failed); 
        } 
        
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