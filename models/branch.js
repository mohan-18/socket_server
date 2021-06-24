var mongoose=require("mongoose");

// var numSchema=new mongoose.Schema({
//     number:Number,
// });
// num=mongoose.model("num",numSchema);

var BranchSchema=new mongoose.Schema({
    Insitution_Name:String,
    Branch_Name:String,
    Address:String,
    City:String,
    Contact_Number:String,
    Branch_Incharge:String,
    Pincode_Covered:String,

});

Branch=mongoose.model("Branch",BranchSchema);

module.exports=Branch;