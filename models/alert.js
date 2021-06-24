var mongoose=require("mongoose");


var alertSchema=new mongoose.Schema({
    Branch_Name:String,
    Pincode:String,
    Contact:String,
},

 { timestamps: true });

alert=mongoose.model("alert",alertSchema);

module.exports=alert;