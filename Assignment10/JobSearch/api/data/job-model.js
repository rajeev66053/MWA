const mongoose=require("mongoose");

const locationSchema=new mongoose.Schema({
    state:String,
    city:String,
    zip:Number
});


const JobSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    salary:Number,
    location:locationSchema,
    description:{
        type:String,
        required:true
    },
    experience:String,
    skills:[String],
    postDate:{
        type:Date,
        "default":Date.now()
    }

});

mongoose.model("Job",JobSchema);