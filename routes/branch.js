const express=require("express");
const app=express.Router();
var Branch_db=require("../models/branch");
 
app.get("/pin/:pincode",(req,res)=>{
    let pin=req.params.pincode;
     console.log(pin,"m");
    Branch_db.find({Pincode_Covered: pin},function(err,item){
        if(err){
            res.status(400).send(err);
        }else  
        res.status(200).send(item);
    });
});
app.get("/all",(req,res)=>{
    Branch_db.find({},function(err,item){
        if(err){
            res.status(400).send(err);
        }else
        res.status(200).send(item);

    });
});

module.exports=app;