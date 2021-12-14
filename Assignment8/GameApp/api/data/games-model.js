const mongoose=require("mongoose");

const publisherSchema=new mongoose.Schema({
    name:String,
    location:{ 
        // type:"point",      
        coordinates:{
            type:[Number],
            index:"2dsphere"
        }
        
    }
});

 const gameScheme=new mongoose.Schema({
     title:{
         type:String,
         required:true         
        },
     year:{
         type:Number
     },
     rate:{
        type: Number,
        min:1,
        max:5,
        "default":1
     },     
     price:Number,
     minPlayes:{
         type:Number,
         min:1,
         max:10
     },
     maxPlayers:Number,
     minAge:Number,
     designers:String,
     publisher:publisherSchema
 });

 mongoose.model("Game",gameScheme,"games");//name of model, schema,collections