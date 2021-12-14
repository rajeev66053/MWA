const mongoose = require("mongoose");
const Brand = mongoose.model("Brand");

module.exports.getAllBrands = function (req, res) {
    console.log("Getting all brands");

    
    const currentPage=(req.query.currentPage)?parseInt(req.query.currentPage):1;
    const pageSize=(req.query.pageSize)?parseInt(req.query.pageSize):5;
    const search=req.query.search;

    
    const response = {
        status: 200,
        message: ""
    }


    if(isNaN(currentPage) && isNaN(pageSize)){
        response.status=404;
        response.message={"message":"QueryString currentPage and pageSize must be Number."};
        
    }

    if(search){
        const offset=(currentPage-1)*pageSize;
        Brand.find({"name":search}).skip(offset).limit(pageSize).exec(function(err,brands){
                
            if(err){
                response,status=500,
                response.message={"message":"Error in getting brands"};
            }else{
                total=0;
                Brand.countDocuments( {"name":search}, function(err, result){

                    if(err){
                        res.send(err)
                    }
                    else{
                       total=result;
                    }
                    
                response.message={"brands":brands,"total":result};
                    
                res.status(response.status).json(response.message);
            
               })

            }
    
        });

    }else{

        const offset=(currentPage-1)*pageSize;
        
        Brand.find().skip(offset).limit(pageSize).exec(function (err, brands) {
            if(err){
                response,status=500,
                response.message={"message":"Error in getting brands"};
            }else{
                total=0;
                Brand.countDocuments( {}, function(err, result){
                    
                    if(err){
                        res.send(err)
                    }
                    else{
                       total=result;
                    }
                    
                response.message={"brands":brands,"total":result};
                console.log(response.message);
                    
                res.status(response.status).json(response.message);
            
               })

            }
    
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
                console.log(response.message);
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
            response.message={"brand":updatedBrand};
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