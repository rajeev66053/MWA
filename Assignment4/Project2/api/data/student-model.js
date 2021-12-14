const mongoose=require("mongoose");

const addressSchema=new mongoose.Schema({
    state:String,
    city:String,
    zip:Number
});

 const studentScheme=new mongoose.Schema({
     name:{
         type:String,
         required:true         
        },
     GPA:Number,
     addresses:[addressSchema]
 });

 mongoose.model("Student",studentScheme,"Students");//name of model, schema,collections