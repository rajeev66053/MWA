require("./api/data/db");
const express=require("express");
const app=express();
const routes=require("./api/routes").router;
const path=require("path");

app.set("port",4000);

app.use(function(req,res,next){
    console.log("Requested ",req.method,req.url);
    next();
});


app.use(express.static(path.join(__dirname,"public"))); // This is termination point
app.use("/node_modules",express.static(path.join(__dirname,"node_modules")));

//For working with POST data
app.use(express.json());

app.use("/api",routes);

const server=app.listen(app.get("port"),function(){
    const port=server.address().port;
    console.log("Listening to port ",port);
});