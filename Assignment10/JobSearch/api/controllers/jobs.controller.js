const mongoose=require("mongoose");
const Job=mongoose.model("Job");


module.exports.getAllJobs=function(req,res){
    console.log("Get all Jobs");

    Job.find().exec(function(err,jobs){
        const response={
            status:200,
            message:""
        }

        if(err){
            response,status=500,
            response.message={"message":"Error in getting jobs"};
        }else if(!jobs){
            response.status=404,
            response.message={"message":"Jobs not found."};
        }else{
            response.message={"jobs":jobs};
        }

        res.status(response.status).json(response.message);

    });

}

module.exports.addOneJob=function(req,res){
    console.log("Add one Job");
    const response={
        status:201,
        message:""
    }

    if(req.body){
        const newJob={};

        newJob.title=req.body.title;
        const salary=(req.body.salary)?parseFloat(req.body.salary):null;
        if(salary){
            newJob.salary=salary;
        }
        newJob.description=req.body.description;
        newJob.experience=req.body.experience;
        newJob.skills=req.body.skills;

        

        if(salary && isNaN(salary)){
            response.status=401;
            response.message={"message":"Salary should be a number"};
            res.status(response.status).json(response.message);

        }else{
            Job.create(newJob,function(err,job){
              
                if(err){
                    response.status=500;
                    response.message={"message":err};
                }else{
                    response.message={"job":job};
                }
                res.status(response.status).json(response.message);
            });

        }

    }else{
        response.status=401;
        response.message={"message":"Request body is empty"};

        res.status(response.status).json(response.message);
    }
    
}

module.exports.getOneJob=function(req,res){
    console.log("Get One Job");
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
        }else{
            response.message={"job":job}
        }
        res.status(response.status).json(response.message);

    });

}
_updateJob=function(res,job){
    
    job.save(function(err,updatedJob){
        const response={
            status:200,
            message:""
        }
        if(err){
            response.status=500;
            response.message={"message":"Error on updating job"};
        }else {
            response.status=200;
            response.message={"updated Job":updatedJob};
        }
        res.status(response.status).json(response.message);
    });

}

module.exports.fullUpdateOneJob=function(req,res){
    console.log("Full update One Job");
    const jobId=req.params.jobId;

    Job.findById(jobId).exec(function(err,job){
        const response={
            status:200,
            message:""
        }
        if(err){
            response.status=500;
            response.message={"message":"Error on getting job"};
        }else if(!job){
            response.status=404;
            response.message={"message":"Job not found"};
        }

        if(response.status!=200){
            res.status(response.status).json(response.message);
        }else{

            job.title=req.body.title;
            const salary=(req.body.salary)?parseFloat(req.body.salary):null;
            if(salary){                
                job.salary=salary;
            }
            job.description=req.body.description;
            job.experience=req.body.experience;
            job.skills=req.body.skills;

            
            if(salary && isNaN(salary)){
                response.status=401;
                response.message={"message":"Salary should be a number"};
                res.status(response.status).json(response.message);
    
            }else{                
                _updateJob(res,job);
            }

        }        

    });

}

module.exports.partialUpdateOneJob=function(req,res){
    console.log("Partial update One Job");
    const jobId=req.params.jobId;

    Job.findById(jobId).exec(function(err,job){
        const response={
            status:200,
            message:""
        }
        if(err){
            response.status=500;
            response.message={"message":"Error on getting job"};
        }else if(!job){
            response.status=404;
            response.message={"message":"Job not found"};
        }

        if(response.status!=200){
            res.status(response.status).json(response.message);
        }else{
            if(req.body.title){
                job.title=req.body.title;
            }
            const salary=(req.body.salary)?parseFloat(req.body.salary):null;
            if(salary){                
                job.salary=salary;
            }
            if(req.body.description){
                job.description=req.body.description;
            }
            if(req.body.experience){
                job.experience=req.body.experience;
            }
            if(req.body.skills){
                job.skills=req.body.skills;
            }
            
            
            if(salary && isNaN(salary)){
                response.status=401;
                response.message={"message":"Salary should be a number"};
                res.status(response.status).json(response.message);
    
            }else{                
                _updateJob(res,job);
            }

        }        

    });

}


module.exports.deleteOneJob=function(req,res){
    console.log("Delete One Job");
    const jobId=req.params.jobId;

    Job.findByIdAndDelete(jobId).exec(function(err,deletedJob){
        const response={
            status:200,
            message:{"message" :"The job with jobId "+jobId+" deleted successfully"}
        }
        if(err){
            response.status=500;
            response.message={"message":"Error on deleting job"};
        }else if(!deletedJob){
            response.status=404;
            response.message={"message":"JThere is no job with jobId "+jobId};
        }
        res.status(response.status).json(response.message);
    });

}


