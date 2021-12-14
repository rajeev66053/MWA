const mongoose=require("mongoose");
//Require all model
require("./users-model");
require("./games-model");
const dbName="gamesDB";
const dbURL="mongodb://localhost:27017/"+dbName;


mongoose.connect(dbURL,
    {useNewUrlParser:true,useUnifiedTopology:true});

process.on("SIGINT",function(){
    mongoose.connection.close(function(){
        console.log("Mongoose disconnected by app termination.");
        process.exit(0);
    });
});

process.on("SIGTERM",function(){
    mongoose.connection.close(function(){
        console.log("Mongoose disconnected by app termination.");
        process.exit(0);
    });
});

process.once("SIGUSR2",function(){
    mongoose.connection.close(function(){
        console.log("Mongoose disconnected by app restarted.");
        process.kill(process.pid,"SIGUSR2");
    });
});

//This is loggin info
mongoose.connection.on("connected",function(){
    console.log("Mongoose connected to "+dbURL);
});

mongoose.connection.on("disconnected",function(){
    console.log("Mongoose disconnected");
});

mongoose.connection.on("error",function(error){
    console.log("Mongoose connected error",error);
});




