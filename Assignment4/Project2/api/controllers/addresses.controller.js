const mongoose=require("mongoose");
const Student=mongoose.model("Student");

module.exports.addressesGetAll=function(req,res){
    console.log("Get all addresses for a Student");
    const studentId=req.params.studentId;
    Student.findById(studentId).select("addresses").exec(function(err,student){
        console.log("GET address for student with studentid",studentId);
        res.status(200).json(student.addresses);
    });

};

module.exports.addressesGetOne=function(req,res){
    console.log("Get address by id for a Student");
    const studentId=req.params.studentId;
    const addressId=req.params.addressId;
    Student.findById(studentId).select("addresses").exec(function(err,student){
        console.log("GET address for student with studentId",studentId);
        const address= student.addresses.id(addressId);
        res.status(200).json(address);
    });
    
};
