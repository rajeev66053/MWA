const mongoose=require("mongoose");
const Brand=mongoose.model("Brand");

module.exports.getAllProducts=function(req,res){
    console.log("Get all prodoucts");
    const brandId=req.params.brandId;
    
    Brand.findById(brandId).select("products").exec(function(err,brand){
        const response={
            status:200,
            message:[]
        }
        if(err){
            console.log("Error in finding brand with brandId "+brandId);
            response.status=500;
            response.message={"Error message":err};
        }
        else if(!brand){
            console.log("Didnot find brand with brandId "+brandId);
            response.status=404;
            response.message={"message":"Brand with brandId "+brandId+" didnot exist."};
        }else{
            response.message=brand.products?brand.products:[];
        }
        res.status(response.status).json(response.message);

    });

}
const _addProduct=function(req,res,brand){
        
    brand.save(function(err,updatedBrand){
        const response={
            status:200,
            message: []
        }
        if(err){
            console.log("Error on saving the new product in DB");
            response.status=500;
            response.message={"message":"Error on saving the new product in DB"};

        }else{
            response.message=updatedBrand;
        }
        res.status(response.status).json(response.message);
    });

}

module.exports.addOneProduct=function(req,res){
    const brandId=req.params.brandId;
    console.log("Adding one prodouct in brand with brandId ",brandId);
    const response={
        status:200,
        message:[]
    }
    
    if (req.body) {
    
        Brand.findById(brandId).select("products").exec(function(err,brand){
        
            if(err){
                console.log("Error in finding brand with brandId "+brandId);
                response.status=500;
                response.message={"Error message":err};
            }
            else if(!brand){
                console.log("Didnot find brand with brandId "+brandId);
                response.status=404;
                response.message={"message":"Brand with brandId "+brandId+" didnot exist."};
            }
            if(response.status!=200){
                res.status(response.status).json(response.message);
            }else{
                const newProduct={};
                newProduct.type=req.body.type;
                let rating = (req.body.rating)?parseFloat(req.body.rating):null;
                if(rating){
                newProduct.rating=rating;
                }
                let minPrice = (req.body.minPrice)?parseFloat(req.body.minPrice):null;
                if(minPrice){
                    newProduct.minPrice=minPrice;
                }
                let maxPrice = (req.body.maxPrice)?parseFloat(req.body.maxPrice):null;
                if(maxPrice){
                    newProduct.maxPrice=maxPrice;
                }
                newProduct.feature=req.body.feature;

                if (isNaN(rating)||isNaN(minPrice)||isNaN(maxPrice)) {
                    response.status = 400;
                    response.message = {"Error message":"QueryString rating, minPrice and maxPrice should be Number"};
                    res.status(response.status).json(response.message);
                }else{ 
                    brand.products.push(newProduct);
                    _addProduct(req,res,brand);
                }
                
            }

        });
    }else{
        response.status=400;
        response.message="You have not submitted anything";
        
        res.status(response.status).json(response.message);
    }

}

module.exports.getOneProduct=function(req,res){
    const brandId=req.params.brandId;
    const productId = req.params.productId;
    console.log("Get one product by productId ",productId);

    Brand.findById(brandId).select("products").exec(function(err,brand){
        const response={
            status:200,
            message:[]
        }
        if(err){
            console.log("Error on finding the brand by brandId ",brandId);
            response.status=500;
            response.message={"Error message":"Error on finding the brand by brandId "+brandId}

        }else if(!brand){
            response.status=404;
            response.message={"message":"There is no brand with brandId "+brandId}
        }else{
            const product=brand.products.id(productId);
            if(product){
                response.message=product;
            }else{
                response.message={"message":"There is no product with productId "+productId};
            }
        }
        res.status(response.status).json(response.message);

    });

}

const _updateProduct=function(req,res,brand,productId){
    const response={
        status:200,
        message:[]
    }
    brand.save(function(err,updatedBrand){
        if(err){
            console.log("Error on updating the product with productId "+productId);
            response.status = 500;
            response.message ={"Error message" : err};
        }else{
            response.message=updatedBrand.products.id(productId);
        }
        res.status(response.status).json(response.message);
    })

}


