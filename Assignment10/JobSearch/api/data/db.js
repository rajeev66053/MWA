const mongoose=require("mongoose");
require("./job-model");
const dbName="meanJobSearch";
const dbURL="mongodb://localhost:27017/"+dbName;

mongoose.connect(dbURL,{useNewUrlParser:true,useUnifiedTopology:true});


process.on("SIGINT",function(){
    mongoose.connection.close(function(){
        console.log("Mongoose disconnected by application interrupted");
        process.exit(0);
    });   

});

process.on("SIGTERM",function(){
    mongoose.connection.close(function(){
        console.log("Mongoose disconnected by application termination");
        process.exit(0);
    });
});

process.once("SIGUSR2",function(){
    mongoose.connection.close(function(){
        console.log("Mongoose disconnected by application restart");
        process.kill(process.pid,"SIGUSR2");
    });
});

mongoose.connection.on("connected",function(){
    console.log("Mongoose connected to Db",dbName);
});

mongoose.connection.on("disconnected",function(){
    console.log("Mongoose disconnected");
});

mongoose.connection.on("error",function(err){    
    console.log("Mongoose connection error",err);
});