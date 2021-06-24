const express=require("express");
const app=express.Router();
var Alert_db=require("../models/alert");
var Branch_db=require("../models/branch");


app.post("/", (req,res)=>{
    let pincode=req.body.pincode;
    let contact=req.body.contact;

    Branch_db.find({Pincode_Covered: pincode},(err,item)=>{
        if(err){
            res.status(400).send(err);
        }else{
            item.forEach(async (it)=>{
            let brname=it['Branch_Name'];
            let noti = { Branch_Name:brname,Pincode:pincode, Contact:contact};
            Alert_db.create(noti, function (err, item) {
                if (err) res.status(400).send(err);
                else {
                  console.log(item);
                }
              });
              })
        }
    })
    res.send("notified");
   
})


app.get("/:branch_name",(req,res)=>{
    let branch=req.params.branch_name;
    console.log(branch,"mohan");
    Alert_db.find({Branch_Name: branch},function(err,item){
        if(err){
            res.send(err);
        }else{
        //console.log(item);
        res.send(item);
        }
    })
});



module.exports=app;