module.exports.fullUpdateOneProduct=function(req,res){
    const brandId=req.params.brandId;
    const productId = req.params.productId;
    console.log("Updating product with productId ",productId);

    Brand.findById(brandId).select("products").exec(function(err,brand){
        const response={
            status:200,
            message:[]
        }
        if(err){
            console.log("Error on finding the brand by brandId ",brandId);
            response.status=500;
            response.message={"message":"Error on finding the brand by brandId "+brandId}

        }else if(!brand){
            response.status=404;
            response.message={"message":"There is no brand with brandId "+brandId}
        }

        if(response.status!=200){            
            res.status(response.status).json(response.message);
        }else{
            if(req.body){
                const product=brand.products.id(productId);
                if(product){
                    product.type=req.body.type;
                    let rating = (req.body.rating)?parseFloat(req.body.rating):null;
                    if(rating){
                        product.rating=rating;
                    }
                    let minPrice = (req.body.minPrice)?parseFloat(req.body.minPrice):null;
                    if(minPrice){
                        product.minPrice=minPrice;
                    }
                    let maxPrice = (req.body.maxPrice)?parseFloat(req.body.maxPrice):null;
                    if(maxPrice){
                        product.maxPrice=maxPrice;
                    }
                    product.feature=req.body.feature;

                    if (isNaN(rating)||isNaN(minPrice)||isNaN(maxPrice)) {
                        response.status = 400;
                        response.message = {"Error message":"QueryString rating, minPrice and maxPrice should be Number"};
                        res.status(response.status).json(response.message);
                    }else{ 
                        _updateProduct(req,res,brand,productId);
                    }
                }else{
                    response.message={"message":"There is no product with productId "+productId};
                    res.status(response.status).json(response.message);
                }
                
            }else{
                response.status=400;
                response.message="You have not submitted anything";
                
                res.status(response.status).json(response.message);
    
            }
        }        

    });

}

module.exports.partialUpdateOneProduct=function(req,res){
    const brandId=req.params.brandId;
    const productId = req.params.productId;
    console.log("Updating product with productId ",productId);

    Brand.findById(brandId).select("products").exec(function(err,brand){
        const response={
            status:200,
            message:""
        }
        if(err){
            console.log("Error on finding the brand by brandId ",brandId);
            response.status=500;
            response.message={"message":"Error on finding the brand by brandId "+brandId}

        }else if(!brand){
            response.status=404;
            response.message={"message":"There is no brand with brandId "+brandId}
        }

        if(response.status!=200){            
            res.status(response.status).json(response.message);
        }else{
            if(req.body){
                const product=brand.products.id(productId);
                if(product){
                    if(req.body.type){
                        product.type=req.body.type;
    
                    }
                    let rating = (req.body.rating)?parseFloat(req.body.rating):null;
                    if(rating){
                        product.rating=rating;
                    }
                    let minPrice = (req.body.minPrice)?parseFloat(req.body.minPrice):null;
                    if(minPrice){
                        product.minPrice=minPrice;
                    }
                    let maxPrice = (req.body.maxPrice)?parseFloat(req.body.maxPrice):null;
                    if(maxPrice){
                        product.maxPrice=maxPrice;
                    }
                    if(req.body.feature){
                        product.feature=req.body.feature;
                    }

                    if (isNaN(rating)||isNaN(minPrice)||isNaN(maxPrice)) {
                        response.status = 400;
                        response.message = {"Error message":"QueryString rating, minPrice and maxPrice should be Number"};
                        res.status(response.status).json(response.message);
                    }else{                    
                        _updateProduct(req,res,brand,productId);
                    }
                }else{
                    response.message={"message":"There is no product with productId "+productId};
                    res.status(response.status).json(response.message);
                }
                
            }else{
                response.status=400;
                response.message="You have not submitted anything";
                
                res.status(response.status).json(response.message);
    
            }

        }

    });

};

const _deleteProduct=function(req,res,brand,productId){
    const product=brand.products.id(productId);
    const response={
        status:200
    }
    if(product){
        product.remove();
        brand.save(function(err,brand){

            if(err){
                console.log("Error on deleting the product with productId "+productId+" and brand with brandId "+brandId);
                response.status = 500;
                response.message ={"Error message" : err};
            }else{
                response.message= {"message":"Product with id "+productId+"  deleted successfully"};
            }
            res.status(response.status).json(response.message);
        });
    }else{
        response.message={"message":"There is no product with productId "+productId};
        res.status(response.status).json(response.message);
    } 

}

module.exports.deleteOneProduct=function(req,res){
    const brandId=req.params.brandId;
    const productId = req.params.productId;
    console.log("Deleting product with productId ",productId+" and  brandId "+brandId);

    Brand.findById(brandId).select("products").exec(function(err,brand){
        const response={
            status:200,
            message:[]
        }
        if(err){
            console.log("Error on finding the brand by brandId ",brandId);
            response.status=500;
            response.message={"message":"Error on finding the brand by brandId "+brandId}

        }else if(!brand){
            response.status=404;
            response.message={"message":"There is no brand with brandId "+brandId}
        }

        if(response.status!=200){            
            res.status(response.status).json(response.message);
        }else{
            _deleteProduct(req,res,brand,productId);

        }      

    });

}