
const express=require("express");
const app=express();
const path=require("path");
const routes=require("./routes");

app.set("port",5000);

app.use(function(req,res,next){
    console.log(req.method,req.url);
    next();
});

app.use(express.static(path.join(__dirname,"public")));

app.use("/api",routes);

const server=app.listen(app.get("port"),function(){
    const port=server.address().port;
    console.log("Application running in port"+port);
});