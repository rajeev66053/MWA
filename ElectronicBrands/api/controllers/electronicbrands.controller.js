const mongoose = require("mongoose");
const Brand = mongoose.model("Brand");

module.exports.getAllBrands = function (req, res) {
    console.log("Getting all brands");

    const response = {
        status: 200,
        message: ""
    }

    const offset = 0;
    const count = 5;

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }

    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
    }

    //Type check
    if (isNaN(offset) || isNaN(count)) {
        response.status = 400;
        response.message = "QueryString offset and count should be Numbers";
        res.status(response.status).json(response.message);
    }else{
        Brand.find().skip(offset).limit(count).exec(function (err, brands) {
            //Error check
            if (err) {
                console.log("Error finding the brands");
                response.status = 500;
                response.message = {"Error message" : err};
            } else {
                response.message = brands;
            }
            res.status(response.status).json(response.message);
    
        });
    }
    
};

module.exports.addOneBrand = function (req, res) {
    console.log("Adding new brand in DB");

    const response = {
        status: 200,
        message: ""
    }

    if (req.body) {

        const founded=(req.body.founded)?parseInt(req.body.founded):null;
        
        const newBrand = {};
        newBrand.name = req.body.name;
        if(founded){
            newBrand.founded = founded;
        }
        newBrand.headOffice = req.body.headOffice;

        //Type check
        if (isNaN(founded)) {
            response.status = 400;
            response.message = {"Error message":"QueryString founded should be Number"};
            res.status(response.status).json(response.message);
        }else{
            Brand.create(newBrand, function (err, brand) {
                //Error check
                if (err) {
                    console.log("Error creating the brand");
                    response.status = 500;
                    response.message ={"Error message" : err};
                } else {
                    response.message = brand;
                }
                res.status(response.status).json(response.message);
    
            });

        }
        
    }else{
        response.status=400;
        response.message="You have not submitted anything";
        
        res.status(response.status).json(response.message);
    }


};

module.exports.getOneBrand = function (req, res) {

    const brandId=req.params.brandId;    
    console.log("Getting brand by brandId ",brandId);
    
    Brand.findById(brandId).exec(function(err,brand){

        const response={
            status:200,
            message:""
        }

        if(err){
            console.log("Error fetching brand by brandId "+brandId);
            response.status = 500;
            response.message ={"Error message" : err};
        }else if(!brand){
            console.log("There is no brand with brandId "+brandId);
            response.status=404;
            response.message={"message" : "There is no brand with brandId "+brandId};
        }else{
            response.message=brand;
        }
        res.status(response.status).json(response.message);

    });
};

const _updateBrand=function(req,res,brand){    
    brand.save(function(err,updatedBrand){
        const response={
            status:200,
            message:""
        }
        if(err){
            console.log("Error on updating the brand");
            response.status = 500;
            response.message ={"Error message" : err};
        }else{
            response.message=updatedBrand;
        }
        res.status(response.status).json(response.message);
    })
}

module.exports.fullUpdateOneBrand = function (req, res) {

    const brandId=req.params.brandId;    
    console.log("Full updating brand with brandId ",brandId);
    
    Brand.findById(brandId).exec(function(err,brand){

        const response={
            status:200,
            message:""
        }

        if(err){
            console.log("Error fetching brand by brandId "+brandId);
            response.status = 500;
            response.message ={"Error message" : err};
        }else if(!brand){
            console.log("There is no brand with brandId "+brandId);
            response.status=404;
            response.message={"message" : "There is no brand with brandId "+brandId};
        }
        
        if(response.status!=200){            
            res.status(response.status).json(response.message);
        }else{
            if(req.body){
                brand.name=req.body.name;
    
                const founded=(req.body.founded)?parseInt(req.body.founded):null;
    
                if(founded){
                    brand.founded=founded;
                }
                
                brand.headOffice=req.body.headOffice;
                //Type check
                if (isNaN(founded)) {
                    response.status = 400;
                    response.message = {"Error message":"QueryString founded should be Number"};
                    res.status(response.status).json(response.message);
                }else{
                    _updateBrand(req,res,brand);
                }        
    
            }else{
                response.status=400;
                response.message="You have not submitted anything";
                
                res.status(response.status).json(response.message);
            }
            
        }

    });
};

module.exports.partialUpdateOneBrand = function (req, res) {

    const brandId=req.params.brandId;    
    console.log("Partial updating brand with brandId ",brandId);
    
    Brand.findById(brandId).exec(function(err,brand){

        const response={
            status:200,
            message:""
        }

        if(err){
            console.log("Error fetching brand by brandId "+brandId);
            response.status = 500;
            response.message ={"Error message" : err};
        }else if(!brand){
            console.log("There is no brand with brandId "+brandId);
            response.status=404;
            response.message={"message" : "There is no brand with brandId "+brandId};
        }
        
        if(response.status!=200){            
            res.status(response.status).json(response.message);
        }else{
            if(req.body){
                if(req.body.name){
                    brand.name=req.body.name;
                }
    
                const founded=(req.body.founded)?parseInt(req.body.founded):null;
                
                if(founded){
                    brand.founded=founded;
                }
    
                if(req.body.headOffice){
                    brand.headOffice=req.body.headOffice;
                }
    
                //Type check
                if (isNaN(founded)) {
                    response.status = 400;
                    response.message = {"Error message":"QueryString founded should be Number"};
                    res.status(response.status).json(response.message);
                }else{
                    _updateBrand(req,res,brand);
                }
                
    
            }else{
                response.status=400;
                response.message="You have not submitted anything";
                
                res.status(response.status).json(response.message);
            }

        }

    });
};

module.exports.deleteOneBrand = function (req, res) {

    const brandId=req.params.brandId;    
    console.log("Deleting brand with brandId ",brandId);
    
    Brand.findByIdAndDelete(brandId).exec(function(err,deletedBrand){

        const response={
            status:200,
            message:{"message" :"The brand with brandId "+brandId+" successfully deleted"}
        }

        if(err){
            console.log("Error deleting brand with brandId "+brandId);
            response.status = 500;
            response.message ={"Error message" : err};
        }else if(!deletedBrand){
            console.log("There is no brand with brandId "+brandId);
            response.status=404;
            response.message={"message" : "There is no brand with brandId "+brandId};
        }
                 
        res.status(response.status).json(response.message);

    });
};