const express=require("express");
const router=express.Router();
const jobsController=require("../controllers/jobs.controller.js");
const locationController=require("../controllers/location.controller.js");


router.route("/jobs")
.get(jobsController.getAllJobs)
.post(jobsController.addOneJob);

router.route("/jobs/:jobId")
.get(jobsController.getOneJob)
.put(jobsController.fullUpdateOneJob)
.patch(jobsController.partialUpdateOneJob)
.delete(jobsController.deleteOneJob);

router.route("/jobs/:jobId/location")
.get(locationController.getOneLocation)
.post(locationController.addOneLocation);


router.route("/jobs/:jobId/location/:locationId")
.get(locationController.getOneLocation)
.put(locationController.fullUpdateOneLocation)
.patch(locationController.partialUpdateOneLocation)
.delete(locationController.deleteOneLocation);

module.exports={
    router:router
}