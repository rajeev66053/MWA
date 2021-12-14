angular.module("jobSearch").controller("JobController",JobController);

function JobController(JobDataFactory,$routeParams,$route,$location){
    const vm=this;
    const jobId=$routeParams.jobId;
    JobDataFactory.getOneJob(jobId).then(function(response){
        const job=response.job;
        vm.job=job;
        vm.editedJobSalary=job.salary;
        vm.editedJobExperience=job.experience;
        vm.editedJobSkills=job.skills.toString();
        vm.editedJobDescription=job.description;
    }).catch(function(error){
        console.log(error);
    });

    vm.addJobLocation=function(){
        
        const newJobLocation={
            state:vm.newJobState,
            city:vm.newJobCity,
            zip:vm.newJobZip
        };

        if(vm.jobLocationForm.$valid){
            JobDataFactory.addJobLocation(jobId,newJobLocation).then(function(response){
                console.log(response);
                console.log("Location Saved");
                $route.reload();
                
            }).catch(function(error){
                console.log(error);
            });
        }else{
            console.log("Form is not valid");
        }
    }

    vm.updateJob=function(){
        const editedJob={
            title:vm.job.title,
            salary:vm.editedJobSalary,
            description:vm.editedJobDescription,
            experience:vm.editedJobExperience,
            skills:vm.editedJobSkills.split(',')
        }

        JobDataFactory.replaceOneJob(jobId,editedJob).then(function(job){
            console.log(job);
            $route.reload();
        })
        .catch(function(error){
            console.log(error);
        });

    }

    vm.deleteJob=function(jobId){
        JobDataFactory.deleteOneJob(jobId).then(function(response){
            console.log(response);
            $location.path('/')
        }).catch(function(error){
            console.log(error);
        });
    }

}