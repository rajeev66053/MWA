const express=require("express");
const router=express.Router();
const controllerSum=require("../controller/addNumbers.controller");

router.route("/sum/:firstNum").get(controllerSum.addTwoNumbers);

module.exports=router;