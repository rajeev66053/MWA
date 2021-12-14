angular.module("jobSearch").controller("LocationController",LocationController);

function LocationController(JobDataFactory,$routeParams,$route,$location){
    const vm=this;
    const jobId=$routeParams.jobId;
    const locationId=$routeParams.locationId;

    JobDataFactory.getOneLocation(jobId,locationId).then(function(response){
        const location=response.location;
        vm.location=location;
        vm.editedJobState=location.state;
        vm.editedJobCity=location.city;
        vm.editedJobZip=location.zip;

    }).catch(function(error){
        console.log(error);
    });

    vm.updateJobLocation=function(){
        const editedLocation={
            state:vm.editedJobState,
            city:vm.editedJobCity,
            zip:vm.editedJobZip
        }

        JobDataFactory.replaceJobLocation(jobId,locationId,editedLocation).then(function(response){
            console.log(response);
            $location.path("/job/"+jobId);
        })
        .catch(function(error){
            console.log(error);
        });

    }

}