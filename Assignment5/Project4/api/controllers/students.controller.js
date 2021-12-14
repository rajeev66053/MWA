const mongoose=require("mongoose");
const Student=mongoose.model("Student");


module.exports.studentsGetAll=function(req,res){
    console.log("Get the Students");
    console.log(req.query);

    const maxCount=10;
    const defaultOffset=0;
    const defaultcount=5;
    let offset=defaultOffset;
    let count=defaultcount;

    if(req.query && req.query.offset){
        offset=parseInt(req.query.offset);
    }

    if(req.query && req.query.count){
        count=parseInt(req.query.count);

    }

    //This is the type check
    if(isNaN(offset)|| isNaN(count)){
        res.status(400).json({"message:":"QueryString offset and count should be numbers."});
    }

    //Limit check
    if(count > maxCount){
        response.status(400).json({"message":"QueryString count cannot exceed "+maxCount});

    }

   Student.find().skip(offset).limit(count).exec(function(err,students){

    if(err){
            console.log("Error finding students"); 
            res.status(500).json({"Error":err});
    }else{
            console.log("Found students",students);
            res.status(200).json(students);
    }  
   });
};

module.exports.studentsGetOne=function(req,res){
    const studentId=req.params.studentId;
    Student.findById(studentId).exec(function(err,student){  
        const response={
            status:200,
            message:student
        }
        //Error check
        if(err){
            console.log("Error finding students"); 
            response.status=500;
            response.message=err;
        }else if(!student){
            response.status=404;
            response.message={"message":"Student Id not found"};
        }
        res.status(response.status).json(response.message);
    });
    
};

module.exports.studentsAddOne=function(req,res){
    console.log("POST new student");
    const response={
        status:201,
        message:""
    }
    if(req.body && req.body.name && req.body.GPA){

        console.log(req.body);        
        const newStudent={};

        //Type checking        

        newStudent.name=req.body.name;
        newStudent.GPA=parseFloat(req.body.GPA);
        Student.create(newStudent,function(err,student){
            console.log("The callback student is ",student);
            if(err){
                response.status=500;
                response.message=err;

            }else{
                response.message=student;
            }  
            res.status(response.status).json(response.message);       
        });
    }else{
        console.log("Data missing from post body");
        response.status=400;
        response.message={"Error":"Request data missing from post body"};        
        res.status(response.status).json(response.message); 
    }
};

module.exports.studentsFullUpdateOne=function(req,res){
    const studentId=req.params.studentId;
    Student.findById(studentId).exec(function(err,student){      
        const response={
            status:204,
            message:student
        }
        //Error check
        if(err){
            console.log("Error finding students");
            response.status=500;
            response.message=err;
        }else if(!student){
            response.status=404;
            response.message={"message":"Student Id not found"};
        }

        if(response.status!=204){
            res.status(response.status).json(response.message);

        }else{

            //update the student
            student.name=req.body.name;
            student.GPA=parseFloat(req.body.GPA);
            student.save(function(err,updatedStudent){
                if(err){
                    response.status=500;
                    response.message=err;
                }else{
                    response.message={"message":"Updated student "+updatedStudent};
                }                
                res.status(response.status).json(response.message);
            });
        }
    })   
};


module.exports.studentsPartialUpdateOne=function(req,res){
    const studentId=req.params.studentId;
    Student.findById(studentId).exec(function(err,student){      
        const response={
            status:204,
            message:student
        }
        //Error check
        if(err){
            console.log("Error finding students"); 
            response.status=500;
            response.message=err;
        }else if(!student){
            response.status=404;
            response.message={"message":"Student Id not found"};
        }

        if(response.status!=204){
            res.status(response.status).json(response.message);

        }else{
            //update the student
            if(req.body.name){
                student.name=req.body.name;
            }
            
            if(req.body.GPA){
                student.GPA=parseFloat(req.body.GPA);
            }
            
            student.save(function(err,updatedStudent){
                if(err){
                    response.status=500;
                    response.message=err;
                }else{
                    response.message={"message":"Updated student "+updatedStudent};
                }                
                res.status(response.status).json(response.message);
            });
        }
    })   
};

module.exports.studentsDeleteOne=function(req,res){
    const studentId=req.params.studentId;
    Student.findByIdAndDelete(studentId).exec(function(err,deletedStudent){      
        const response={
            status:204,
            message:deletedStudent
        }
        //Error check
        if(err){
            console.log("Error finding students");
            response.status=500;
            response.message=err;
        }else if(!deletedStudent){
            response.status=404;
            response.message={"message":"Syudent Id not found"};
        }
        res.status(response.status).json(response.message);
    });    
};


