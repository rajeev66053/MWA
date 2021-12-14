const mongoose= require("mongoose");
const Student= mongoose.model("Student");

module.exports.addressesGetAll= function(req, res) {
    const studentId=req.params.studentId;
    Student.findById(studentId).select("addresses").exec(function(err, student) {
        const response= {
            status: 200,
            message: []
        };
        if (err) {
            console.log("Error finding student");
            response.status= 500;
            response.message= err;
        } else if (!student) {
            console.log("student id not found in database", studentId);
            response.status= 404; 
            response.message= {"message": "student ID not found"+studentId};
        } else {
            response.message= student.addresses? student.addresses : [];
        }
        res.status(response.status).json(response.message);
    });
};

module.exports.addressesGetOne= function(req, res) {
    const studentId= req.params.studentId;
    const addressId= req.params.addressId;
    console.log("GET AddressId "+ addressId+ " for studentId "+ studentId);
    Student.findById(studentId).select("addresses").exec(function(err, student) {
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
            response.message={"message":"student Id not found"};
        }else{
            const address= student.addresses.id(addressId);
            response.message=address;
        }
        res.status(response.status).json(response.message);
    });
}


const _addAddress= function(req, res, student) {

    student.addresses.push({
        state: req.body.state,
        city: req.body.city,
        zip:parseInt(req.body.zip)
    });
    student.save(function(err, updatedstudent) {
        const response= {
            status: 200,
            message: []
        };
        if (err) {
            response.status= 500;
            response.message= err;
        } else {
            response.status= 201;
            response.message= updatedstudent.addresses;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.addressesAddOne= function(req, res) {
    const studentId= req.params.studentId;
    console.log("Get studentId ", studentId);
    Student.findById(studentId).select("addresses").exec(function(err, student) {
        const response= {
            status: 200,
            message: []
        };
        if (err) {
            console.log("Error finding student");
            response.status= 500;
            response.message= err;
        } else if (!student) {
            console.log("student id not found in database", studentId);
            response.status= 404;
            response.message= {"message": "student ID not found"+studentId};
        }
        if (student) {            
            _addAddress(req, res, student);
        } else {
            res.status(response.status).json(response.message);
        }

    });
}


const _updateAddress= function(req, res, student) {    

    student.save(function(err, updatestudent) {
        const response= {
            status: 204,
            message: []
        };
        if (err) {
            console.log("Error finding student");
            response.status= 500;
            response.message= err;
        }else{
            response.message=updatestudent.addresses;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.addressesFullUpdateOne= function(req, res) {
    const studentId= req.params.studentId;    
    const addressId=req.params.addressId;
    console.log("PUT studentId ", studentId);
    Student.findById(studentId).select("addresses").exec(function(err, student) {
        const response= {status: 204};
        if (err) {
            console.log("Error finding student");
            response.status= 500;
            response.message= err;
        } else if(!student) {
            response.status= 404;
            response.message= {"message" : "student ID not found"};
        }
        
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        }else{
            const address= student.addresses.id(addressId);
            address.state=req.body.state;
            address.city=req.body.city;
            address.zip=parseInt(req.body.zip);
            _updateAddress(req, res, student);
        }
    
    });
};


module.exports.addressesPartialUpdateOne= function(req, res) {
    const studentId= req.params.studentId;    
    const addressId=req.params.addressId;
    console.log("PUT studentId ", studentId);
    Student.findById(studentId).select("addresses").exec(function(err, student) {
        const response= {status: 204};
        if (err) {
            console.log("Error finding student");
            response.status= 500;
            response.message= err;
        } else if(!student) {
            response.status= 404;
            response.message= {"message" : "student ID not found"};
        }
        
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        }else{
            const address= student.addresses.id(addressId);
            if(req.body.state){
                address.state=req.body.state;
            }
            if(req.body.city){
                address.city=req.body.city;
            }
            if(req.body.zip){
                address.zip=parseInt(req.body.zip);
            }
            _updateAddress(req, res, student);
        }
    
    });
};


const _deleteAddress= function(req, res, student,addressId) {
    const address= student.addresses.id(addressId);
    address.remove();
    student.save(function(err, student) {
        const response= {
            status: 204
        };
        if (err) {
            console.log("Error finding student");
            response.status= 500;
            response.message= err;
        }else{
            response.message= {"message":"Address with id "+addressId+"  deleted"};
        }
        res.status(response.status).json(response.message);
    });
}


module.exports.addressesDeleteOne=function(req,res){
    const studentId=req.params.studentId;
    const addressId=req.params.addressId;
    Student.findById(studentId).select("addresses").exec(function(err,student){      
        const response= {status: 204};
        if (err) {
            console.log("Error finding student");
            response.status= 500;
            response.message= err;
        } else if(!student) {
            response.status= 404;
            response.message= {"message" : "student ID not found"};
        }
        
        if (response.status !== 204) {
            res.status(response.status).json(response.message);
        }else{
            
            _deleteAddress(req, res, student,addressId);
        }
    });    
};