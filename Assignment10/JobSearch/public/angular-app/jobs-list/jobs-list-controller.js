angular.module("jobSearch").controller("JobsController",JobsController);

function JobsController(JobDataFactory,$route){
    const vm=this;
    vm.title="Jobs Lists";

    JobDataFactory.getAllJobs().then(function(response){
        vm.jobs=response.jobs;
    }).catch(function(error){
        console.log(error);
    });

    vm.addJob=function(){
        
        const newJob={
            title:vm.newJobTitle,
            salary:vm.newJobSalary,
            description:vm.newJobDescription,
            experience:vm.newJobExperience,
            skills:vm.newJobSkills.split(',')
        };

        if(vm.jobForm.$valid){
            JobDataFactory.addOneJob(newJob).then(function(response){
                vm.job=response.job;
                console.log("Job Saved");
                $route.reload();
                
            }).catch(function(error){
                console.log(error);
            });
        }else{
            console.log("Form is not valid");
        }
    }

}