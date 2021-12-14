const mongoose=require("mongoose");

const officeSchema=new mongoose.Schema({
    state:String,
    city:String,
    zip:Number
});

const productSchema=new mongoose.Schema({
    "type":String,
    rating:Number,
    minPrice:Number,
    maxPrice:Number,
    feature:String
});

const brandSchema=new mongoose.Schema({
    name:String,
    founded:Number,
    headOffice:String,
    createdOn:{
        type:Date,
        "default":Date.now()
    },
    offices:[officeSchema],
    products:[productSchema]

});

mongoose.model("Brand",brandSchema,"brands");