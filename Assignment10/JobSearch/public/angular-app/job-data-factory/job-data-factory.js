angular.module("jobSearch").factory("JobDataFactory",JobDataFactory);

function JobDataFactory($http){
    return {
        getAllJobs:getAllJobs,
        addOneJob:addOneJob,
        getOneJob:getOneJob,
        replaceOneJob:replaceOneJob,
        deleteOneJob:deleteOneJob,
        addJobLocation:addJobLocation,
        getOneLocation:getOneLocation,
        replaceJobLocation:replaceJobLocation
    }

    function getAllJobs(){
        return $http.get("/api/jobs").then(complete).catch(failed);
    }

    function getOneJob(jobId){
        return $http.get("/api/jobs/"+jobId).then(complete).catch(failed);
    }

    function getOneLocation(jobId,locationId){
        return $http.get("/api/jobs/"+jobId+"/location/"+locationId).then(complete).catch(failed);
    }

    function addOneJob(newJob){
        return $http.post("/api/jobs",newJob).then(complete).catch(failed);
    }

    function addJobLocation(jobId,newJobLocation){
        return $http.post("/api/jobs/"+jobId+"/location",newJobLocation).then(complete).catch(failed);
    }

    function replaceOneJob(jobId,job){
        return $http.put("/api/jobs/"+jobId,job).then(complete).catch(failed);
    }

    function replaceJobLocation(jobId,locationId,location){
        return $http.put("/api/jobs/"+jobId+"/location/"+locationId,location).then(complete).catch(failed);
    }

    function deleteOneJob(jobId){
        return $http.delete("/api/jobs/"+jobId).then(complete).catch(failed);
    }

    function complete(response){
        return response.data;
    }

    function failed(error){
        return error.status.statusText;
    }

}