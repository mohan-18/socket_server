const express=require("express");
const app=express.Router();
var Branch_db=require("../models/branch");
 
app.get("/pin/:pincode",(req,res)=>{
    let pin=req.params.pincode;
    Branch_db.find({Pincode_Covered: pin},function(err,item){
        if(err){
            res.status(400).send(err);
        }else  
        res.status(200).send(item);
    });
});
app.get("/branch/:brname",(req,res)=>{
    let br=req.params.brname;
    Branch_db.find({Branch_Name: br},function(err,item){
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