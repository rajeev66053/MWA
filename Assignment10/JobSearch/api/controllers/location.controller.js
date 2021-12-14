const mongoose=require("mongoose");
const Job=mongoose.model("Job");

module.exports.getOneLocation=function(req,res){
    console.log("Get One location");
    const jobId=req.params.jobId;

    Job.findById(jobId).exec(function(err,job){
        const response={
            status:200,
            message:""
        }
        if(err){
            response.status=500;
            response.message={"message":"Error on getting one job"};
        }else if(!job){
            response.status=404;
            response.message={"message":"Job not found"};
        }

        if(response.status!=200){
            res.status(response.status).json(response.message);
        }else{
            const location=job.location;
            res.status(response.status).json({"location":location});
        }
    });

}

_addLocation =function(res,job){
    job.save(function(err,updatedJob){
        const response={
            status:201,
            message:""
        }

        if(err){
            response.status=500;
            response.message={"message":"Error on adding job"};
        }else {
            response.status=200;
            response.message={"updated Job":updatedJob};
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.addOneLocation=function(req,res){
    console.log("Add one Location");
    const jobId=req.params.jobId;
    console.log(jobId);
    const response={
        status:201,
        message:""
    }    

    if(req.body){
        const newLocation={};

        newLocation.state=req.body.state;
        newLocation.city=req.body.city;
        const zip=(req.body.zip)?parseInt(req.body.zip):null;
        if(zip){
            newLocation.zip=req.body.zip;
        }

        
        
        if(zip && isNaN(zip)){
            response.status=401;
            response.message={"message":"Zip should be a number"};
            res.status(response.status).json(response.message);

        }else{
            
            Job.findById(jobId).exec(function(err,job){
              
                if(err){
                    response.status=500;
                    response.message={"message":err};
                }else if(!job){
                    response.status=404
                    response.message={"mesage":"Job with jobId "+jobId+" not found"};
                }

                                
                if(response.status!=201){
                    res.status(response.status).json(response.message);
                }
                else{
                    
                    job.location=newLocation;
                    _addLocation(res,job);                    
                }
            });
        }

    }else{
        response.status=401;
        response.message={"message":"Request body is empty"};

        res.status(response.status).json(response.message);
    }    
}


_updateLocation =function(res,job,jobId){
    job.save(function(err,updatedJob){
        const response={
            status:201,
            message:""
        }

        if(err){
            response.status=500;
            response.message={"message":"Error on updating job with jobid "+jobId};
        }else {
            response.status=200;
            response.message={"updated Job":updatedJob};
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.fullUpdateOneLocation=function(req,res){
    console.log("Full update One location");
    const jobId=req.params.jobId;
    const locationId=req.params.locationId;

    
    if(req.body){        
        
        Job.findById(jobId).exec(function(err,job){
            const response={
                status:200,
                message:""
            }
            if(err){
                response.status=500;
                response.message={"message":"Error on getting one job"};
            }else if(!job){
                response.status=404;
                response.message={"message":"Job not found"};
            }

            if(response.status!=200){
                res.status(response.status).json(response.message);
            }else{

                const location=job.location;

                location.state=req.body.state;
                location.city=req.body.city;
                const zip=(req.body.zip)?parseInt(req.body.zip):null;
                if(zip){
                    location.zip=req.body.zip;
                }

                if(zip && isNaN(zip)){
                    response.status=401;
                    response.message={"message":"Zip should be a number"};
                    res.status(response.status).json(response.message);

                }else{
                    _updateLocation(res,job,jobId);

                }
                
            }
        });
    }else{
        response.status=401;
        response.message={"message":"Request body is empty"};

        res.status(response.status).json(response.message);
    }  

}

module.exports.partialUpdateOneLocation=function(req,res){
    console.log("Partial update One location");
    const jobId=req.params.jobId;
    const locationId=req.params.locationId;

    
    if(req.body){        
        
        Job.findById(jobId).exec(function(err,job){
            const response={
                status:200,
                message:""
            }
            if(err){
                response.status=500;
                response.message={"message":"Error on getting one job"};
            }else if(!job){
                response.status=404;
                response.message={"message":"Job not found"};
            }

            if(response.status!=200){
                res.status(response.status).json(response.message);
            }else{

                const location=job.location;
                if(req.body.state){
                    location.state=req.body.state;
                }
                if(req.body.city){
                    location.city=req.body.city;
                }
                const zip=(req.body.zip)?parseInt(req.body.zip):null;
                if(zip){
                    location.zip=req.body.zip;
                }

                if(zip && isNaN(zip)){
                    response.status=401;
                    response.message={"message":"Zip should be a number"};
                    res.status(response.status).json(response.message);

                }else{
                    _updateLocation(res,job,jobId);

                }
                
            }
        });
    }else{
        response.status=401;
        response.message={"message":"Request body is empty"};

        res.status(response.status).json(response.message);
    }  

}

_deleteLocation=function(res,job,locationId){
    const location=job.location;
    const response={
        status:200,
        message:""
    }
    if(location){
        location.remove();
        job.save(function(err,deletedJob){
            if(err){
                response.status=500;
                response.message={"message":"Error on deleting location with locationId "+locationId};
            }else {
                response.status=200;
                response.message={"message":"Location with locationId "+locationId+" deleted successfully."};
            }
            res.status(response.status).json(response.message);
        });    

    }else{
        response.status=404;
        response.message={"message":"There is no location with locationId "+locationId};
        res.status(response.status).json(response.message);
    }
}

module.exports.deleteOneLocation=function(req,res){
    console.log("Delete One location");
    const jobId=req.params.jobId;
    const locationId=req.params.locationId;

    Job.findById(jobId).exec(function(err,job){
        const response={
            status:200,
            message:""
        }
        if(err){
            response.status=500;
            response.message={"message":"Error on getting one job"};
        }else if(!job){
            response.status=404;
            response.message={"message":"Job not found"};
        }

        if(response.status!=200){
            res.status(response.status).json(response.message);
        }else{
             _deleteLocation(res,job,locationId);
        }
    });

}