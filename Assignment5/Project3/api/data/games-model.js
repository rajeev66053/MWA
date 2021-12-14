const mongoose=require("mongoose");

const publisherSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});

    
const reviewSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        "default": Date.now()
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
     minPlayers:{
         type:Number,
         min:1,
         max:10
     },
     maxPlayers:Number,
     minAge:Number,
     designer:String,
     publisher: publisherSchema,
     reviews: [reviewSchema]
 });

 mongoose.model("Game",gameScheme,"games");//name of model, schema,collections