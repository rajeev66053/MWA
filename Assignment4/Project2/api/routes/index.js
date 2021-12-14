const express=require("express");
const router=express.Router();
const controllerStudents=require("../controllers/students.controller");
const controllerAddresses=require("../controllers/addresses.controller");

router.route("/students")
.get(controllerStudents.studentsGetAll);

router.route("/students/:studentId").get(controllerStudents.studentsGetOne);

router.route("/students/:studentId/addresses").get(controllerAddresses.addressesGetAll);

router.route("/students/:studentId/addresses/:addressId").get(controllerAddresses.addressesGetOne);

module.exports =router;