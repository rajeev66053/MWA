const express=require("express");
const app=express();
const routes=require("./routes");

require("./data/dbconnection").open();

app.set("port",5000);

app.use(function(req,res,next){
    console.log(req.method,req.url);
    next();
});

app.use("/api",routes);

const server =app.listen(app.get("port"),function(){
    const port=server.address().port;
    console.log("Listening to port",port);
});