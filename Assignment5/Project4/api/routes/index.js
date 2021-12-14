const express=require("express");
const router=express.Router();
const controllerStudents=require("../controllers/students.controller");
const controllerAddresses=require("../controllers/addresses.controller");

router.route("/students")
.get(controllerStudents.studentsGetAll)
.post(controllerStudents.studentsAddOne);

router.route("/students/:studentId")
.get(controllerStudents.studentsGetOne)
.put(controllerStudents.studentsFullUpdateOne)
.patch(controllerStudents.studentsPartialUpdateOne)
.delete(controllerStudents.studentsDeleteOne);

router.route("/students/:studentId/addresses")
.get(controllerAddresses.addressesGetAll)
.post(controllerAddresses.addressesAddOne);

router.route("/students/:studentId/addresses/:addressId")
.get(controllerAddresses.addressesGetOne)
.put(controllerAddresses.addressesFullUpdateOne)
.patch(controllerAddresses.addressesPartialUpdateOne)
.delete(controllerAddresses.addressesDeleteOne);

module.exports =router;