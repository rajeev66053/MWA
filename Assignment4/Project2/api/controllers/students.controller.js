const mongoose=require("mongoose");
const Student=mongoose.model("Student");


module.exports.studentsGetAll=function(req,res){
    console.log("Get all Students");
    console.log(req.query);

    var offset=0;
    var count=5;

    if(req.query && req.query.offset){
        offset=parseInt(req.query.offset);
    }

    if(req.query && req.query.count){
        count=parseInt(req.query.count);
    }

    Student.find().skip(offset).limit(count).exec(function(err,students){
       console.log("Found students",students);
       res.status(200).json(students);
   });
};

module.exports.studentsGetOne=function(req,res){
    const studentId=req.params.studentId;
    Student.findById(studentId).exec(function(err,student){
        console.log("GET Student  with studentId",studentId);
        res.status(200).json(student);
    })
    
};
