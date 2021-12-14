const mongoose = require("mongoose");
const Brand = mongoose.model("Brand");

module.exports.getAllOffices = function (req, res) {
    console.log("Getting all offices");

    const brandId=req.params.brandId;

    Brand.findById(brandId).select("offices").exec(function(err,brand){
        const response = {
            status: 200,
            message: []
        }
        if (err) {
            console.log("Error finding the brand");
            response.status = 500;
            response.message = {"Error message" : err};
        } else if(!brand){
            console.log("Brand with brandId "+brandId+ "doesnot exist");
            response.status = 500;
            response.message = {"message" : "Brand with brandId "+brandId+" not found"};
        }else{
            response.message=brand.offices?brand.offices:[];
        }
        res.status(response.status).json(response.message);
    })
};

const _addOffice=function(req,res,brand){
    brand.save(function(err,updatedBrand){
        const response = {
            status: 200,
            message: []
        }
        if(err){
            console.log("Error on adding office in the brand with brandId "+brandId);
            response.status = 500;
            response.message ={"Error message" : err};
        }else{
            response.message=updatedBrand;
        }
        res.status(response.status).json(response.message);

    });

}

module.exports.addOneOffice = function (req, res) {
    console.log("Adding new office in DB");
    const brandId=req.params.brandId;

    const response = {
        status: 200,
        message: []
    }

    if (req.body) {

        Brand.findById(brandId).select("offices").exec(function(err,brand){
            if (err) {
                console.log("Error finding the brand");
                response.status = 500;
                response.message = {"Error message" : err};
            } else if(!brand){
                console.log("Brand with brandId "+brandId+ "doesnot exist");
                response.status = 500;
                response.message = {"message" : "Brand with brandId "+brandId+" not found"};
            }


            if(response.status!=200){
                res.status(response.status).json(response.message);
            }else{ 
                const newOffice = {};
                newOffice.state = req.body.state; 
                newOffice.city = req.body.city;

                let zip = (req.body.zip)?parseInt(req.body.zip):null;

                if(zip){
                    newOffice.zip = parseInt(req.body.zip);
                }

                if (isNaN(zip)) {
                    response.status = 400;
                    response.message = {"Error message":"QueryString zip should be Number"};
                    res.status(response.status).json(response.message);
                }else{                
    
                    brand.offices.push(newOffice);
                    _addOffice(req,res,brand);
                }
            }

        });

    }else{
        response.status=400;
        response.message="You have not submitted anything";
        
        res.status(response.status).json(response.message);
    }


};

module.exports.getOneOffice = function (req, res) {

    const brandId=req.params.brandId;
    const officeId=req.params.officeId;
    console.log("Getting office by officeId ",officeId);
    
    Brand.findById(brandId).select("offices").exec(function(err,brand){

        const response={
            status:200,
            message:[]
        }

        if(err){
            console.log("Error finding brand by brandId "+brandId);
            response.status = 500;
            response.message ={"Error message" : err};
        }else if(!brand){
            console.log("There is no brand with brandId "+brandId);
            response.status=404;
            response.message={"message" : "There is no brand with brandId "+brandId};
        }else{
            const office=brand.offices.id(officeId);

            if(office){
                response.message=office;
            }else{
                response.message={"message":"There is no office with officesId "+officeId};
            }
        }
        res.status(response.status).json(response.message);

    });
};

const _updateOffice=function(req,res,brand,officeId){
    const response={
        status:200,
        message:[]
    }
    brand.save(function(err,updatedBrand){
        if(err){
            console.log("Error on updating the office with officeId "+officeId);
            response.status = 500;
            response.message ={"Error message" : err};
        }else{
            response.message=updatedBrand.offices.id(officeId);
        }
        res.status(response.status).json(response.message);
    })
}

module.exports.fullUpdateOneOffice = function (req, res) {

    const brandId=req.params.brandId;
    const officeId=req.params.officeId; 
    console.log("Full updating office with officeId ",officeId);
    
    Brand.findById(brandId).select("offices").exec(function(err,brand){

        const response={
            status:200,
            message:[]
        }

        if(err){
            console.log("Error finding brand by brandId "+brandId);
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
                const office=brand.offices.id(officeId);            

                if(office){
                    office.state=req.body.state;
                    office.city=req.body.city;

                    let zip = (req.body.zip)?parseInt(req.body.zip):null;

                    if(zip){
                        office.zip = parseInt(req.body.zip);
                    }

                    if (isNaN(zip)) {
                        response.status = 400;
                        response.message = {"Error message":"QueryString zip should be Number"};
                        res.status(response.status).json(response.message);
                    }else{
                        _updateOffice(req,res,brand,officeId);
                    }

                }else{
                    response.message={"message":"There is no office with officeId "+officeId};
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

module.exports.partialUpdateOneOffice = function (req, res) {

    const brandId=req.params.brandId;
    const officeId=req.params.officeId; 
    console.log("Partial updating office with officeId ",officeId);
    
    Brand.findById(brandId).select("offices").exec(function(err,brand){

        const response={
            status:200,
            message:[]
        }

        if(err){
            console.log("Error finding brand by brandId "+brandId);
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
                const office=brand.offices.id(officeId);
    
                if(office){
                    if(req.body.state){
                        office.state=req.body.state;
                    }
                    if(req.body.city){
                        office.city=req.body.city;
                    }
                    let zip = (req.body.zip)?parseInt(req.body.zip):null;
    
                    if(zip){
                        office.zip = parseInt(req.body.zip);
                    }
    
                    if (isNaN(zip)) {
                        response.status = 400;
                        response.message = {"Error message":"QueryString zip should be Number"};
                        res.status(response.status).json(response.message);
                    }else{
                        _updateOffice(req,res,brand,officeId);
                    }
                }else{
                    response.message={"message":"There is no office with officeId "+officeId};
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

const _deleteOffice=function(req,res,brand,officeId){
    const office=brand.offices.id(officeId);
    const response={
        status:200
    }
    if(office){
        office.remove();
        brand.save(function(err,brand){
            
            if(err){
                console.log("Error on deleting the office with officeId "+officeId+" and brand with brandId "+brandId);
                response.status = 500;
                response.message ={"Error message" : err};
            }else{
                response.message= {"message":"Office with id "+officeId+"  deleted successfully"};
            }
            res.status(response.status).json(response.message);
        });
    }else{
        response.message={"message":"There is no office with officeId "+officeId};
        res.status(response.status).json(response.message);
    } 

}

module.exports.deleteOneOffice = function (req, res) {

    const brandId=req.params.brandId;
    const officeId=req.params.officeId; 
    console.log("Deleting office with officeId "+officeId+" and  brandId "+brandId);

    Brand.findById(brandId).select("offices").exec(function(err,brand){

        const response={
            status:200,
            message:[]
        }

        if(err){
            console.log("Error finding brand by brandId "+brandId);
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
            _deleteOffice(req,res,brand,officeId);
        }

    });

};